import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const ExperienceFeature = sequelize.define(
    'experienceFeature',
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
        type: DataTypes.STRING(100),
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
      tableName: 'experience_features',
      timestamps: true,
      paranoid: true,
      deletedAt: 'deleted_at',
    },
  );

  return ExperienceFeature;
};
