import Vue from 'vue';
import Router from 'vue-router';
import { http } from '@/requests/config'
import Login from "@/components/Login";
import Inicio from "@/components/Inicio";
import Resumo from "@/components/inicio/Resumo";
import AlterarCliente from "@/components/inicio/AlterarCliente";
import CadastrarCliente from "@/components/inicio/CadastrarCliente";
import AlterarProduto from "@/components/inicio/AlterarProduto";
import CadastrarProduto from "@/components/inicio/CadastrarProduto";
import VendaDetalhes from "@/components/inicio/VendaDetalhes";
import CadastrarVenda from "@/components/inicio/CadastrarVenda";

Vue.use(Router);

const routes = [
    {
        path: '/',
        component: Login,
        name: 'login'
    },
    {
        path: '/inicio',
        component: Inicio,
        children: [
            {
                path: '',
                component: Resumo,
                name: 'inicio'
            },
            {
                path: 'cliente/cadastrar',
                component: CadastrarCliente,
                name: 'cadastrarCliente'
            },
            {
                path: '/cliente/alterar/:cliente',
                component: AlterarCliente,
                name: 'alterarCliente'
            },
            {
                path: 'produto/cadastrar',
                component: CadastrarProduto,
                name: 'cadastrarProduto'
            },
            {
                path: '/produto/alterar/:produto',
                component: AlterarProduto,
                name: 'alterarProduto'
            },
            {
                path: '/venda/detalhes/:id',
                component: VendaDetalhes,
                name: 'vendaDetalhes'
            },
            {
                path: 'venda/efetuarVenda',
                component: CadastrarVenda,
                name: 'efetuarVenda'
            }
        ]
    }
]

const router = new Router({routes});
router.beforeEach((to, from, next) => {
    let token = window.localStorage.getItem('token');
    http.get('/login/verificarLogin', {headers: {"x-access-token": token}}).then(value => {
        if(to.name !== 'login' && value.data.auth){
            next();
        }else if(to.name !== 'login' && !value.data.auth){
            next({name: 'login'});
        }else if(to.name === 'login' && value.data.auth){
            next({name: 'inicio'});
        }else{
            next();
        }
    });
});

export default router;