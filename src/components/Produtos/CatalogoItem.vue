<template>

    <v-card
    class="mx-auto my-12"
    max-height="215"
    color="amber darken-2"
    dark outlined
    >
        <v-img
        height="150"
        :src="'http://localhost:8000/storage/produto/'+ Produto.image"
        class="orange--text  align-end"
        >
            <v-card-title
            class="font-weight-black"> {{ Produto.name }} </v-card-title>
            <template v-slot:placeholder>
                <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
                >
                <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                ></v-progress-circular>
                </v-row>
            </template>        
        </v-img>


        <v-card-actions>
            <v-text-field
            prefix="R$" color="white"
            solo flat readonly
            background-color="amber darken-3"            
            :value="Produto.price"
            >
                <template v-slot:append>
                    <v-btn
                    color="yellow lighten-4"
                    outlined
                    @click="ToCart"                    
                    >
                        Comprar
                    </v-btn>
                </template>                    
            </v-text-field>
        </v-card-actions>
    </v-card>

</template>

<script>
export default {
    props:{
        Produto:null,
    },
    methods:{
        ToCart () {
            this.$store.dispatch('AddToCart', this.Produto)
        }
    }

}
</script>

<style>
    
</style>