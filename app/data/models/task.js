module.exports = (sequelize, DataTypes) => {
  const task = sequelize.define('task', {
    taskId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    taskTypeId: DataTypes.INTEGER,
    agreementId: DataTypes.INTEGER,
    correlationId: DataTypes.UUID,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    closedAt: DataTypes.DATE
  },
  {
    tableName: 'tasks',
    freezeTableName: true
  })
  task.associate = function (models) {
    task.hasOne(models.taskType, {
      foreignKey: 'taskTypeId',
      as: 'taskType'
    })
    task.hasOne(models.agreement, {
      foreignKey: 'agreementId',
      as: 'agreement'
    })
    task.hasOne(models.status, {
      foreignKey: 'statusId',
      as: 'status'
    })
  }
  return task
}
