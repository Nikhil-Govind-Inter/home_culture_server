import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const ProductTrim = sequelize.define(
    'productTrim',
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      media_path: { type: DataTypes.TEXT, allowNull: true },
      slug: { type: DataTypes.STRING, allowNull: false, unique: true },
      title: { type: DataTypes.STRING, allowNull: true },
      description: { type: DataTypes.STRING, allowNull: true },
      sort_order: { type: DataTypes.INTEGER, defaultValue: 0 },
      status: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: 'product_trim',
      timestamps: true,
      paranoid: true,
      deletedAt: 'deleted_at',
    },
  );

  ProductTrim.associate = (models) => {
    ProductTrim.belongsToMany(models.Product, {
      through: 'product_trim_map',
      foreignKey: 'trim_id',
      otherKey: 'product_id',
      as: 'products',
    });
  };

  return ProductTrim;
};
