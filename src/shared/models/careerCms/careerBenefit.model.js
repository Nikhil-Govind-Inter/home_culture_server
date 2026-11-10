import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const CareerBenefit = sequelize.define(
    'careerBenefit',
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      media_path: {
        type: DataTypes.TEXT,
        allowNull: true,
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
      tableName: 'career_benefits',
      timestamps: true,
      paranoid: true,
      deletedAt: 'deleted_at',
    },
  );

  return CareerBenefit;
};
