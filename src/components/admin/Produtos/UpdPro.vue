<template>

        <v-layout row justify-center>
            <v-dialog v-model="active" persistent max-width="500px"
                light>

                <v-card>

                    <v-card-title>
                        <span class="headline">Atualizar Produto</span>
                    </v-card-title>

                    <v-card-text>

                        <v-container grid-list-md>
                            <v-form
                            ref="form"
                            lazy-validation
                            :key="upkey">
                                <v-layout 
                                wrap >

                                        <v-flex
                                        sm12 class="d-flex align-center">                                 
                                            <v-btn
                                            color="purple"
                                            icon outlined
                                            @click="ChangeEnable(0)">
                                                <v-icon v-if="!isEditing[0]">mdi-pencil</v-icon>
                                                <v-icon v-else>mdi-close</v-icon>
                                            </v-btn>
                                             
                                            <v-text-field label="Nome"
                                            class="ml-2"
                                            v-if="!isEditing[0]"
                                            disabled
                                            ></v-text-field>
                                            
                                            <v-text-field label="Nome"
                                            v-else class="ml-2"
                                            :rules="[rules.required]"
                                            v-model="Item.name"
                                            ></v-text-field>
                                        </v-flex>

                                        <v-flex sm6
                                        class="d-flex align-center">
                                            <v-btn
                                            color="purple"
                                            icon outlined
                                            @click="ChangeEnable(1)">
                                                <v-icon v-if="!isEditing[1]">mdi-pencil</v-icon>
                                                <v-icon v-else>mdi-close</v-icon>
                                            </v-btn>

                                            <v-text-field label="Preço"
                                            class="ml-2"
                                            v-if="!isEditing[1]"
                                            disabled
                                            ></v-text-field>

                                            <v-text-field label="Preço" 
                                            v-else class="ml-2"
                                            :rules="[rules.required, rules.notlezero]"
                                            v-model="Item.price" 
                                            type="number"
                                            ></v-text-field>
                                        </v-flex>

                                        <v-flex sm6
                                        class="d-flex align-center">
                                            <v-btn
                                            color="purple"
                                            icon outlined
                                            @click="ChangeEnable(2)">
                                                <v-icon v-if="!isEditing[2]">mdi-pencil</v-icon>
                                                <v-icon v-else>mdi-close</v-icon>
                                            </v-btn>

                                            <v-text-field label="Quantidade"
                                            v-if="!isEditing[2]" class="ml-2" 
                                            readonly disabled></v-text-field>

                                            <v-text-field label="Quantidade" 
                                            v-else class="ml-2"
                                            :rules="[rules.required, rules.notlzero]"
                                            v-model="Item.quantidade" 
                                            type="number"></v-text-field>
                                        </v-flex>

                                        <v-flex sm6
                                        class="d-flex align-center">
                                            <v-btn
                                            color="purple"
                                            icon outlined
                                            @click="ChangeEnable(3)">
                                                <v-icon v-if="!isEditing[3]">mdi-pencil</v-icon>
                                                <v-icon v-else>mdi-close</v-icon>
                                            </v-btn>

                                            <v-select light
                                            v-if="!isEditing[3]" class="ml-2"
                                            disabled readonly
                                            label="Categoria"></v-select>

                                            <v-select light
                                            v-else class="ml-2"
                                            :items="this.$store.state.categorias"
                                            item-text="name"
                                            item-value="id"
                                            v-model="Item.categoria_id"
                                            :rules="[rules.required]"
                                            label="Categoria"></v-select>
                                        </v-flex>

                                        <v-flex sm6
                                        class="d-flex align-center">
                                            <v-btn
                                            color="purple"
                                            icon outlined
                                            @click="ChangeEnable(4)">
                                                <v-icon v-if="!isEditing[4]">mdi-pencil</v-icon>
                                                <v-icon v-else>mdi-close</v-icon>
                                            </v-btn>

                                            <v-select
                                            disabled readonly
                                            v-if="!isEditing[4]" class="ml-2"
                                            label="Marca"></v-select>

                                            <v-select
                                            v-else class="ml-2"
                                            :items="this.$store.state.marcas"
                                            item-text="name"
                                            item-value="id"
                                            v-model="Item.marca_id"
                                            :rules="[rules.required]"
                                            label="Marca"></v-select>
                                        </v-flex>

                                        <v-flex sm12
                                        class="d-flex align-center">
                                            <v-btn
                                            color="purple"
                                            icon outlined
                                            @click="ChangeEnable(5)">
                                                <v-icon v-if="!isEditing[5]">mdi-pencil</v-icon>
                                                <v-icon v-else>mdi-close</v-icon>
                                            </v-btn>

                                            <v-file-input label="Imagem"
                                            readonly disabled
                                            v-if="!isEditing[5]" class="ml-2"
                                            prepend-icon="mdi-camera"
                                            ></v-file-input>

                                            <v-file-input label="Imagem"
                                            v-else class="ml-2"
                                            :rules="[rules.required]"
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
        Id:Number,
    },

    data () {
        return {
            upkey:0,
            isEditing:[],
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
                this.Item.id = this.Id;
                this.$emit('SendRequest', [this.Item,'/update'] );
                this.Sumir();
            }
        },

        Sumir () {
            this.$emit('Closethis')
        },

        ChangeEnable (index) {
            this.upkey++;
            this.isEditing[index] = !this.isEditing[index];
        }
    }
}
</script>

