import { http } from './config'

export default {
    listar: () => {
        let token = window.localStorage.getItem('token');
        return http.get('produto/listar', {headers: {"x-access-token": token}});
    },
    listarPorId: (id) => {
        let token = window.localStorage.getItem('token');
        return http.get('produto/listar/' + id, {headers: {"x-access-token": token}});
    },
    salvar: (nome, quantidade, valor) => {
        let token = window.localStorage.getItem('token');
        return http.post('produto/salvar', {nome: nome, quantidade: quantidade, valor: valor}, {headers: {"x-access-token": token}});
    },
    alterar: (id, nome, quantidade, valor) => {
        let token = window.localStorage.getItem('token');
        return http.put('produto/alterar', {id: id, nome: nome, quantidade: quantidade, valor: valor}, {headers: {"x-access-token": token}});
    }
}