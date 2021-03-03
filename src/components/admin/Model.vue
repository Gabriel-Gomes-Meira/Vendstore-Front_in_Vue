<template>

    <v-container 
    class="pa-12"
    >  
        <v-toolbar
        color="blue-grey darken-3"
        class="pl-2 pr-4 rounded-t-lg elevation-1"
        >
            <v-toolbar-title>{{Model}}</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-text-field
            class="pt-6 SearchDisable"
            prepend-inner-icon="mdi-magnify"
            filled dense
            @focus="SwitchSearch = true"
    	    @blur="SwitchSearch = false"
            :class="{
                'SearchEnable':SwitchSearch
            }"
            v-model="search"
            > 
            </v-text-field>
            
            <v-btn icon>
                <v-icon
                @click="DialogAdd = true"
                size="33">mdi-plus</v-icon>
            </v-btn>
        </v-toolbar>

        <v-data-table
        :headers="Headers"
        :items="Data"
        :search="search"
        :items-per-page="7"
        class="rounded-b-lg rounded-t-0"
        light
        id="Table"
        >
            <template slot="no-data">
                Não há {{Model}} Cadastradas!
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon
                    small
                    class="mr-2"
                    @click="DialogUp = true"
                    @mouseenter="SelectedItem = item"
                >
                    mdi-pencil
                </v-icon>
                <v-icon
                    small
                    @click="DialogDel = true"
                    @mouseenter="SelectedItem = item"
                >
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>

        <!-- Insert Cadastro Input - Start -->
            <up-form
            v-if="DialogAdd"
            :active="DialogAdd"
            :Item="Cadastro"
            :Inputs="InputFields"
            :HeadLine="'Cadastrar '+this.Model.slice(0, -1)"
            :Type="'/create'"
            @SendRequest="DoRequest"
            @Closethis="ClearDialogs"
            ></up-form>
        <!-- Insert Marca Input - End -->

        <!-- Update Marca Input Start -->
            <up-form
            v-if="DialogUp"
            :active="DialogUp"
            :Item="SelectedItem"
            :Inputs="InputFields"
            :HeadLine="'Atualizar '+this.Model.slice(0, -1)"
            :Type="'/update'"
            @SendRequest="DoRequest"
            @Closethis="ClearDialogs"
            ></up-form>
        <!-- Update Marca Input End -->

        <!-- Delete Marca Dialog Start -->
            <del-form
            v-if="DialogDel"
            :active="DialogDel"
            :Item="SelectedItem"
            :MainProp="'name'"
            @SendRequest="DoRequest"
            @Closethis="ClearDialogs"
            ></del-form>
        <!-- Delete Marca Dialog End -->
    </v-container>

</template>

<script>
import UpForm from './Tables/UpForm.vue'
import DelForm from './Tables/DelForm.vue'


export default {
    components: {
        UpForm,
        DelForm
    },

    props:{
        Model:String,
        Headers:null,
        InputFields:Array,
    },

    data () {
        return {
            DialogAdd:false,
            DialogUp:false,
            DialogDel:false,
            SwitchSearch: false,
            Data:this.$store.state.marcas,
            search:'',
            SelectedItem:null,
            Cadastro:{
                name:''
            }
        }
    },

    methods: {
        ClearDialogs () {
            this.DialogAdd = this.DialogUp =  this.DialogDel = false;
        },

        DoRequest (FromForm) {
            FromForm[1] = '/'+this.Model.toLowerCase() + FromForm[1]
            FromForm.push(this.Model)
            this.$emit('SendRequest', FromForm)
        }
    },

}
</script>

<style>

    .SearchEnable {
       max-width:25%!important;
       transition: 500ms!important;
    }
    .SearchEnable .v-input__slot::after  {
        color: white;
    }
    .SearchEnable .v-input__icon i::before {
        color: white;
    } .SearchEnable .v-input__icon i::after {
        color: white;
    } .SearchEnable .v-text-field__slot {
        caret-color: white;
    }
    
    .SearchDisable {
        max-width: 45px;
        transition: 750ms;
    }

    .SearchDisable .v-input__slot::before {
        display: none;
    }
    
    
    #Table thead {
        background-color: #78909C;
    }
    #Table thead tr th{
        color: white;
        font-size: 10.5pt;
    }

    #Table tbody tr td {
        color: black;
        font-weight: 500;
        font-size: 10pt;
        
    }

    #Table tbody {
        background-color: #ECEFF1;
    }

    #Table tbody :hover {
        background-color: #CFD8DC;
    }

    #Table {
        background-color: #455A64;
        color: white;
    }

    #Table .v-data-footer__select {
        display: none;
    }

</style>
