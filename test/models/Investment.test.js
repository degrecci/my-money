const expect = require('chai').expect;
const { sequelize, Transaction, Investment, Broker, BalanceUpdate } = require('../../src/models');

describe('Investment', () => {
  describe('attributes', () => {
    it('should have a name', async () => {
      const investment = await Investment.create({ name: 'Foo' });
      expect(investment.get('name')).to.equal('Foo');
    });
  });

  describe('validations', () => {
    it('should validate name', () => {
      const investment = Investment.build();
      expect(investment.validate()).to.be.rejected;
    });
  });

  describe('relations', () => {
    it('shoul belongs to Broker', async () => {
      const investment = await Investment.create(
        {
          name: 'Foo',
          Broker: { name: 'Bar' },
        },
        { include: [Broker] },
      );

      expect(investment.get('Broker').get('name')).to.equal('Bar');
    })
    it('should have many Transactions', async () => {
      const investment = await Investment.create(
        {
          name: 'Foo',
          Transactions: [
            { amount: 1, date: '2018-04-10' },
            { amount: 2, date: '2018-04-11' },
          ]
        },
        { include: [Transaction] }
      );

      expect(investment.get('Transactions')).to.have.length(2);
    });

    it('should have many Balance Updates', async () => {
      const investment = await Investment.create(
        {
          name: 'Foo',
          BalanceUpdates: [
            { amount: 1, date: '2018-04-10' },
            { amount: 2, date: '2018-04-11' },
          ]
        },
        { include: [BalanceUpdate] }
      );

      expect(investment.get('BalanceUpdates')).to.have.length(2);
    });
  });
});