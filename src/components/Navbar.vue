<template>
    <nav class="navbar">
        <v-btn outlined rounded @click="$router.push('/book')">Book</v-btn>
        <v-btn outlined rounded @click="$router.push('/info')">Difference</v-btn>
    </nav>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.navbar {
    background: #4D5061;
    * {
        margin: 0 0.5rem;
    }
}
</style>