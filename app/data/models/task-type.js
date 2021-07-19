module.exports = (sequelize, DataTypes) => {
  const taskType = sequelize.define('taskType', {
    taskTypeId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING
  },
  {
    tableName: 'taskTypes',
    freezeTableName: true,
    timestamps: false
  })
  taskType.associate = function (models) {
    taskType.hasMany(models.task, {
      foreignKey: 'taskTypeId',
      as: 'tasks'
    })
  }
  return taskType
}
