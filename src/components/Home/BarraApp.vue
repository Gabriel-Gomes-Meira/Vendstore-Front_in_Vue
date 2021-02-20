<template>
  <v-app-bar
    color="amber"
    fixed
    dense
    >
      <v-app-bar-nav-icon @click="Acionar"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      
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
    }),

    methods:{
        Acionar () {
            this.$emit('CallDrawer')
        }
    }



}
</script>

<style>

</style>