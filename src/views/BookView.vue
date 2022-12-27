<template>
    <div class="book">
        <v-table :headers="headers" :items="records"></v-table>
    </div>
</template>

<script>
import { useDepth } from '@/hooks/useDepth';

export default {
    data() {
        return {
            headers: [
                {
                    text: 'Price',
                    align: 'start',
                    value: 'price',
                },
                {
                    text: 'Quantity',
                    value: 'quantity',
                }
            ]
        }
    },
    setup(props) {
        const { records, isDepthLoading } = useDepth('BTCUSDT');
        return {
            records,
            isDepthLoading
        }
    }
}
</script>

<style lang="scss" scoped>
.book {
    overflow-y: auto;
}
</style>