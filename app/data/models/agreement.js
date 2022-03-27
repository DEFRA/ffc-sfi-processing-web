const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  const agreement = sequelize.define('agreement', {
    agreementId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    agreementNumber: DataTypes.STRING,
    sbi: DataTypes.INTEGER,
    agreementData: DataTypes.JSON,
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
    hasOpenTasks: {
      type: DataTypes.VIRTUAL,
      get () {
        return this.tasks.some(x => x.statusId === 1)
      }
    },
    hasPaymentRequests: {
      type: DataTypes.VIRTUAL,
      get () {
        return this.paymentRequests.length
      }
    }
  },
  {
    tableName: 'agreements',
    freezeTableName: true
  })
  agreement.associate = function (models) {
    agreement.hasMany(models.task, {
      foreignKey: 'agreementId',
      as: 'tasks'
    })
    agreement.hasMany(models.paymentRequest, {
      foreignKey: 'agreementId',
      as: 'paymentRequests'
    })
  }
  return agreement
}
