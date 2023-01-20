<template>
    <v-container class="diff-info d-flex flex-column align-center justify-start" height="100vh">
        <v-select @update:model-value="onChange" class="diff-info__drop-down" :items="symbols"
            density="compact"></v-select>
        <v-container v-if="diffs.length == 0" class="d-flex justify-center align-center h-100">
            <Loader />
        </v-container>
        <List v-else class="diff-info__list" :items="diffs" />
    </v-container>
</template>

<script>
import List from '@/components/List.vue'
import Loader from '@/ui/Loader.vue'
export default {
    components: {
        List,
        Loader
    },
    data() {
        return {
            symbols: ['BTCUSDT', 'BNBBTC', 'ETHBTC'],
            diffs: [],
        }
    },
    mounted() {
        this.eventBus.on('diff-changes', value => {
            this.diffs.unshift(value)
            if (this.diffs.length > 50) {
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
    height: inherit;
    &__list {
        width: 100%;
        height: 70vh;
        white-space: pre-line;
    }

    &__drop-down {
        width: 50%;
        max-height: 3rem;
        @media(max-width: 450px) {
            width: 90%;
        }
    }

}
</style>