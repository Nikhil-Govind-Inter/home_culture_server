import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const JourneyProcess = sequelize.define(
    'journeyProcess',
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
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
      tableName: 'journey_process',
      timestamps: true,
      paranoid: true,
      deletedAt: 'deleted_at',
    },
  );

  return JourneyProcess;
};