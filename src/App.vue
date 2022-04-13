<template>
  <v-app
  id="TheApp">
    
    
    <BarraApp
    @Router="To"
    @ChangeView="AlterHome"
    @CallDrawer="drawer = !drawer"
    :drawer="drawer"
    v-if="$router.currentRoute.name!='Admin'">
    </BarraApp>

    <v-navigation-drawer
    v-model="drawer"
    absolute
    temporary
    v-if="$router.currentRoute.name!='Admin'"
    >
      <v-list
      nav dense
      >
        <v-list-item-group
        active-class="amber--text text--accent-4"
        >
          <v-list-item
          @click="To('Produtos')">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
              <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <v-list v-if="!isLogged"
      nav dense
      >
        <v-list-item-group
          active-class="amber--text text--accent-4"
        >
          <v-list-item
          @click="To('Login')">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
              <v-list-item-title>Login</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <v-list v-if="!isLogged"
        nav
        dense
      >
        <v-list-item-group
          active-class="amber--text text--accent-4"
        >
          <v-list-item
          @click="To('Register')">
            <v-list-item-icon>
              <v-icon>mdi-account-circle</v-icon>
            </v-list-item-icon>
              <v-list-item-title>Registrar</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <v-list v-if="isLogged"
        nav
        dense
      >
        <v-list-item-group
          active-class="amber--text text--accent-4"
        >
          <v-list-item
          @click="$store.dispatch('logout')">
            <v-list-item-icon>
              <v-icon>mdi-exit-run</v-icon>
            </v-list-item-icon>
              <v-list-item-title>Sair</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

  
  <router-view/>
      

    
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import BarraApp from './components/Home/BarraApp.vue'

export default {
  name: 'App',

  components:{
    BarraApp
  },

  computed: {
    ...mapGetters([
      'isLogged'  
  ])},

  data: () => ({
    drawer:false
  }),

  methods:{
    
    To(path){
      this.$router.push({ name: path }).catch(()=>{})
    },

    AlterHome (View) {
      this.To(View)
    }
  },

  created() {
    this.$store.dispatch('Consumo'); 
    this.$store.dispatch('superauth')   
  },


}
</script>


<style>
    .v-progress-circular {
      margin: 1rem;
    }

  html{
    overflow-y: hidden;
  }

  #TheApp{
    background-color: #FFFDE7;
  }

  .withScrollBar{
      overflow-y: auto;      
  }
  .withScrollBar::-webkit-scrollbar{
      
      width: 8px;
  }
  .withScrollBar::-webkit-scrollbar-track{
      /* margin-top: 50px; */
      background-color: #3b3b3c8c;
      border-radius: 4px;
  }
  .withScrollBar::-webkit-scrollbar-thumb{
      background: #91919435;
      border: solid #74758400;
      border-radius: 4px;
  }
  
</style>
