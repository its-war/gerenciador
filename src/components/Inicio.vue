<template>
  <div>
    <v-app-bar app>
      <v-toolbar-title>Gerenciador</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text :to="'/inicio/'">Home</v-btn>
        <v-btn text :to="'/inicio/cliente/cadastrar'">Cliente</v-btn>
        <v-btn text :to="'/inicio/produto/cadastrar'">Produto</v-btn>
        <v-btn text :to="'/inicio/venda/efetuarVenda'">Venda</v-btn>
        <v-btn text @click.prevent="sair()">Sair</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-container class="conteudo">
      <router-view></router-view>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Inicio",
  methods: {
    sair(){
      window.localStorage.setItem('token', null);
      this.$router.push({path: '/'});
    }
  }
}
</script>

<style scoped>
.conteudo {
  background-color: #FFFFFF;
  padding-top: 80px;
}
</style>