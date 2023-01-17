<template>
  <v-app>
    <navbar />
    <v-main class="d-flex align-start justify-center">
      <v-container class="d-flex align-start justify-center h-100 m-0">
        <router-view :symbol="symbol"/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar
  },
  data() {
    return {
      symbol: 'BTCUSDT'
    }
  },
  mounted() {
    this.eventBus.on('symbol-selected', (value) => this.symbol = value)
  }
}
</script>

<style lang="scss">
html {
  overflow: hidden !important;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}

.custom-scroll {
  overflow-y: scroll;
  height: 75vh;

  &::-webkit-scrollbar {
    visibility: hidden;
  }

  &:hover {
    &::-webkit-scrollbar {
      visibility: visible;
      background: lightgrey;
      border-radius: 2em;

      &-thumb {
        background: #2196F3;
        border-radius: 2em;
      }
    }
  }
}
</style>
