const sinon = require ('sinon');
const { expect } = require('chai');

const productsModels = require('../../../models/productsModel');
const service = require('../../../services/productService');

describe('P.service01', () => {
    const responseModule = [
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
    ];

    before(() => {
        sinon.stub(productsModels, 'getAllProducts').resolves(responseModule)
    })
    after(() => {
        productsModels.getAllProducts.restore();
    })

    it('testa o retorno de productService.getallProduct', async ()=> {
        const responseService = await service.getAllProducts();

        expect(responseService).to.be.an('array')
        expect(responseService[0]).to.be.an('object')
    })
})