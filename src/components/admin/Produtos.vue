<template>

    <v-container
    fluid
    >
            <v-data-iterator
            content-tag="tag"
            row wrap
            :items="Produtos"
            :search="Search"
            hide-default-footer
            >
                <template v-slot:header>
                    <v-toolbar
                    color="teal"
                    class="pl-2 rounded-t-xl">
                        <v-toolbar-title> Produtos </v-toolbar-title>
                        
                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>
                        <v-text-field
                        v-model="Search"
                        clearable flat
                        solo-inverted
                        hide-details
                        prepend-inner-icon="mdi-magnify"
                        ></v-text-field>

                        <v-btn icon>
                            <v-icon
                            @click="dialog1 = true"
                            size="33">mdi-plus</v-icon>
                        </v-btn>

                        <!-- <template v-if="$vuetify.breakpoint.mdAndUp">
                            <v-spacer></v-spacer>
                            <v-select
                            v-model="sortBy"
                            flat
                            solo-inverted
                            hide-details
                            :items="keys"
                            prepend-inner-icon="mdi-magnify"
                            label="Sort by"
                            ></v-select>

                            <v-spacer></v-spacer>
                            <v-btn-toggle
                            v-model="sortDesc"
                            mandatory
                            >
                                <v-btn
                                large
                                depressed
                                color="blue"
                                :value="false"
                                >
                                    <v-icon>mdi-arrow-up</v-icon>
                                </v-btn>

                                <v-btn
                                large
                                depressed
                                color="blue"
                                :value="true">
                                    <v-icon>mdi-arrow-down</v-icon>
                                </v-btn>
                            </v-btn-toggle>
                        </template> -->
                    </v-toolbar>
                </template>

                <template slot="no-results">
                    <v-alert type="error">
                        Produto não encontrado!
                    </v-alert>
                </template>

                <template v-slot:default="{ items }"
                >        
                <v-sheet id="Produto"
                color="teal lighten-4">
                    <v-row
                    class="d-flex pa-4" >
                        <v-col
                        v-for="Produto in items"
                        :key="Produto.id"
                        cols="12"
                        lg="3"
                        md="4"
                        sm='5'>
                            <v-card
                            class="mx-auto"
                            max-width="400"
                            color="teal accent-1"
                            >
                                <v-img
                                class="black--text align-end"
                                height="200px"
                                :src="'http://localhost:8000/storage/produto/' + Produto.image"
                                >
                                    <v-card-title>{{ Produto.name }}</v-card-title>
                                </v-img>

                                <v-row>
                                    <v-col cols="6">
                                        <v-card-subtitle class="pb-0 black--text font-weight-regular">
                                            Preço: {{ Produto.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}}
                                        </v-card-subtitle>
                                    </v-col>
                                    <v-spacer></v-spacer>
                                    <v-col cols="6">
                                        <v-card-subtitle class="pb-0 black--text font-weight-medium">
                                            Quantidade: {{ Produto.quantidade }}
                                        </v-card-subtitle>
                                    </v-col>
                                </v-row>

                                <v-card-text>
                                    <v-row>
                                        <v-col
                                        cols="6">
                                            <p class="black--text font-weight-bold"
                                            left> Categoria: {{ Produto.categoria }} </p>
                                        </v-col>
                                        <v-spacer></v-spacer>
                                        <v-col
                                        cols="5">
                                            <p class="black--text font-weight-bold"
                                            right> Marca: {{ Produto.marca }} </p>
                                        </v-col>
                                    </v-row>
                                </v-card-text>

                                <v-card-actions
                                @mouseover="SelProduto = Produto.id"
                                >
                                    <v-btn
                                    color="blue-grey darken-4"
                                    @click="dialog2 = true"
                                    >
                                        Atualizar
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                    color="deep-orange accent-3"
                                    @click="dialog3 = true"
                                    >
                                        Deletar
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-sheet>
                </template>
            </v-data-iterator>
    

        
        <!-- Formulário para inserção de Produto -->
            <CreatPro
            v-if="dialog1"
            :active='dialog1'
            @SendRequest="DoRequest"
            @Closethis="ClearDialogs"
            ></CreatPro>
        <!-- Fim Formulário para inserção -->

        <!-- Formulário para Atualização de Produto -->
            <UpdPro 
            v-if="dialog2"
            :Id="SelProduto"
            :active='dialog2'
            @SendRequest="DoRequest"
            @Closethis="ClearDialogs"
            ></UpdPro>
        <!-- Fim Formulário para atualização -->

        <!-- Confirmação de Deleção do Produto -->
            <DelePro
            v-if="dialog3"
            :active='dialog3'
            :Item="SelProduto"
            :MainProp="'name'"
            @SendRequest="DoRequest"
            @Closethis="ClearDialogs"
            ></DelePro>
        <!-- Fim Confirmação para deleção -->

    </v-container>
    
</template>

<script>

import CreatPro from './Produtos/CreatPro' 
import UpdPro from './Produtos/UpdPro' 
import DelePro from './Models/DelForm'
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api'


export default {

    components:{
        CreatPro,
        UpdPro,
        DelePro
    },

    data(){
        return{
            dialog2:false,
            dialog1:false,
            dialog3:false,
            SelProduto: null,
            Produtos:[],
            Search:'',
        }
    },

    methods:{
        DoRequest (FromForm) {
            FromForm[1] = '/produtos' + FromForm[1];
            FromForm.push('Produtos');
            this.$emit('SendRequest', FromForm)
        },

        ClearDialogs () {
            this.dialog1 = this.dialog2 = this.dialog3 = false;
        },

        Enlace () {
            this.Produtos = this.$store.state.estoque;
            this.Produtos.forEach(produto => {
            produto["categoria"] = this.$store.state.categorias[this.$store.state.categorias.findIndex(e => e.id == produto.categoria_id)].name
            });

            this.Produtos.forEach(produto => {
                produto["marca"] = this.$store.state.marcas[this.$store.state.marcas.findIndex(e => e.id == produto.marca_id)].name
            });
        }
    },



    created () {
        this.Enlace();
    }

}
</script>

<style>
    #Produto{
        overflow-y: auto;
        overflow-x: hidden;
        height: 70vh;
    }
    #Produto::-webkit-scrollbar{
        
        width: 8px;
    }
    #Produto::-webkit-scrollbar-track{
        
        background-color: #80cbc39e;
        border-radius: 4px;
    }
    #Produto::-webkit-scrollbar-thumb{
        background: #26a094de;
        border: solid #e0f2f127;
        border-radius: 4px;
    }

</style>