import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

axios.defaults.baseURL = 'http://127.0.0.1:8000/api'

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('user')),
    admin: false,
    estoque: [],
    marcas: [],
    cart: JSON.parse(localStorage.getItem('cart')),
  },

  mutations: {
    setUserData (state, userData) {
      state.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
      axios.defaults.headers.common.Authorization = `Bearer ${userData.token}`
    },

    clearUserData () {
      localStorage.removeItem('user')
      location.reload()
    },

    setEstoque (state, produtos) {
      state.estoque = produtos;
      //instanciando um carrinho na memória como um array.
      if (!state.cart) {
        localStorage.setItem('cart', JSON.stringify(new Array()))
      }
    },

    addCart (state, produto) {
      if(!state.cart[state.cart.findIndex(e => e.id == produto.id)]){
        produto["qtdincart"] = 1;
        state.cart.push(produto);
      } else {
        state.cart[state.cart.findIndex(e => e.id == produto.id)].qtdincart ++;
      }

      localStorage.setItem('cart', JSON.stringify(state.cart))
    },

    setMarcas (state, marcas) {
      state.marcas = marcas.Marcas;
    }
  },

  actions: {
    login ({ commit }, credentials) {
      return axios
        .post('/auth/login', credentials)
        .then(({ data }) => {
          commit('setUserData', data)
        })
    },

    logout ({ commit }) {
      commit('clearUserData')
    },

    register ({}, data) {
      axios.post('/auth/register', data)
    },

    superauth () {
      axios.get('/auth/admin', {
        headers: {
          'Authorization': `Bearer ${this.state.user.access_token}`
        }
      })
      .then(({ data }) => {
        if(data.response == 1) {
          this.state.admin = true;
        }
      })
    },

    GetEstoque ({ commit }) {
      axios.get('/auth/produtos').then(({ data }) =>{
        commit('setEstoque', data)
      })
    },

    AddToCart ({ commit }, item) {
      commit('addCart', item)
    },

    GetMarcas ({ commit }) {
      axios.get('/auth/marcas').then(({ data }) => {
        commit('setMarcas', data)
      })
    }

  },

  getters : {
    isLogged: state => !!state.user,
    isAdmin: state => !!state.admin
  }
})
