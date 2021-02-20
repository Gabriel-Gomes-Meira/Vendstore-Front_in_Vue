<template>

    <v-card
        class="mx-auto my-12"
        max-width="270"
    >

        <v-img
        height="150"
        :src="'http://localhost:8000/storage/produto/'+ Produto.image"
        ></v-img>


        <v-card-title> {{ Produto.name }} </v-card-title>

        <v-card-text>
            <v-row
            align="center"
            class="mx-0"
            >
                <v-rating
                :value="3"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
                ></v-rating>

                <div class="grey--text ml-4"> 3.0 </div>
            </v-row>

            <v-row
            align="center"
            class="mx-0">
                <v-col
                >
                </v-col>
                <v-text-field
                disabled
                :value="Produto.price "
                :suffix="Produto.moeda+'$'"
                ></v-text-field>
                    
            </v-row>


        </v-card-text>

        <v-divider class="mx-4"></v-divider>


        <v-card-actions>
        <v-btn
            color="deep-purple lighten-2"
            text
            @click="ToCart"
        >
            Comprar
        </v-btn>
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