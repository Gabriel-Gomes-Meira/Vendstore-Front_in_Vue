<template>
  
  <v-container grid-list-xs
  fluid
  fill-height
  >
    <v-row
    mt-10
    align="center"
    justify="center"
    color="amber lighten-4">
      <v-progress-circular
      v-if="Produtos.length == 0"
      size="50"
      indeterminate
      color="amber"
      ></v-progress-circular>
    </v-row>
    
    <v-row
    v-if="Produtos.length > 0"
    align="center"
    justify="center"
    id="Catalogo">
        <Catalogo 
        v-for="(Produto, index) in Produtos"
        :key="index" 
        :Produto="Produto"></Catalogo>
    </v-row>
  </v-container>
  
</template>

<script>

import Catalogo from '../components/Home/Catalogo'

export default {
  name: 'Home',

  components:{
    Catalogo,
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
      this.Produtos = this.$store.state.estoque.Produtos
    }
  }

}
</script>

<style>
    .v-progress-circular {
      margin: 1rem;
    }

    #Catalogo{
        overflow-y: auto;
        height: 80vh;
    }
    #Catalogo::-webkit-scrollbar{
        
        width: 8px;
    }
    #Catalogo::-webkit-scrollbar-track{
        margin-top: 50px;
        background-color: #3b3b3c8c;
        border-radius: 4px;
    }
    #Catalogo::-webkit-scrollbar-thumb{
        background: #91919435;
        border: solid #74758400;
        border-radius: 4px;
    }

  html{
    overflow-y: hidden;
  }

  #TheApp{
    background-color: #FFFDE7;
  }
  
</style>