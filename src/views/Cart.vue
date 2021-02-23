<template>
    <v-container
    fill-height>
        <v-row
        v-if="inprocessing"
        mt-10
        align="center"
        justify="center"
        color="amber lighten-4">
            <v-progress-circular
            size="50"
            indeterminate
            color="amber"
            ></v-progress-circular>
        </v-row>

        <v-row
        v-if="!inprocessing"
        align="center"
        justify="center"
        id="List">
            <List
            :Cart="Cart"
            v-if="Cart.length > 0"></List>

            <v-alert
            v-else
            type="accent"
            dismissible>
                Ainda não há produtos em seu carrinho!
            </v-alert>

        </v-row>
    </v-container>
  
</template>

<script>
import List from '../components/Cart/List'

export default {

    components:{
        List
    },

    data () {
        return{
            inprocessing:true,
            Cart:this.$store.state.cart,
        }
    },

    mounted () {
      setTimeout(this.Received, 1500);
    },

    methods:{
        Received () {
            this.inprocessing = false
        }
    }
}
</script>

<style>

</style>