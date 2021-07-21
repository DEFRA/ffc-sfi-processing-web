const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  const task = sequelize.define('task', {
    taskId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    taskTypeId: DataTypes.INTEGER,
    agreementId: DataTypes.INTEGER,
    correlationId: DataTypes.UUID,
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
    closedAt: {
      type: DataTypes.DATE,
      get () {
        return this.getDataValue('closedAt') ? moment(this.getDataValue('closedAt')).format('DD/MM/YYYY HH:mm:ss') : 'Open'
      }
    }
  },
  {
    tableName: 'tasks',
    freezeTableName: true
  })
  task.associate = function (models) {
    task.belongsTo(models.taskType, {
      foreignKey: 'taskTypeId',
      as: 'taskType'
    })
    task.belongsTo(models.agreement, {
      foreignKey: 'agreementId',
      as: 'agreement'
    })
    task.belongsTo(models.status, {
      foreignKey: 'statusId',
      as: 'status'
    })
  }
  return task
}
