import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Faq = sequelize.define(
    "faq",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "faq_category",
          key: "id",
        },
      },
      question: { type: DataTypes.STRING, allowNull: false },
      answer: { type: DataTypes.TEXT, allowNull: false },
      sort_order: { type: DataTypes.INTEGER, defaultValue: 0 },
      status: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: "faqs",
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",
    },
  );

  Faq.associate = (models) => {
    Faq.belongsTo(models.FaqCategory, {
      foreignKey: "category_id",
      as: "category",
    });
  };
  
  return Faq;
};
