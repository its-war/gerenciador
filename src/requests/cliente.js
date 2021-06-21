import { http } from './config'

export default {
    listar: () => {
        let token = window.localStorage.getItem('token');
        return http.get('cliente/listar', {headers: {"x-access-token": token}});
    },
    listarPorId: (id) => {
        let token = window.localStorage.getItem('token');
        return http.get('cliente/listar/' + id, {headers: {"x-access-token": token}});
    },
    salvar: (nome, cpf, telefone) => {
        let token = window.localStorage.getItem('token');
        return http.post('cliente/salvar', {nome: nome, cpf: cpf, telefone: telefone}, {headers: {"x-access-token": token}});
    },
    alterar: (id, nome, telefone) => {
        let token = window.localStorage.getItem('token');
        return http.put('cliente/alterar', {id: id, nome: nome, telefone: telefone}, {headers: {"x-access-token": token}});
    },
    ativar: (id) => {
        let token = window.localStorage.getItem('token');
        return http.put('cliente/ativar', {id: id}, {headers: {"x-access-token": token}});
    },
    desativar: (id) => {
        let token = window.localStorage.getItem('token');
        return http.put('cliente/desativar', {id: id}, {headers: {"x-access-token": token}});
    }
}