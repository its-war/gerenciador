<template>
  <div>
    <h1>Cadastro de Produto</h1>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="produto.nome" :rules="nomeRules" label="Nome" required></v-text-field>

      <v-text-field v-model="produto.quantidade" :rules="quantidadeRules" label="Quantidade" required></v-text-field>

      <v-text-field v-model="produto.valor" :rules="valorRules" label="Valor" required></v-text-field>

      <v-btn :disabled="!valid" :loading="!valid" color="success" class="mr-4" @click.prevent="salvar(produto)">Cadastrar</v-btn>
    </v-form>
    <v-alert dense outlined :type="tipo" style="margin-top: 15px" v-show="msg !== ''">
      {{this.msg}}
    </v-alert>
  </div>
</template>

<script>
import ProdutoManager from '../../requests/produto'
export default {
  name: "CadastrarProduto",
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
      produto: {
        nome: "",
        quantidade: "",
        valor: ""
      },
      msg: "",
      tipo: "error"
    }
  },
  methods: {
    salvar(produto){
      this.valid = false;
      this.msg = "";
      let valor = Number.parseFloat(this.produto.valor.toString());
      ProdutoManager.salvar(produto.nome, produto.quantidade, valor).then(resposta => {
        if(resposta.data !== ""){
          this.tipo = "error";
          this.msg = resposta.data;
          this.valid = true;
        }else{
          this.$refs.form.reset();
          this.valid = true;
          this.tipo = "success";
          this.msg = "Cadastrado com sucesso";
        }
      });
    }
  }
}
</script>

<style scoped>

</style>