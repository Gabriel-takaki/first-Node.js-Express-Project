const sinon = require ('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productsModels = require('../../../models/productsModel');


describe('(P.model01) testando model getAllProducts', () => {
 const responseExecute = [[
     {
         "id": 1,
         "name": "product1",
         "quantity": "10"
     },
     {
        "id": 2,
        "name": "product2",
        "quantity": "15"
     }
 ], [null]];
// esse é o array mockado esperado pela funçao execute, toda função execute retorna um array requisitado e outro com os metadados do mesmo.
    before(() => {
        sinon.stub(connection, 'execute').resolves(responseExecute);
        // a função stub roda a execute como um mock pra conseguir acontecer o it.
    })
    // o resolves ele espera a função execute e o parametro que ele recebe são dois arrays um da requisição e outro de metadados.
    after(() => {
        connection.execute.restore()
    }) 
    // o after retorna a função execute como estava antes.

   it('testa retorno da função', async () => {
    const response = await productsModels.getAllProducts();
// chama a função testada
    expect(response).to.be.an('array')
    // espera que a função seja um array 
    expect(response[0]).to.be.an('object')
    // espera que o primeiro iten seja um objeto 
   } )
} );