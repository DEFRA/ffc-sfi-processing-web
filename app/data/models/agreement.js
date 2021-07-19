module.exports = (sequelize, DataTypes) => {
  const agreement = sequelize.define('agreement', {
    agreementId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    agreementNumber: DataTypes.STRING,
    sbi: DataTypes.INTEGER,
    agreementData: DataTypes.JSON,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
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
