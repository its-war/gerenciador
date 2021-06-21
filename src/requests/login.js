import { http } from './config';

export default {
    efetuarLogin(usuario, senha){
        return http.post('login/efetuarLogin', {usuario: usuario, senha: senha});
    }
}