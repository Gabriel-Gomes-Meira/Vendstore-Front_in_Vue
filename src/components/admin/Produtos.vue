<template>

    <v-container
    fluid
    id="Produto">
        <v-row
        align="center"
        justify="center"
        >
            <v-spacer></v-spacer>
            <v-col
            lg="2"
            sm="3">
                <v-btn color="success" @click="dialog1 = !dialog1">Criar Produto</v-btn>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>

        <v-row
        id="ShowingProduto" >
            <v-col
            lg="3"
            md="4"
            sm='5'
            v-for="(Produto, index) in Produtos" 
            :key="index">
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
        
        <!-- Formulario para inserção de Produto -->
            <CreatPro
            v-if="dialog1"
            :active='dialog1'
            @SendRequest="DoRequest"
            @Closethis="ClearDialogs"
            ></CreatPro>
        <!-- Fim Formulário para inserção -->

        <!-- Formulario para Atualização de Produto -->
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
            Produtos:this.$store.state.estoque,
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
        }
    },

    created () {
        this.Produtos.forEach(produto => {
            produto["categoria"] = this.$store.state.categorias[this.$store.state.categorias.findIndex(e => e.id == produto.categoria_id)].name
        });

        this.Produtos.forEach(produto => {
            produto["marca"] = this.$store.state.marcas[this.$store.state.marcas.findIndex(e => e.id == produto.marca_id)].name
        });
    }

}
</script>

<style>
    #Produto{
        overflow-y: auto;
        height: 80vh;
    }
    #Produto::-webkit-scrollbar{
        
        width: 8px;
    }
    #Produto::-webkit-scrollbar-track{
        margin-top: 50px;
        background-color: #3b3b3c8c;
        border-radius: 4px;
    }
    #Produto::-webkit-scrollbar-thumb{
        background: #91919435;
        border: solid #74758400;
        border-radius: 4px;
    }

</style>