<template>

    <v-container
    fluid
    id="Produto">
        <v-row
        align="center"
        justify="center">
            <v-alert 
            :type="result" 
            v-for="(message, index) in messages"
            :key="index"
            @click="messages.splice(index,1)"
            dismissible
            sm6
            >
                {{ message }}    
            </v-alert>
        </v-row>
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
                >
                    <v-img
                    class="black--text align-end"
                    height="200px"
                    :src="'http://localhost:8000/storage/produto/' + Produto.image"
                    >
                        <v-card-title>{{ Produto.name }}</v-card-title>
                    </v-img>

                    <v-card-subtitle class="pb-0">
                        Preço: {{ Produto.price }}
                    </v-card-subtitle>

                    <v-card-text class="text--primary">
                        <p
                        left>Moeda: {{ Produto.moeda }}$ </p>

                        <p
                        right>Quantidade: {{ Produto.quantidade }} </p>
                    </v-card-text>

                    <v-card-actions
                    @mouseover="SelProduto = Produto"
                    >
                        <v-btn
                        color="orange"
                        text
                        @click="dialog2 = true"
                        >
                            Atualizar
                        </v-btn>

                        <v-btn
                        color="red"
                        text
                        @click="dialog3 = true"
                        >
                            Deletar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        
        <!-- Formulario para inserção de Produto -->
            <UPForm
            v-if="dialog1"
            :NewProduto="SelProduto"
            :active='dialog1'
            @SendRequest="Empacotar"
            @Closethis="ClearDialogs"
            ></UPForm>
        <!-- Fim Formulário para inserção -->

        <!-- Formulario para Atualização de Produto -->
            <UPForm 
            v-if="dialog2"
            :NewProduto="SelProduto"
            :active='dialog2'
            :type="'/update'"
            @SendRequest="Empacotar"
            @Closethis="ClearDialogs"
            ></UPForm>
        <!-- Fim Formulário para atualização -->

        <!-- Confirmação de Deleção do Produto -->
            <DelForm
            :active='dialog3'
            @SendRequest="Empacotar"
            :OldProduto="SelProduto"
            @Closethis="ClearDialogs"
            ></DelForm>
        <!-- Fim Confirmação para deleção -->
    </v-container>
    
</template>

<script>

import UPForm from './Produtos/UPForm' 
import DelForm from './Produtos/DelForm'
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api'


export default {

    components:{
        UPForm,
        DelForm
    },

    data(){
        return{
            dialog2:false,
            dialog1:false,
            dialog3:false,
            messages:[],
            result:'success',
            SelProduto: null,
            Produtos:this.$store.state.estoque.Produtos,
        }
    },

    methods:{

        Empacotar (FromForm) {        
            var formData = new FormData();
            if (FromForm[1] != '/delete') {
                formData.append('name', FromForm[0].name);
                formData.append('price', FromForm[0].price);
                formData.append('quantidade', FromForm[0].quantidade);
                formData.append('moeda', FromForm[0].moeda);
                formData.append('image', FromForm[0].image, FromForm[0].image.name);
            }
            if (FromForm[1] != '/create') {
                formData.append('id', FromForm[0].id);
            }
  
            this.Request(formData, FromForm[1]);
        },

        Request (formData, type) {

            axios.post(`/auth/produtos${type}`, formData,
            {
                headers: {
                    'Authorization': `Bearer ${this.$store.state.user.access_token}`
                }
            })
            .then(({ data }) => {
                this.messages.push(data.message);
                this.result = 'success';
                this.$store.dispatch('GetEstoque');
                this.$emit('Re_render');
            })
            .catch(({ response }) => {
                console.log(response);
                this.messages.push(response.data.message);
                this.result = 'error';
            })
        },

        ClearDialogs () {
            this.dialog1 = this.dialog2 = this.dialog3 = false;
        }
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