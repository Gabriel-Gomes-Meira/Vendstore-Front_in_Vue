<template>

    <div id="app">
        <v-app id="inspire">
            <v-app id="inspire">
                <v-navigation-drawer
                v-model="drawer"
                app
                clipped
                >
                <v-list-item-group
                v-model="group"
                >
                    <v-list dense>
                        <v-list-item link>
                            <v-list-item-action>
                                <v-icon>mdi-clipboard-plus-outline</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>Produtos</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item link>
                            <v-list-item-action>
                                <v-icon>mdi-bookmark-multiple</v-icon>
                            </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Marcas</v-list-item-title>
                        </v-list-item-content>
                        </v-list-item>

                        <v-list-item link>
                            <v-list-item-action>
                                <v-icon>mdi-bitcoin</v-icon>
                            </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Moedas</v-list-item-title>
                        </v-list-item-content>
                        </v-list-item>
                        
                        <v-list-item link>
                            <v-list-item-action>
                                <v-icon>mdi-layers</v-icon>
                            </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Categorias</v-list-item-title>
                        </v-list-item-content>
                        </v-list-item>
                        
                        <v-list-item link>
                            <v-list-item-action>
                                <v-icon>mdi-cog</v-icon>
                            </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Pedidos?</v-list-item-title>
                        </v-list-item-content>
                        </v-list-item>

                        <v-list-item link
                        @click="$store.dispatch('logout')">
                            <v-list-item-icon>
                            <v-icon>mdi-exit-run</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Sair</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-list-item-group>
                </v-navigation-drawer>
        
            <v-app-bar
            app
            clipped-left
            >
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                <v-toolbar-title>Área de Administrador</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-title >{{this.$store.state.user.user.name}}</v-toolbar-title>
                    
            </v-app-bar>
            
            <v-main>
                    <v-container>
                        <v-alert 
                        :type="result" 
                        v-for="(message, index) in messages"
                        :key="index"
                        dismissible
                        sm6
                        >
                        {{ message }}    
                        </v-alert>
                    </v-container>
                    
                    <Produtos :key="prodkey"
                    @SendRequest="Empacotar"
                    v-show="group == 0"></Produtos>

                    <Model :key="prodkey+1" :Model="'Marcas'"
                    :Data="this.$store.state.marcas"
                    @SendRequest="Empacotar"
                    v-show="group == 1">
                    </Model>

                    <Model :key="prodkey+2" :Model="'Moedas'"
                    :Data="this.$store.state.moedas"
                    @SendRequest="Empacotar"
                    v-show="group == 2"></Model>
                    
                    <Model :key="prodkey+3" :Model="'Categorias'"
                    :Data="this.$store.state.categorias"
                    @SendRequest="Empacotar"
                    v-show="group == 3"
                    ></Model>                    
            </v-main>
        
            <v-footer app>
                <span>&copy; {{ new Date().getFullYear() }}</span>
            </v-footer>
            </v-app>
        </v-app>
    </div>
</template>


<script>

import { mapGetters } from 'vuex'
import axios from 'axios'
import login from './Login.vue';
import Produtos from '../components/admin/Produtos.vue';
import Model from '../components/admin/Model.vue'
import NotFound from '../components/NotFound'


axios.defaults.baseURL = 'http://127.0.0.1:8000/api'

export default {
    name: 'Admin',

    components: {
        login,
        Produtos,
        Model,
        NotFound
    },

    computed: {
    ...mapGetters([
      'isLogged',
      'isAdmin'
    ])},

    data () {
        return {
            drawer: null,
            group:null,
            prodkey:0,
            messages:[],
            result:'success'
        }
    },

    // beforeCreate () {
        
    // },

    created () {        
        if (!this.isLogged) {
            this.$router.push({ name: "Login"})
        }     
                
        if(!this.isAdmin) {
            this.$router.push({ name: "NotFound"})
        }                    
    },

    // mounted() {
        
    // },       

    beforeMount () {
        if(this.isLogged && this.isAdmin)
            this.$vuetify.theme.dark = true;
    },

    methods:{

        Refresh () {
            setTimeout(this.Re_render, 500)
        },

        Re_render () {
            this.prodkey ++
        },

        Empacotar (FromForm) {
            var formData = new FormData();
            var Form = FromForm[0];
            for (var field in Form) {
                formData.append(field, Form[field])
            }

            this.Request(formData, FromForm[1], FromForm[2]);
        },

        Request (formData, type, Model) {

            axios.post(`${type}`, formData,
            {
                headers: {
                    'Authorization': `Bearer ${this.$store.state.user.access_token}`
                }
            })
            .then(({ data }) => {
                this.$store.dispatch('GetServer', Model);
                this.messages.push(data.message);
                this.result = 'success';    
                this.Refresh();
            })
            .catch(({ response }) => {
                this.$store.dispatch('GetServer', Model);
                this.messages.push(response.data.message);
                this.result = 'error';
                this.Refresh();
            })

            
        },
        
    }

}
</script>

