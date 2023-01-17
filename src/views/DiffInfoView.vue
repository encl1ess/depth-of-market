<template>
    <v-container class="diff-info d-flex flex-column align-center justify-start">
        <v-select :value="symbol" @update:model-value="onChange" class="diff-info__drop-down" width="30wv" :items="symbols" 
            density="compact"></v-select>
        <List class="diff-info__list" :items="diffs"/>
    </v-container>
</template>

<script>
import List from '@/components/List.vue'
export default {
    components: {
        List
    },
    props: {
        symbol: String,
    },
    data() {
        return {
            symbols: ['BTCUSDT', 'BNBBTC', 'ETHBTC'],
            diffs: []
        }
    },
    mounted() {
        this.eventBus.on('diff-changes', value => {
            this.diffs.unshift(value)
            if(this.diffs.length > 50) {
                this.diffs.pop();
            }
        }), 
        this.eventBus.on('symbol-selected', () => this.diffs = [])
    },
    methods: {
        onChange(value) {
            this.eventBus.emit('symbol-selected', value)    
        }
    }

}
</script>

<style lang="scss" scoped>
.diff-info {
    &__list {
        width: 100%;
        height: 70vh;
        white-space:pre-line;
    }
    &__drop-down {
        width: 50%;

        @media(max-width: 450px) {
            width: 90%;
        }
    }

}
</style>