import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Location = sequelize.define(
    'location',
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      location_link: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sort_order: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: 'locations',
      timestamps: true,
      paranoid: true,
      deletedAt: 'deleted_at',
    },
  );

  return Location;
};
