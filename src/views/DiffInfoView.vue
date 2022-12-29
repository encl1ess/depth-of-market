<template>
    <Loader v-if="isDepthLoading"/>
    <v-container v-else class="diff-info d-flex flex-column align-start justify-start">
        <v-select @update:model-value="onChange" class="diff-info__drop-down" width="30wv" :items="symbols" label="symbol"
            density="compact"></v-select>
        <List/>
    
    </v-container>

</template>

<script>
import Loader from '@/ui/Loader.vue';
import List from '@/components/List.vue'
export default {
    components: {
        Loader,
        List
    },
    data() {
        return {
            symbols: ['BTCUSDT', 'BNBBTC', 'ETHBTC'],
            selectedSymbol: null,
            isDepthLoading: false
        }
    },
    methods: {
        onChange(value) {
            this.selectedSymbol = value
            this.eventBus.emit('symbol-selected', value)    
        }
    }

}
</script>

<style lang="scss" scoped>
.diff-info {
    &__drop-down {
        width: 50%;

        @media(max-width: 450px) {
            width: 90%;
        }
    }

}
</style>