import { http } from './config'

export default {
    listar: () => {
        let token = window.localStorage.getItem('token');
        return http.get('venda/listar', {headers: {"x-access-token": token}});
    },
    listarPorId: (id) => {
        let token = window.localStorage.getItem('token');
        return http.get('venda/listar/' + id, {headers: {"x-access-token": token}});
    },
    salvar: (idCliente, listaItens) => {
        let token = window.localStorage.getItem('token');
        return http.post('venda/efetuarVenda', {id_cliente: idCliente, itens: listaItens}, {headers: {"x-access-token": token}});
    }
}