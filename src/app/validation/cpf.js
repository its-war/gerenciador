module.exports = {
    validarCpf(cpf){
        let dv1, dv2, n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, soma, resto;
        cpf = cpf.split('');
        for(let i = 0; i < cpf.length; i++){
            cpf[i] = Number.parseInt(cpf[i]);
        }
        n1 = cpf[0] * 10;
        n2 = cpf[1] * 9;
        n3 = cpf[2] * 8;
        n4 = cpf[3] * 7;
        n5 = cpf[4] * 6;
        n6 = cpf[5] * 5;
        n7 = cpf[6] * 4;
        n8 = cpf[7] * 3;
        n9 = cpf[8] * 2;
        soma = n1+n2+n3+n4+n5+n6+n7+n8+n9;
        resto = soma % 11;
        if(resto < 2){
            dv1 = 0;
        }else{
            dv1 = 11 - resto;
        }
        n10 = dv1;

        n1 = cpf[0] * 11;
        n2 = cpf[1] * 10;
        n3 = cpf[2] * 9;
        n4 = cpf[3] * 8;
        n5 = cpf[4] * 7;
        n6 = cpf[5] * 6;
        n7 = cpf[6] * 5;
        n8 = cpf[7] * 4;
        n9 = cpf[8] * 3;
        n10 = dv1 * 2;
        soma = n1+n2+n3+n4+n5+n6+n7+n8+n9+n10;
        resto = soma % 11;
        if(resto < 2){
            dv2 = 0;
        }else{
            dv2 = 11 - resto;
        }

        return cpf[9] === dv1 && cpf[10] === dv2;
    }
}