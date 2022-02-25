const sinon = require ('sinon');
const { expect } = require('chai');

const service = require('../../../services/salesService');
const controllers = require('../../../controllers/salesController');

const error = Error({message: 'erro interno do servidor'});

describe('P.controller01', () => {

    let req = {}
    let res = {}
    let next = () => {}

    describe('caso de certo', () => {
        const responseService = [
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
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
            sinon.stub(service, 'getAllSales').resolves(responseService);
        })

        
        after(() => {
            service.getAllSales.restore();
        })

        it('Chama o res.status.json com o valor de responseServieProduct.code', async () => {
            await controllers.getAllSales(req, res);

            expect(res.status.calledWith(200)).to.be.equal(true);
        })
    })
});