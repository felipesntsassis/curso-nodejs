/**
 * 0. Obter usuário;
 * 1. Obter o número de telefone de um usuário a partir do seu ID;
 * 2. Obter endereço do usuário pelo ID.
 */

 function obterUsuario(callback) {
    setTimeout(function () {
        return callback(null, {
            id: 1,
            nome: 'Aladdin',
            dataNascimento: new Date()
        })
    }, 1000);
 }

 function obterTelefone(idUsuario, callback) {
    setTimeout(function () {
        return callback(null, {
            telefone: '3325-2525',
            ddd: 14
        })
    }, 2000);
 }

 function obterEndereco(idUsuario, callback) {
    setTimeout(function () {
        return callback(null, {
            rua: 'Rua dos Bobos',
            numero: 0
        });
    }, 2000);
 }

 function resolverUsuario(erro, usuario) {
    console.log('usuario', usuario);
 }

 obterUsuario(function resolverUsuario(erro, usuario) {
     // null || "" || 0 === false
     if (erro) {
         console.error('DEU RUIM em USUÁRIO');
         return;
     }

     obterTelefone(usuario.id, function resolverTelefone(erro1, telefone) {
        if (erro1) {
            console.error('DEU RUIM em TELEFONE', erro1);
            return;
        } 

        obterEndereco(usuario.id, function resolverEndereco(erro2, endereco) {
           if (erro2) {
               console.error('DEU RUIM em ENDEREÇO', erro2);
               return;
           } 
   
           console.log(`
               Nome: ${usuario.nome}
               Endereço: ${endereco.rua}, ${endereco.numero}
               Telefone: (${telefone.ddd})${telefone.telefone}
           `);
        });
     });
 });
//  const telefone = obterTelefone(usuario.id);

// console.log('usuario', usuario);
//  console.log('telefone', telefone);