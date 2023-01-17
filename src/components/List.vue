<template>
    <v-list class="custom-scroll">
        <v-list-item border class="text-start mb-3" v-for="item in items"> 
            {{ item }}
        </v-list-item>

    </v-list>
</template>

<script>
export default {
    props: {
        items: Array,
    }
}
</script>

<style lang="scss" scoped>
.v-list{
    overflow-y: auto;
}
</style>