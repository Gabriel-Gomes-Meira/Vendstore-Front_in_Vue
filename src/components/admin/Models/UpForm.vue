<template>
        <v-layout row justify-center>
            <v-dialog v-model="active" persistent max-width="500px"
                light>
                <v-card>
                    <v-card-title>
                        <span class="headline">{{ HeadLine }}</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-form
                            ref="form"
                            lazy-validation>
                            <v-layout wrap>
                                    <v-flex 
                                    lg12 sm12 md12
                                    v-for="(Input, index) in Inputs" :key="index">
                                        <v-text-field 
                                        :label="Input.label"
                                        :rules="Input.rules"
                                        v-model="Item[Input.name]" 
                                        ></v-text-field>
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
        HeadLine:String,
        Inputs:Array,
        Item:null,
        Type:String,
    },
    methods:{
        
        Checkfields() {
            if ( this.$refs.form.validate() ) {
                this.$emit('SendRequest', [this.Item,this.Type] );
                this.Sumir();
            }
        },

        Sumir () {
            this.$emit('Closethis')
        }
    }
}
</script>


// Tá bom, eis a ideia de gereralização suprema...
// Vou passar pra props um objeto que terá:
// array de inputs;

// & : um objeto com a propriedades a serem preenchidas.

//     ficará assim:

//             inputs:[
//                 {
//                     type:'text',
//                     name:'name',
//                     label:'Nome',
//                     rules:[
//                         value => !!value || 'Obrigatório',
//                         value => value.length<8 || 'Inválido!'
//                     ]
//                 },
//             ]

//             Item:{
//                 name:null
//             }

// ... fechou!

Se gostou, então tem mais ainda! A função de SendRequest para o servidor será realizada pela view Admin, e não o Componente tabela... Para isso, muito simples:
Passe um array com o objeto a ser upado e a url. No form object tu cria um apend para cada propriedade no objeto usando for in, e exiba as mensagens de erro pelo Admin. FECHOU!

Não pare por aí, busque aplicar generalização nas funções do store. (funções criadas dinâmicamente são a resposta, fica a dica)