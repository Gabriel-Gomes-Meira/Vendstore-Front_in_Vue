<template>
    <v-container 
    
    > 
      <v-row
      v-if="Produtos.length > 0"
      class="withScrollBar">
        <v-col
        v-for="(Produto, index) in Produtos"
        :key="index" 
        sm="6"
        md="4"
        lg="3">
          <catalogo-item
          :Produto="Produto"></catalogo-item>
        </v-col>
      </v-row>

      <v-row
      v-else
      align="center"
      justify="center"
      color="amber lighten-4">
        <v-progress-circular
        size="50"
        indeterminate
        color="amber"
        ></v-progress-circular>
      </v-row>      
    </v-container>
    
</template>

<script>

import CatalogoItem from '../components/Produtos/CatalogoItem.vue'

export default {
  name: 'Produtos',

  components:{
    CatalogoItem
  },

  data () {
    return {
      Produtos: []
    }
  },

  mounted () {
      setTimeout(this.GetAllProdutos, 1500);
  },

  methods:{
    GetAllProdutos () {
      this.Produtos = this.$store.state.estoque
    }
  }

}
</script>
