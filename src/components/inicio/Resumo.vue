<template>
  <div>
    <v-card>
      <v-card-title>
        Clientes
        <v-spacer></v-spacer>
        <v-text-field v-model="clienteSearch" label="Pesquisar" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table :headers="clienteHeaders" :items="clientes" :search="clienteSearch">
        <template v-slot:item.actions="{ item }">
          <v-btn text @click="editarCliente(item)"><i class="fas fa-pencil-alt"></i></v-btn>
        </template>
      </v-data-table>
    </v-card>
    <div class="espaco"></div>
    <v-card>
      <v-card-title>
        Produtos
        <v-spacer></v-spacer>
        <v-text-field v-model="produtoSearch" label="Pesquisar" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table :headers="produtoHeaders" :items="produtos" :search="produtoSearch">
        <template v-slot:item.actions="{ item }">
          <v-btn text @click="editarProduto(item)"><i class="fas fa-pencil-alt"></i></v-btn>
        </template>
      </v-data-table>
    </v-card>
    <div class="espaco"></div>
    <v-card>
      <v-card-title>
        Vendas
        <v-spacer></v-spacer>
        <v-text-field v-model="vendaSearch" label="Pesquisar" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table :headers="vendaHeaders" :items="vendas" :search="vendaSearch">
        <template v-slot:item.actions="{ item }">
          <v-btn text @click="vendaCall(item)">Ver mais</v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import ClienteManager from '../../requests/cliente'
import ProdutoManager from '../../requests/produto'
import VendaManager from '../../requests/venda'
export default {
  name: "Resumo",
  data(){
    return {
      clienteHeaders: [
        {text: 'Id', align: 'start', value: 'id_cliente'},
        {text: 'Nome', value: 'nome'},
        {text: 'CPF', value: 'cpf'},
        {text: 'Telefone', value: 'telefone'},
        {text: 'Ativo', value: 'ativo'},
        {text: '', value: 'actions', sortable: false }
      ],
      produtoHeaders: [
        {text: 'Id', align: 'start', value: 'id_produto'},
        {text: 'Nome', value: 'nome'},
        {text: 'Quantidade', value: 'quantidade'},
        {text: 'Valor', value: 'valor'},
        {text: '', value: 'actions', sortable: false }
      ],
      vendaHeaders: [
        {text: 'Número da Venda', align: 'start', value: 'id_venda'},
        {text: 'Nome', value: 'nome'},
        {text: 'Id do Cliente', value: 'id_cliente'},
        {text: 'CPF', value: 'cpf'},
        {text: 'Valor da Venda', value: 'valor'},
        {text: '', value: 'ativo_label'},
        {text: '', value: 'actions', sortable: false }
      ],
      clientes: [],
      produtos: [],
      vendas: [],
      clienteSearch: "",
      produtoSearch: "",
      vendaSearch: "",
      vendaDetalhes: Object
    }
  },
  methods: {
    listar(){
      ClienteManager.listar().then(resposta => {
        this.clientes = resposta.data;
      });
      ProdutoManager.listar().then(resposta => {
        this.produtos = resposta.data;
      });
      VendaManager.listar().then(resposta => {
        this.vendas = resposta.data;
      });
    },
    editarCliente(item){
      this.$router.push({name: 'alterarCliente', params: {cliente: item}});
    },
    editarProduto(item){
      this.$router.push({name: 'alterarProduto', params: {produto: item}});
    },
    vendaCall(item){
      this.$router.push({name: 'vendaDetalhes', params: {id: item.id_venda}});
    }
  },
  mounted() {
    this.listar();
  }
}
</script>

<style scoped>
.espaco {
  width: 100%;
  height: 50px;
}
</style>