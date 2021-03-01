<template>

    <v-layout row justify-center>
        <v-dialog v-model="active" 
        persistent 
        max-width="290" 
        light>
            <v-card>
                <v-card-title class="headline">Confirmação</v-card-title>
                <v-card-text>Você tem certeza de que deseja deletar "<b>{{OldProduto.name}}</b>" ?!</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="info"  @click.native="Sumir">Recusar</v-btn>
                    <v-btn color="warning"  @click.native="Aceito">Aceitar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>

</template>

<script>
export default {
    props:{
        active:false,
        OldProduto:null,
    },
    methods:{
        Sumir () {
            this.$emit('Closethis')
        },

        Aceito () {
            this.$emit('SendRequest', [this.OldProduto,'/delete'] );
            this.Sumir();
        }
    }
}
</script>

<style>

</style>