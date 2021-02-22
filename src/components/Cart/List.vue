<template>
  <!-- Tabela customizada -->
  
  <!-- elevation="8" -->
  <v-sheet
  rounded="true">
    <v-container
    >
      <!-- Header -->
      <v-row
      >
        <v-col>
          <v-spacer></v-spacer>
        </v-col>
        <v-col
        >
          Name
        </v-col>
        <v-col
        >
          Preço
        </v-col>
        <v-col
        >
          Quantidade
        </v-col>
        <v-col
        >
          Estoque
        </v-col>
      </v-row>

      <!-- Itens -->
      <v-row>
        <v-col>
          image
        </v-col>
        <v-col>
          Produtoname
        </v-col>
        <v-col>
          Produtoprice
        </v-col>
        <v-col>
          Produtoqtdincart
        </v-col>
        <v-col>
          Produtoquantidade
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>


<script>
  export default {
    
    props:{
        Itens:null
    },

    data () {
      return {
        primary:'primary'
      }
    },
  }
</script>