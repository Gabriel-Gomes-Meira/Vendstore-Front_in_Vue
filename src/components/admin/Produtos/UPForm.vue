<template>
        <v-layout row justify-center>
            <v-dialog v-model="active" persistent max-width="500px"
                light>
                <v-card>
                    <v-card-title>
                        <span class="headline">{{ action }} Produto</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-alert @click="witherror =  !witherror"
                                border="left"
                                color="red"
                                dismissible
                                elevation="3"
                                type="warning"
                                v-if="witherror"
                                >Por favor, confira o preenchimento dos campos!</v-alert>

                                <v-flex xs12 sm6 md4>
                                    <v-text-field label="Nome"
                                    :rules="[rules.required]"
                                    v-model="Item.name" 
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12 sm6 md4>
                                    <v-text-field label="Preço" 
                                    :rules="[rules.required]"
                                    v-model="Item.price" 
                                    type="number"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12 sm6 md4>
                                    <v-text-field label="Moeda" 
                                    :rules="[rules.required, rules.moeda]"
                                    v-model="Item.moeda" 
                                    counter="2"></v-text-field>
                                </v-flex>

                                <v-flex xs12>
                                    <v-text-field label="Quantidade" 
                                    :rules="[rules.required]"
                                    v-model="Item.quantidade" 
                                    type="number"  
                                    required></v-text-field>
                                </v-flex>

                                <v-file-input label="Imagem"
                                :rules="[rules.required]"
                                truncate-length="15" 
                                v-model="Item.image"
                                ></v-file-input>

                            </v-layout>
                        </v-container>

                        
                    </v-card-text>
                    <v-card-actions>

                        <v-spacer></v-spacer>
                        <v-btn color="red darken-1" @click.native="Sumir">Close</v-btn>
                        <v-btn color="green darken-1" @click.native="Checkfields">Save</v-btn>

                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
</template>

<script>
export default {
    mounted() {
        if (this.Type == '/update') {
            this.Type = '/update'
            this.action = 'Atualizar'
                this.Item.id = this.NewProduto.id
                this.Item.name = this.NewProduto.name
                this.Item.price = this.NewProduto.price
                this.Item.quantidade = this.NewProduto.quantidade
                this.Item.moeda = this.NewProduto.moeda
                this.Item.image = null
        }
    },
    props:{
        active:Boolean,
        NewProduto:null,
        Type:'/create',
    },
    data () {
        return {
            witherror:false,
            action:'Cadastrar',
            Item: {
                name:null,
                price:Number,
                quantidade:Number,
                moeda:null,
                image:null,
            },
            rules:{
                moeda: value => value.length <= 2 || 'Apenas dois caracteres',
                required: value => !!value || 'Obrigatório',
                notzero: value => value<=0 || 'Inválido!'
            }
        }
    },
    methods:{
        
        Checkfields() {

            var freefromerros = true;

            if (!this.Item.name) {
                freefromerros = false;
            } if (this.Item.price == 0 || !this.Item.price) {
                freefromerros = false;
            } if (this.Item.quantidade == 0 || !this.Item.quantidade) {
                freefromerros = false;
            } if (!this.Item.moeda || this.Item.moeda.length>2) {
                freefromerros = false;
            } if (!this.Item.image) {
                freefromerros = false;
            }

            if (freefromerros) {
                this.$emit('SendRequest', [this.Item,this.Type] );
                this.Sumir();
            } else {
                this.witherror = true;
            }
        },

        Sumir () {
            this.$emit('Closethis')
        }
    }
}
</script>

