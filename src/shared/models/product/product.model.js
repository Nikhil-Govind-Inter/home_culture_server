import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Product = sequelize.define(
    "product",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: { type: DataTypes.STRING, allowNull: true },
      excerpt: { type: DataTypes.STRING, allowNull: true },
      slug: { type: DataTypes.STRING, allowNull: false, unique: true },
      header_title: { type: DataTypes.STRING, allowNull: true },
      description: { type: DataTypes.STRING, allowNull: true },
      media_path: { type: DataTypes.TEXT, allowNull: true },
      media_alt: { type: DataTypes.STRING, allowNull: true },
      icon_media_path: { type: DataTypes.TEXT, allowNull: true },
      button_text: { type: DataTypes.STRING, allowNull: true },
      sort_order: { type: DataTypes.INTEGER, defaultValue: 0 },
      status: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: "products",
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",
    },
  );

  Product.associate = (models) => {
    Product.belongsToMany(models.ProductStyle, {
      through: "product_style_map",
      foreignKey: "product_id",
      otherKey: "style_id",
      as: "styles",
    });
    Product.belongsToMany(models.ProductTrim, {
      through: "product_trim_map",
      foreignKey: "product_id",
      otherKey: "trim_id",
      as: "trims",
    });
    Product.belongsToMany(models.ProductSize, {
      through: "product_size_map",
      foreignKey: "product_id",
      otherKey: "size_id",
      as: "sizes",
    });
    Product.belongsToMany(models.ProductAddOn, {
      through: "product_add_ons_map",
      foreignKey: "product_id",
      otherKey: "add_ons_id",
      as: "add_ons",
    });
  };

  return Product;
};
