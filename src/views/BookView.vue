<template>
    <Loader v-if="isDepthLoading" />
    <v-container v-else class="book-view d-flex flex-column">
        <v-select @update:model-value="scrollPositionHandler" class="book-view__drop-down align-self-center mb-1"
            :items="['asks', 'bids']" label="table"></v-select>
        <v-container class="book-view__table d-flex flex-wrap align-start justify-center">
            <data-table :headers="headers" :data="depthRecords.asks" id="asks" title="Asks"></data-table>
            <data-table :headers="headers" :data="depthRecords.bids" id="bids" title="Bids"></data-table>
        </v-container>

    </v-container>
</template>

<script>
import { useDepth } from '@/hooks/useDepth';
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
            ]
        }
    },
    setup() {
        const { depthRecords, isDepthLoading } = useDepth('BTCUSDT');
        return {
            depthRecords,
            isDepthLoading
        }
    },
    created() {
        this.updatesSubcribe();
    },
    methods: {
        scrollPositionHandler(value) {
            document.getElementById(value).scrollIntoView({
                behavior: "smooth"
            });
        },
        updatesSubcribe() {
            let socket = this.sdk.wsSubscribe('BTCUSDT');
            socket.onopen = function (e) {
                console.log("[open] Соединение установлено");
                console.log("Отправляем данные на сервер");
                socket.send("Меня зовут Джон");
            };

            socket.onmessage = function (event) {
                console.log(`[message] Данные получены с сервера: ${event.data}`);
            };
            socket.onclose = function (event) {
                if (event.wasClean) {
                    console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
                } else {
                    // например, сервер убил процесс или сеть недоступна
                    // обычно в этом случае event.code 1006
                    console.log('[close] Соединение прервано');
                }
            };

            socket.onerror = function (error) {
                console.log(`[error]`);
            };
        }

    }
}
</script>

<style lang="scss" scoped>
.book-view {
    height: 85vh;

    &__drop-down {
        display: none;

        @media(max-width: 1290px) {
            display: flex;
        }
    }

    &__table {
        position: relative;
        height: 85vh;
        overflow-y: scroll;

        &::-webkit-scrollbar {
            visibility: hidden;
        }
    }
}
</style>