import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const ProductAddOn = sequelize.define(
    'productAddOn',
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      media_path: { type: DataTypes.TEXT, allowNull: true },
      media_alt: { type: DataTypes.STRING, allowNull: true },
      slug: { type: DataTypes.STRING, allowNull: false, unique: true },
      subtitle: { type: DataTypes.STRING, allowNull: true },
      sort_order: { type: DataTypes.INTEGER, defaultValue: 0 },
      status: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: 'product_add_ons',
      timestamps: true,
      paranoid: true,
      deletedAt: 'deleted_at',
    },
  );

  ProductAddOn.associate = (models) => {
    ProductAddOn.belongsToMany(models.Product, {
      through: 'product_add_ons_map',
      foreignKey: 'add_ons_id',
      otherKey: 'product_id',
      as: 'products',
    });
  };

  return ProductAddOn;
};
