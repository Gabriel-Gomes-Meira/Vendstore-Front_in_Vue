<template>
  
  <!-- Tabela customizada -->
  <!-- elevation="8" -->

  <v-sheet
  rounded="lg"
  color="yellow lighten-2"
  elevation="2"
  >
    <v-container 
    elevation="3">
      <v-data-table
        :headers="headers"
        :items="Cart"
        hide-default-footer
        class="elevation-1"
      >
        <template v-slot:[`item.image`]="{ item }">
          <v-img
          max-width="100"
          :src="'http://localhost:8000/storage/produto/'+ item.image"
          ></v-img>
        </template>

        <template v-slot:[`item.qtdincart`]="{ item }">
          <v-btn
          v-if="item.qtdincart>0"
          depressed
          x-small
          color="red"
          outlined
          @click="item.qtdincart--"
          >   -
          </v-btn>
              {{ item.qtdincart }}
          <v-btn
          v-if="item.qtdincart<item.quantidade"
          depressed
          x-small
          outlined
          color="green"
          @click="item.qtdincart++"
          >   +
          </v-btn>
        </template>

        <template v-slot:footer>
          <v-banner>
            THIS IS A FOOT TABLE!
          </v-banner>
        </template>
      </v-data-table>
      
    </v-container>


    <!-- <v-container
    >
      <v-simple-table
      fixed-header
      height="300px"
      >
        <thead>
          <tr>
            <th class="text-center"
            colspan="2">
              <v-spacer></v-spacer>
            </th>
            <th class="text-center"
            colspan="3">
              Nome
            </th>
            <th class="text-center"
            colspan="4">
              Preço
            </th>
            <th class="text-center"
            colspan="8">
              Quantidade
            </th>
            <th
            class="text-center"
            colspan="10">
              Subtotal
            </th>
          </tr>
        </thead>

        <tbody>

          <tr
            v-for="item in Cart"
            :key="item.id"
          >
            <td
            colspan="2">
              <v-img
              max-width="50"
              :src="'http://localhost:8000/storage/produto/'+ item.image">
              </v-img>
            </td>

            <td
            colspan="3">{{ item.name }}</td>

            <td
            colspan="4">{{ item.price }}{{ item.moeda }}</td>
            
            <td
            colspan="8"
            >
              <v-btn
              v-if="item.qtdincart>0"
              depressed
              x-small
              color="red"
              outlined
              @click="item.qtdincart--"
              >   -
              </v-btn>
                {{ item.qtdincart }}
              <v-btn
              v-if="item.qtdincart<item.quantidade"
              depressed
              x-small
              outlined
              color="green"
              @click="item.qtdincart++"
              >   +
              </v-btn>
            </td>

            <td
            class="text-center"
            colspan="10">
              {{ item.price * item.qtdincart}}
            </td>
          </tr>
        </tbody>

        <tfoot>
          <tr>
            <td
            colspan="10"></td>
            <td
            class="text-center"
            colspan="11"
            > {{ total() }}</td>
          </tr>
          <tr>
            <td
            colspan="3">
              <v-btn
              color="success"
              >Voltar</v-btn>
            </td>
          </tr>
          
        </tfoot>
      </v-simple-table>
    </v-container> -->
  </v-sheet>
</template>


<script>
  export default {
    
    props:{
        Cart:null
    },

    data () {
      return {
        headers: [
          {
            text: '  ',
            align: 'start',
            value: 'image',
            sortable: false, 
          },
          { text: 'Name', value: 'name' },
          { text: 'Preço', value: 'price' },
          { text: 'Quantidade', 
            sortable: false,
            value: 'qtdincart' },
          { text: 'Estoque', 
            sortable: false,
            value: 'quantidade' },
        ],
      }
    }

    // methods:{
    //   // total () {
    //   //   var total = 0;
    //   //   for (let index = 0; index < this.Cart.length; index++) {
    //   //     total=+this.Cart[index].qtdincart * this.Cart[index].price;
    //   //   }
    //   //   return total;
    //   // }
    // }


  }
</script>