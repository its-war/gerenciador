<template>
  <div>
    <h1>Alterar Cliente</h1>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="cliente.nome" :rules="nomeRules" label="Nome" required></v-text-field>

      <v-text-field v-model="cliente.cpf" label="CPF"></v-text-field>

      <v-text-field v-model="cliente.telefone" :rules="telefoneRules" label="Telefone" required></v-text-field>

      <v-checkbox v-model="checkbox" :label="Number.parseInt(cliente.ativo) === 1 ? 'Deseja desativar este cliente?' : 'Deseja ativar este cliente?'"></v-checkbox>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click.prevent="salvar(cliente)">Finalizar Alteração</v-btn>
    </v-form>
    <v-alert dense outlined type="error" style="margin-top: 15px" v-show="msg !== ''">
      {{this.msg}}
    </v-alert>
  </div>
</template>

<script>
import ClienteManager from '../../requests/cliente'

export default {
  name: "AlterarCliente",
  data(){
    return {
      //regras
      nomeRules: [
        v => !!v || 'Nome é obrigatório.'
      ],
      telefoneRules: [
        v => !!v || 'Telefone é obrigatório.'
      ],

      valid: true,
      checkbox: false,
      cliente: this.$route.params.cliente,
      msg: ""
    }
  },
  methods:{
    salvar(cliente){
      //this.valid = false;
      if(this.checkbox){
        if(cliente.ativo === 1){
          ClienteManager.desativar(cliente.id_cliente).then(resposta => {
            console.log(resposta.status);
            this.$router.replace({path: '/inicio'});
          });
        }else{
          ClienteManager.ativar(cliente.id_cliente).then(resposta => {
            console.log(resposta.status);
            this.$router.replace({path: '/inicio'});
          });
        }
      }else{
        ClienteManager.alterar(cliente.id_cliente, cliente.nome, cliente.telefone).then(resposta => {
          if(resposta.data === ""){
            this.$router.replace({path: '/inicio'});
          }else{
            this.msg = resposta.data;
          }
        });
      }
    }
  }
}
</script>

<style scoped>

</style>