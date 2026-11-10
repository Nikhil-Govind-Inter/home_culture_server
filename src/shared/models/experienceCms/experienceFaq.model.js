import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const ExperienceFaq = sequelize.define(
    'experienceFaq',
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      question: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      answer: {
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
      tableName: 'experience_faqs',
      timestamps: true,
      paranoid: true,
      deletedAt: 'deleted_at',
    },
  );

  return ExperienceFaq;
};
