<template>
    <div>

        <div id="app" v-if='isLogged && isAdmin'>
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
                        <Produtos   
                        @Re_render="Refresh"
                        :key="prodkey"
                        v-if="group == 0"></Produtos>

                        <Marcas
                        v-if="group == 1">
                        </Marcas>
                        
                </v-main>
            
                <v-footer app>
                    <span>&copy; {{ new Date().getFullYear() }}</span>
                </v-footer>
                </v-app>
            </v-app>
        </div>

        <v-container v-else-if="!isLogged"
        mt-16
        pt-16>
            <login></login>
        </v-container>

        <v-container v-else-if="!isAdmin"
        mt-16
        pt-16>
            <NotFound></NotFound>
        </v-container>

        
        
    </div>
    
    
</template>


<script>

import { mapGetters } from 'vuex'
import login from './Login.vue';
import Produtos from '../components/admin/Produtos.vue';
import Marcas from '../components/admin/Marcas.vue'
import NotFound from '../components/NotFound'

export default {

    components: {
        login,
        Produtos,
        Marcas,
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
            prodkey:0
        }
    },

    created () {
        this.$store.dispatch('superauth');
    },

    beforeUpdate () {
        if(this.isLogged && this.isAdmin)
            this.$vuetify.theme.dark = true;
    },

    methods:{

        Refresh () {
            setTimeout(this.Re_render, 500)
        },

        Re_render () {
            this.prodkey ++
        }
    }

}
</script>

<style>

</style>