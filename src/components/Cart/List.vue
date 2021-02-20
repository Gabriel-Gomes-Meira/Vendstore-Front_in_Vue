<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="Itens"
    :single-select="singleSelect"
    item-key="name"
    show-select
    class="elevation-1"
  >
    <template v-slot:top>
      <v-switch
        v-model="singleSelect"
        label="Single select"
        class="pa-3"
      ></v-switch>
    </template>
  </v-data-table>
</template>


<script>
  export default {
    
    props:{
        Itens:null
    },

    data () {
      return {
        singleSelect: false,
        selected: [],
        headers: [
          {
            text: 'Nome',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Preço', value: 'price' },
          { text: 'Moeda', value: 'moeda' },
          { text: 'Quantidade', value: 'quantidade' },
        ],
      }
    },
  }
</script>