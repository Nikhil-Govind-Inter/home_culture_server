import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const City = sequelize.define(
    'city',
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      state_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: { model: 'states', key: 'id' },
      },
      name: { type: DataTypes.STRING, allowNull: false },
      slug: { type: DataTypes.STRING, allowNull: false, unique: true },
      sort_order: { type: DataTypes.INTEGER, defaultValue: 0 },
      status: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: 'city',
      timestamps: true,
      paranoid: true,
      deletedAt: 'deleted_at',
    },
  );

  City.associate = (models) => {
    City.belongsTo(models.State, { foreignKey: 'state_id', as: 'state' });
    City.hasMany(models.Job, { foreignKey: 'city_id', as: 'jobs' });
  };

  return City;
};
