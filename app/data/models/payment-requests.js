module.exports = (sequelize, DataTypes) => {
  const paymentRequest = sequelize.define('paymentRequest', {
    paymentRequestId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    agreementId: DataTypes.INTEGER,
    calculationData: DataTypes.JSON,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    submitted: DataTypes.DATE
  },
  {
    tableName: 'paymentRequests',
    freezeTableName: true
  })
  paymentRequest.associate = function (models) {
    paymentRequest.hasMany(models.agreement, {
      foreignKey: 'agreementId',
      as: 'agreements'
    })
  }
  return paymentRequest
}
