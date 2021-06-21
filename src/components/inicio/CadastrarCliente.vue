<template>
  <div>
    <h1>Cadastro de Cliente</h1>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="cliente.nome" :rules="nomeRules" label="Nome" required></v-text-field>

      <v-text-field v-model="cliente.cpf" label="CPF"></v-text-field>

      <v-text-field v-model="cliente.telefone" :rules="telefoneRules" label="Telefone" required></v-text-field>

      <v-btn :disabled="!valid" :loading="!valid" color="success" class="mr-4" @click.prevent="salvar(cliente)">Cadastrar</v-btn>
    </v-form>
    <v-alert dense outlined :type="tipo" style="margin-top: 15px" v-show="msg !== ''">
      {{this.msg}}
    </v-alert>
  </div>
</template>

<script>
import ClienteManager from '../../requests/cliente'
export default {
  name: "CadastrarCliente",
  data(){
    return {
      //regras
      nomeRules: [
        v => !!v || 'Nome é obrigatório.'
      ],
      telefoneRules: [
        v => !!v || 'Telefone é obrigatório.'
      ],
      cpfRules: [
        v => !!v || 'CPF é obrigatório.'
      ],

      valid: true,
      cliente: {
        nome: "",
        cpf: "",
        telefone: ""
      },
      msg: "",
      tipo: "error"
    }
  },
  methods: {
    salvar(cliente){
      this.valid = false;
      this.msg = "";
      ClienteManager.salvar(cliente.nome, cliente.cpf, cliente.telefone).then(resposta => {
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