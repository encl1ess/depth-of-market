<template>
    <Loader v-if="isDepthLoading" />
    <v-container v-else class="book-view d-flex flex-column align-center ">
        <v-select eager @update:model-value="scrollPositionHandler" class="book-view__drop-down" density="compact"
            :items="items" placeholder="table"></v-select>
        <div>{{ symbol }}</div>
        <v-container class="book-view__table d-flex flex-wrap align-start justify-center m-0 p-0">
            <data-table :headers="headers" :data="depth.asks" id="asks" title="Asks"></data-table>
            <data-table :headers="headers" :data="depth.bids" id="bids" title="Bids"></data-table>
        </v-container>
    </v-container>

</template>

<script>
import DataTable from '@/components/DataTable.vue';
import Loader from '@/ui/Loader.vue';
export default {
    components: {
        DataTable, Loader
    },
    data() {
        return {
            scrollPosition: 0,
            headers: [
                {
                    text: 'Price',
                    value: 'price',
                },
                {
                    text: 'Quantity',
                    value: 'quantity',
                }, {
                    text: 'Amount',
                    value: 'amount',
                },
            ],
            items: ['asks', 'bids'],
            connection: null,
            depth: {},
            limit: 500,
            isDepthLoading: false,
            symbol: 'BTCUSDT'
        }
    },
    created() {
        if(!this.connection) {
            this.fetchDepth(this.symbol, this.limit)
            this.subscribe(this.symbol)
        }
        this.eventBus.on('symbol-selected', (value) => {
            this.symbol = value
            this.depth =  this.fetchDepth(value, this.limit)
            this.connection.close()
            this.subscribe(value)
        })
    },
    methods: {
        scrollPositionHandler(value) {
            document.getElementById(value).scrollIntoView({
                behavior: "smooth"
            });
        },
        async fetchDepth(symbol, limit) {
            this.isDepthLoading = true;
            this.depth = await this.sdk.getDepth(symbol, limit) //Get a depth snapshot
            this.isDepthLoading = false;
        },
        subscribe(symbol) {
            this.connection = this.sdk.wsSubscribe(symbol)
            let prev;
            this.connection.onmessage = (event) => {
                const eventDataObject = JSON.parse(event.data);
                const { e, E, s, a, b, u, U } = eventDataObject;
                const filteredA = a.filter(elem => elem[1] != 0);
                const filteredB = b.filter(elem => elem[1] != 0);
                prev = this.depth.lastUpdateId;
                this.eventBus.emit('diff-changes', `Symbol: ${s}
                                    Event type: ${e}
                                    Event time: ${E}
                                    First update ID in event: ${U}
                                    Final update ID in event: ${u}
                                    Bids to be updated:\n ${JSON.stringify(filteredB)}
                                    Asks to be updated:\n ${JSON.stringify(filteredA)}`)
                
                    if (u <= prev) {
                        this.depth.asks.splice(this.depth.lastUpdateId - u, filteredA.length, ...filteredA)
                        this.depth.bids.splice(this.depth.lastUpdateId - u, filteredB.length, ...filteredB)
                    } else {
                        if (U <= prev + 1 && u >= prev + 1 || U == prev + 1){                    
                            this.updateDepth(filteredA, filteredB)
                            this.depth.lastUpdateId = u;             
                        } else if(U >= prev+1) {
                            this.depth.lastUpdateId++;
                            this.updateDepth(filteredA, filteredB)
                        }   
                    } 
            };
            this.connection.onclose = (event) => {
                if (event.wasClean) {
                    console.log(`[close] Соединение закрыто чисто, код=${event.code}`);
                } else {
                    console.log('[close] Соединение прервано');
                }
            };

            this.connection.onerror = (error) => {
                console.log(error);
            };
        },
        updateDepth(a, b) {
            if(a.length > 0 && b.length > 0) {
                this.depth.asks.unshift(...a);
                this.depth.asks.splice(-a.length);
                this.depth.bids.unshift(...b);
                this.depth.bids.splice(-b.length);
            }
           
        }
    },

}
</script>

<style lang="scss" scoped>
.book-view {
    height: 85vh;

    &__drop-down {
        display: none;

        @media(max-width: 1290px) {
            display: block;
            width: 30%;
        }
    }

    &__table {
        position: relative;
        height: 80vh;
        overflow-y: scroll;

        &::-webkit-scrollbar {
            visibility: hidden;
        }
    }
}
</style>