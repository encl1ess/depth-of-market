<template>
  <v-table class="data-table m-0 mb-10 " fixed-header theme="light">
    <!-- <caption class="data-table__caption text-white text-center text-uppercase bg-blue-lighten-2"> {{ title }}</caption> -->
    <thead>
      <tr>
        <th :colspan="headers.length" class=" text-white text-center text-uppercase bg-blue-lighten-2">{{ title }}</th>
      </tr>
      <tr>
        <th class="bg-blue" v-for="header in headers">
          {{ header.text }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data">
        <td class="text-left">{{ parseFloat(item[0]) }}</td>
        <td class="text-left">{{ parseFloat(item[1]) }}</td>
        <td class="text-left">{{ parseFloat(item[0])* parseFloat(item[1]) }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
export default {
  name: 'data-table',
  props: {
    title: String,
    headers: Array,
    data: Array,
    colspan: Number
  }
}
</script>

<style lang="scss">
.data-table {
  width: 50%;
  min-width: max-content;
  .v-table__wrapper {
    overflow-y: scroll;
    height: 80vh;
    margin-left: 2em;
    td{
      width: 16%;
    }
    

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


  @media screen and (max-width: 1290px) {
    width: 100%;
    .v-table__wrapper{
      height: 65vh;
    }
    td{
      min-width: 33%;
    }

  }
}

@media(max-width: 550px) {

  th:nth-child(3),
  td:nth-child(3) {
    display: none;
  }
  td {
    flex-shrink: no-shrink;
    width: 45%;
  }
}
</style>