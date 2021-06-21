<template>
  <v-container>
    <v-row>
      <v-col></v-col>
      <v-col class="login">
        <h1>Faça Login</h1>
        <v-form ref="form" v-model="valid" lazy-validation>

          <v-text-field outlined v-model="usuario" label="Nome de Usuário" required></v-text-field>

          <v-text-field outlined v-model="senha" :rules="senhaRules" :type="'password'" @click:append="show1 = !show1" label="Senha" required></v-text-field>

          <v-checkbox color="accent" v-model="checkbox" label="Lembrar meus dados."></v-checkbox>

          <v-btn block @click.prevent="fazerLogin()" :disabled="!valid" color="success" class="mr-4">Entrar</v-btn>
        </v-form>
        <p>
          <router-link to="/esqueceuSenha">Esqueceu sua senha?</router-link>
        </p>
      </v-col>
      <v-col></v-col>
    </v-row>
  </v-container>
</template>

<script>
import LoginManager from '../requests/login';
export default {
  name: "Login",

  data: () => ({
    valid: true,
    show1: false,
    senha: '',
    usuario: '',
    senhaRules: [
      v => !!v || 'Senha é obrigatória',
      v => (v && v.length >= 8) || 'Senha precisa ter no mínimo 8 caracteres',
    ],
    checkbox: false
  }),
  methods: {
    fazerLogin(){
      LoginManager.efetuarLogin(this.usuario, this.senha).then(value => {
        if(value.data.auth){
          window.localStorage.setItem('token', value.data.token);
          this.$router.replace('/inicio');
        }else{
          window.localStorage.setItem('token' , null);
        }
      });
    }
  }
}
</script>
<style>
.login {
  margin-top: 100px;
  padding: 20px;
  background-color: #FFFFFF;
  min-width: 300px;
  max-width: 500px;
  border-radius: 10px;
  box-shadow: 0 0 20px #000000;
}
.login form {
  margin: 20px auto;
  max-width: 400px;
}
.login h1 {
  text-align: center;
  margin-top: 25px;
}
p {
  text-align: center;
}
#app {
  background-color: #82B1FF;
}
</style>