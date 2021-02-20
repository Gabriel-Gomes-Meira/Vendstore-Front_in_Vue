<template>
    <!--  -->
      
        <v-container
          class="fill-height "
          fluid
          
        >
          <v-row
            align="center"
            justify="center"
          >
            <v-col
              cols="12"
              sm="8"
              md="4"
            >
              <v-card class="elevation-12">
                <v-toolbar
                  color="orange"
                  dark
                  flat
                >
                  <v-toolbar-title> Entrar</v-toolbar-title>
                  <v-spacer></v-spacer>
                  
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      label="Login"
                      name="login"
                      prepend-icon="mdi-account"
                      v-model="User.email"
                      :rules="emailRules"
                      type="text"
                    ></v-text-field>
  
                    <v-text-field
                      id="password"
                      label="Password"
                      name="password"
                      prepend-icon="mdi-lock"
                      v-model="User.password"
                      type="password"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="LoginUser(User)">Logar</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
        
      
        
    <!--  -->
</template>

<script>
// import form from '@/components/Formlogin.vue'

export default {
    name: 'Login',
    props:{
        email:"",
        password:"" 
    },
    data() {
        return {
            User:{
                email:this.$props.email,
                password:this.$props.password
            },
            emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
        }
    },
    methods:{
        LoginUser(data)
        {
            
            if (!data.email) {
                alert('Informe o email');
            } else if (!data.password) {
                alert('Verifique a senha!');
            } else {
            
            this.$store.dispatch('login', {
                email: this.User.email,
                password: this.User.password
                })
                .then(() => {
                this.$router.push({ name: 'Home' })
                })
                .catch(err => {
                console.log(err)
                })
            }
        }
    }
}
</script>

<style>
    html{
        overflow-y: hidden;
    }
</style>