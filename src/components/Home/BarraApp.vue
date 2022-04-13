<template>
  <v-app-bar
    color="amber"
    fixed
    dense
    dark
    >
      <v-app-bar-nav-icon @click="Acionar"></v-app-bar-nav-icon>
      <v-toolbar-title>
          Vendstore
      </v-toolbar-title>
      

      <v-col>
        
        <v-tabs               
        background-color="transparent" 
        @change="Alter"
        v-model="tab"
        >
          <v-tab>Produtos</v-tab>
          <v-tab>Lançamentos</v-tab>
          <v-tab>Promoções</v-tab>
          <v-tab>Sobre</v-tab>
        </v-tabs>
      </v-col>
      
      
      <v-app-bar-nav-icon
      @click="$emit('Router', 'Cart')">
        <v-badge
          bordered
          bottom
          left
          color="red"
          :content="cart.length"
          :value="cart.length"
          offset-x="14"
          offset-y="20"
        >
          <v-avatar size="42">
            <v-icon 
            size="30"
            color="amber darken-4">mdi-cart</v-icon>
          </v-avatar>
        </v-badge>

      </v-app-bar-nav-icon>
      <!-- <Searchbar></Searchbar> -->
      
    </v-app-bar>
</template>

<script>
// import Searchbar from '../src/components/Search.vue'

export default {

    props:{
        Asdrawer:false
    },

    data: () => ({
        cart:0,
        tab:0,
    }),

    methods:{
        Acionar () {
            this.$emit('CallDrawer')
        },

        Alter () {
          var view = 'Cart'
          
          switch (this.tab) {
            case 0:
              view = 'Produtos'
              break;
            default:
              break;
          }
          
          this.$emit('ChangeView', view)
        }
    }



}
</script>

<style>

</style>