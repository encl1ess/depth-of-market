<template>
    <v-list>
        <v-list-item v-for="symbol in symbols" :title="symbol.name" :subtitle="symbol.changedAt.toString()">
        </v-list-item>
    </v-list>
</template>

<script>
export default {
    data() {
        return {
            symbols: []
        };
    },
    mounted() {
        this.eventBus.on('symbol-selected', value => {
            this.symbols.unshift({ name: value, changedAt: new Date()})
        })
    }
}
</script>

<style lang="scss" scoped>

</style>