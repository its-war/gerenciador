<template>
  <div>
    <v-card>
      <v-card-title>
        Itens da Venda Nº {{this.listaItens[0].id_venda}} — Nº do Cliente: {{this.listaItens[0].id_cliente}}
        <v-spacer></v-spacer>
        <v-text-field v-model="itensSearch" label="Pesquisar" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table :headers="itensHeaders" :items="listaItens" :search="itensSearch"></v-data-table>
      <v-card-subtitle>Total da Venda: {{this.listaItens[0].valor}}</v-card-subtitle>
    </v-card>
  </div>
</template>

<script>
import VendaManager from '../../requests/venda'
export default {
  name: "VendaDetalhes",
  data(){
    return {
      itensHeaders: [
        {text: 'Código do Produto', align: 'start', value: 'id_produto'},
        {text: 'Produto', value: 'nome_produto'},
        {text: 'Quantidade Comprada', value: 'quantidade'},
        {text: 'Valor do Produto', value: 'valor_produto'}
      ],
      itensSearch: "",
      listaItens: []
    }
  },
  methods: {
    carregar(){
      VendaManager.listarPorId(this.$route.params.id).then(resposta => {
        this.listaItens = resposta.data;
      });
    }
  },
  mounted() {
    this.carregar();
  }
}
</script>

<style scoped>

</style>