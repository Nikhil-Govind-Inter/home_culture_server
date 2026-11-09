import { DataTypes } from "sequelize";

export default (sequelize) => {
  const FaqCategory = sequelize.define(
    "faqCategory",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: { type: DataTypes.STRING, allowNull: false },
      slug: { type: DataTypes.STRING, allowNull: false, unique: true },
      sort_order: { type: DataTypes.INTEGER, defaultValue: 0 },
      status: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: "faq_category",
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",
    },
  );

  FaqCategory.associate = (models) => {
    FaqCategory.hasMany(models.Faq, {
      foreignKey: "category_id",
      as: "faqs",
    });
  };

  return FaqCategory;
};
