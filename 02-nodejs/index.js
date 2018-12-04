/**
 * 0. Obter usuário;
 * 1. Obter o número de telefone de um usuário a partir do seu ID;
 * 2. Obter endereço do usuário pelo ID.
 */
// importamos o módulo interno do NodeJS
const util = require('util');
const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario() {
    // quando der algum problema -> reject (ERRO)
    // quando sucesso -> resolve()
    return new Promise(function resolverPromise(resolve, reject) {
        setTimeout(function () {
            // return reject(new Error('DEU RUIM de Verdade!'));
            return resolve({
                id: 1,
                nome: 'Aladdin',
                dataNascimento: new Date()
            })
        }, 1000)
    });
}

function obterTelefone(idUsuario) {
    return new Promise(function resolverPromise(resolve, reject) {
        setTimeout(function () {
            return resolve({
                telefone: '3325-2525',
                ddd: 14
            })
        }, 2000);
    })
}

function obterEndereco(idUsuario, callback) {
    setTimeout(function () {
        return callback(null, {
            rua: 'Rua dos Bobos',
            numero: 0
        });
    }, 2000);
}

const usuarioPromise = obterUsuario();
// para manipular sucesso -> .then
// para manipular erros -> .catch
// usuario -> telefone -> telefone
usuarioPromise
    .then((usuario) => {
        return obterTelefone(usuario.id)
        .then(function resolverTelefone(result) {
            return {
                usuario: {
                    nome: usuario.nome,
                    id: usuario.id
                },
                telefone: result
            };
        });
    })
    .then(function (resultado) {
        const endereco = obterEnderecoAsync(resultado.usuario.id);
        return endereco.then(function resolverEndereco(result) {
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result
            }
        });
    })
    .then((resultado) => {
        console.log(`
            Nome: ${resultado.usuario.nome}
            Endereço: ${resultado.endereco.rua}, ${resultado.endereco.numero}
            Telefone: (${resultado.telefone.ddd})${resultado.telefone.telefone}
        `);
    }).catch((error) => {
        console.error('DEU RUIM', error);
    });
//  obterUsuario(function resolverUsuario(erro, usuario) {
//      // null || "" || 0 === false
//      if (erro) {
//          console.error('DEU RUIM em USUÁRIO');
//          return;
//      }

//      obterTelefone(usuario.id, function resolverTelefone(erro1, telefone) {
//         if (erro1) {
//             console.error('DEU RUIM em TELEFONE', erro1);
//             return;
//         } 

//         obterEndereco(usuario.id, function resolverEndereco(erro2, endereco) {
//            if (erro2) {
//                console.error('DEU RUIM em ENDEREÇO', erro2);
//                return;
//            } 
   
//            console.log(`
//                Nome: ${usuario.nome}
//                Endereço: ${endereco.rua}, ${endereco.numero}
//                Telefone: (${telefone.ddd})${telefone.telefone}
//            `);
//         });
//      });
//  });