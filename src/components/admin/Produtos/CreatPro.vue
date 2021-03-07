<template>

        <v-layout row justify-center>
            <v-dialog v-model="active" persistent max-width="500px"
                light>

                <v-card>

                    <v-card-title>
                        <span class="headline">Cadastrar Produto</span>
                    </v-card-title>

                    <v-card-text>

                        <v-container grid-list-md>
                            <v-form
                            ref="form"
                            lazy-validation>
                                <v-layout wrap>

                                        <v-flex sm12>
                                            <v-text-field label="Nome"
                                            :rules="[rules.required]"
                                            readonly
                                            disabled
                                            v-model="Item.name" 
                                            ></v-text-field>
                                        </v-flex>

                                        <v-flex sm6>
                                            <v-text-field label="Preço" 
                                            :rules="[rules.required, rules.notlezero]"
                                            v-model="Item.price" 
                                            type="number"
                                            ></v-text-field>
                                        </v-flex>

                                        <v-flex sm6>
                                            <v-text-field label="Quantidade" 
                                            :rules="[rules.required, rules.notlzero]"
                                            v-model="Item.quantidade" 
                                            type="number"></v-text-field>
                                        </v-flex>

                                        <v-flex sm6>
                                            <v-select light
                                            :items="this.$store.state.categorias"
                                            item-text="name"
                                            item-value="id"
                                            v-model="Item.categoria_id"
                                            :rules="[rules.required]"
                                            label="Categoria"></v-select>
                                        </v-flex>

                                        <v-flex sm6>
                                            <v-select light
                                            :items="this.$store.state.marcas"
                                            item-text="name"
                                            item-value="id"
                                            v-model="Item.marca_id"
                                            :rules="[rules.required]"
                                            label="Marca"></v-select>
                                        </v-flex>

                                        <v-flex sm12>
                                            <v-file-input label="Imagem"
                                            :rules="[rules.required]"
                                            truncate-length="15" 
                                            accept="image/*"
                                            prepend-icon="mdi-camera"
                                            v-model="Item.image"
                                            ></v-file-input>
                                        </v-flex>
                                </v-layout>
                            </v-form>
                        </v-container>

                    </v-card-text>
                    <v-card-actions>

                        <v-spacer></v-spacer>
                        <v-btn color="red darken-1" @click.native="Sumir" text>Close</v-btn>
                        <v-btn color="green darken-1" @click.native="Checkfields" text>Save</v-btn>

                    </v-card-actions>
                </v-card>

            </v-dialog>
        </v-layout>

</template>

<script>
export default {
    props:{
        active:Boolean,
    },
    data () {
        return {
            Item: {},
            rules:{
                required: value => !!value || 'Obrigatório!',
                notlzero: value => value>=0 || 'Inválido!',
                notlezero: value => value>0 || 'Inválido!'
            }
        }
    },
    methods:{
        
        Checkfields() {
            if ( this.$refs.form.validate() ) {
                this.$emit('SendRequest', [this.Item,'/create'] );
                this.Sumir();
            }
        },

        Sumir () {
            this.$emit('Closethis')
        }
    }
}
</script>

