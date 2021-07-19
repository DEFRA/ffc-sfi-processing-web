module.exports = (sequelize, DataTypes) => {
  const status = sequelize.define('status', {
    statusId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    status: DataTypes.STRING
  },
  {
    tableName: 'status',
    freezeTableName: true,
    timestamps: false
  })
  status.associate = function (models) {
    status.hasMany(models.task, {
      foreignKey: 'statusId',
      as: 'tasks'
    })
  }
  return status
}
