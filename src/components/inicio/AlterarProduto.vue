<template>
  <div>
    <h1>Alterar Produto</h1>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="produto.nome" :rules="nomeRules" label="Nome" required></v-text-field>

      <v-text-field type="number" v-model="produto.quantidade" :rules="quantidadeRules" label="Quantidade" required></v-text-field>

      <v-text-field type="number" v-model="produto.valor" :rules="valorRules" label="Valor"></v-text-field>

      <v-checkbox v-model="checkbox" :label="Number.parseInt(produto.ativo) === 1 ? 'Deseja desativar este cliente?' : 'Deseja ativar este cliente?'"></v-checkbox>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click.prevent="salvar()">Finalizar Alteração</v-btn>
    </v-form>
    <v-alert dense outlined type="error" style="margin-top: 15px" v-show="msg !== ''">
      {{this.msg}}
    </v-alert>
  </div>
</template>

<script>
import ProdutoManager from '../../requests/produto'
export default {
  name: "AlterarProduto",
  data(){
    return {
      //regras
      nomeRules: [
        v => !!v || 'Nome é obrigatório.'
      ],
      quantidadeRules: [
        v => !!v || 'Quantidade é obrigatório.'
      ],
      valorRules: [
        v => !!v || 'Valor é obrigatório.'
      ],

      valid: true,
      checkbox: false,
      produto: this.$route.params.produto,
      msg: ""
    }
  },
  methods: {
    salvar() {
      ProdutoManager.alterar(this.produto.id_produto, this.produto.nome, this.produto.quantidade, this.produto.valor).then(resposta => {
        if (resposta.data === '') {
          this.$router.replace({path: '/inicio'});
        } else {
          this.msg = resposta.data;
        }
      });
    }
  }
}
</script>

<style scoped>

</style>