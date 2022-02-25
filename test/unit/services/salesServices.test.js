const sinon = require ('sinon');
const { expect } = require('chai');

const salesModel = require('../../../models/salesModel');
const service = require('../../../services/salesService');

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
        sinon.stub(salesModel, 'getAllSales').resolves(responseModule)
    })
    after(() => {
        salesModel.getAllSales.restore();
    })

    it('testa o retorno de productService.getallProduct', async ()=> {
        const responseService = await service.getAllSales();

        expect(responseService).to.be.an('array')
        expect(responseService[0]).to.be.an('object')
    })
})