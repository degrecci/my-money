'use strict';
module.exports = (sequelize, DataTypes) => {
  var Transaction = sequelize.define(
    'Transaction',
    {
      amount: DataTypes.DECIMAL,
      date: DataTypes.DATEONLY
    },
    {}
  );
  Transaction.associate = function(models) {
    this.belongsTo(models.Investment);
  };
  return Transaction;
};
