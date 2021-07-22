const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  const paymentRequest = sequelize.define('paymentRequest', {
    paymentRequestId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    agreementId: DataTypes.INTEGER,
    calculationData: DataTypes.JSON,
    createdAt: {
      type: DataTypes.DATE,
      get () {
        return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY HH:mm:ss')
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      get () {
        return moment(this.getDataValue('updatedAt')).format('DD/MM/YYYY HH:mm:ss')
      }
    },
    submitted: {
      type: DataTypes.DATE,
      get () {
        return this.getDataValue('submitted') ? moment(this.getDataValue('submitted')).format('DD/MM/YYYY HH:mm:ss') : 'Pending'
      }
    }
  },
  {
    tableName: 'paymentRequests',
    freezeTableName: true
  })
  paymentRequest.associate = function (models) {
    paymentRequest.belongsTo(models.agreement, {
      foreignKey: 'agreementId',
      as: 'agreement'
    })
  }
  return paymentRequest
}
