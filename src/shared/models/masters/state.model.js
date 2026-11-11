import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const State = sequelize.define(
    'state',
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      slug: { type: DataTypes.STRING, allowNull: false, unique: true },
      sort_order: { type: DataTypes.INTEGER, defaultValue: 0 },
      status: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: 'states',
      timestamps: true,
      paranoid: true,
      deletedAt: 'deleted_at',
    },
  );

  State.associate = (models) => {
    State.hasMany(models.City, { foreignKey: 'state_id', as: 'cities' });
  };

  return State;
};
