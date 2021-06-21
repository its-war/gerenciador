<template>
  <div>
    <h1>Efetuar Venda</h1>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-select v-model="selectCliente" :hint="`ID do Cliente: ${selectCliente.id_cliente}`" :items="clientes" item-text="nome" item-value="id_cliente" label="Selecione o Cliente" persistent-hint return-object single-line></v-select>

      <v-select v-model="selectProduto" :hint="`ID do Produto: ${selectProduto.id_produto}`" :items="produtos" item-text="nome" item-value="id_produto" label="Selecione o Produto" persistent-hint return-object single-line></v-select>

      <v-text-field v-model="selectProduto.quantidade" type="number" label="Quantidade"></v-text-field>

      <v-btn @click.prevent="adicionar()" color="primary">Adicionar</v-btn>

      <v-btn style="margin-left: 50px" v-show="produtosSelecionados.length > 0" :disabled="!valid" :loading="!valid" color="success" class="mr-4" @click.prevent="salvar()">Cadastrar</v-btn>
    </v-form>
    <v-alert dense outlined :type="tipo" style="margin-top: 15px" v-show="msg !== ''">
      {{this.msg}}
    </v-alert>
    <v-card v-show="produtosSelecionados.length > 0">
      <v-card-title>Produtos Selecionados</v-card-title>
      <v-data-table :headers="produtoHeaders" :items="produtosSelecionados"></v-data-table>
    </v-card>
  </div>
</template>

<script>
import ClienteManager from '../../requests/cliente'
import ProdutoManager from '../../requests/produto'
import VendaManager from '../../requests/venda'
export default {
  name: "CadastrarVenda",
  data(){
    return {
      valid: true,
      msg: "",
      tipo: "error",
      selectCliente: {nome: '', id_cliente: 0},
      selectProduto: {nome: '', id_produto: 0, quantidade: 0, valor: 0},
      clientes: [],
      produtos: [],
      produtosSelecionados: [],
      produtoHeaders: [
        {text: 'Id', align: 'start', value: 'id_produto'},
        {text: 'Nome', value: 'nome'},
        {text: 'Quantidade', value: 'quantidade'},
        {text: 'Valor por Unidade', value: 'valor'}
      ],
    }
  },
  methods: {
    adicionar(){
      ProdutoManager.listarPorId(this.selectProduto.id_produto).then(resposta => {
        this.selectProduto.valor = resposta.data[0].valor;
        this.produtosSelecionados.push(this.selectProduto);
      });
    },
    listar(){
      ClienteManager.listar().then(resposta => {
        this.clientes = resposta.data;
      });
      ProdutoManager.listar().then(resposta => {
        this.produtos = resposta.data;
      });
    },
    salvar(){
      this.valid = false;
      VendaManager.salvar(this.selectCliente.id_cliente, this.produtosSelecionados).then(resposta => {
        if(resposta.data === ""){
          this.produtosSelecionados = [];
          this.valid = true;
          this.tipo = 'success';
          this.msg = "Venda efetuada com sucesso.";
        }else{
          this.valid = true;
          this.tipo = 'error';
          this.msg = resposta.data;
        }
      });
    }
  },
  mounted() {
    this.listar();
  }
}
</script>

<style scoped>

</style>