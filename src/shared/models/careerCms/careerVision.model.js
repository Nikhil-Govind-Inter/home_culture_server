import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const CareerVision = sequelize.define(
    'careerVision',
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
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
      tableName: 'career_vision',
      timestamps: true,
      paranoid: true,
      deletedAt: 'deleted_at',
    },
  );

  return CareerVision;
};
