import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const ExperienceTimeline = sequelize.define(
    'experienceTimeline',
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
      media_alt: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      subtitle: {
        type: DataTypes.STRING(255),
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
      tableName: 'experience_timeline',
      timestamps: true,
      paranoid: true,
      deletedAt: 'deleted_at',
    },
  );

  return ExperienceTimeline;
};
