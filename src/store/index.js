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
    moedas: [],
    categorias: [],
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

    setProdutos (state, produtos) {
      state.estoque = produtos.Produtos;
      // instanciando carrinho, caso esteja ausente.
      if (!state.cart) {
        localStorage.setItem('cart', JSON.stringify(new Array()))
      }
    },
    
    setMarcas (state, marcas) {
      state.marcas = marcas.Marcas;
    },

    setMoedas (state, moedas) {
      console.log(moedas)
      state.moedas = moedas.Moedas;
    },
    
    setCategorias (state, categorias) {
      state.categorias = categorias.Categorias;
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

    GetServer ({ commit }, target) {
      axios.get('/'+ target.toLowerCase()).then(({ data }) =>{
        commit('set'+ target, data)
      })
    },
    
    Consumo ({ dispatch }) {
      dispatch('GetServer', 'Marcas');
      dispatch('GetServer', 'Moedas');
      dispatch('GetServer', 'Categorias');
      dispatch('GetServer', 'Produtos');
    },

    AddToCart ({ commit }, item) {
      commit('addCart', item)
    },
  },

  getters : {
    isLogged: state => !!state.user,
    isAdmin: state => !!state.admin
  }
})
