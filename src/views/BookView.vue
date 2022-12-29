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
    methods: {
        scrollPositionHandler(value) {
            document.getElementById(value).scrollIntoView({
                behavior: "smooth"
            });
        },

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