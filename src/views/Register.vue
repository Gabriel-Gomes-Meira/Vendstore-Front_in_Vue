<template>
    <v-container
          class="fill-height"
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
                  <v-toolbar-title> Cadastrar </v-toolbar-title>
                  <v-spacer></v-spacer>
                  
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      label="Nome"
                      name="nome"
                      prepend-icon="mdi-account"
                      v-model="User.name"
                      type="text"
                    ></v-text-field>

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
                    <v-text-field
                      id="Confirmpassword"
                      label="Confirmação"
                      name="Confirmpassword"
                      prepend-icon="mdi-lock"
                      v-model="User.confirmpass"
                      type="password"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="CreateUser(User)"> Cadastrar </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
</template>

<script>

export default {
    
    props:{
        email:"",
        password:""
    },
    data(){
        return{
            User:{
                email:this.$props.email,
                password:this.$props.password,
                name:'',
                confirmpass:''
            },
            emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
        }
    },
    methods:{
        CreateUser(){
            this.$store.dispatch('register', {
                email:this.User.email,
                password:this.User.password,
                name:this.User.name,
                password_confirmation:this.User.confirmpass
            })
            .then(() =>{
                this.LoginUser();
            }).catch(err => {
            console.log(err)
            })
        },
        LoginUser(){
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
</script>

<style>

</style>