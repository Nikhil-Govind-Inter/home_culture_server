import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const ProductSize = sequelize.define(
    'productSize',
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      media_path: { type: DataTypes.TEXT, allowNull: true },
      slug: { type: DataTypes.STRING, allowNull: false, unique: true },
      size: { type: DataTypes.BIGINT, allowNull: true },
      title: { type: DataTypes.STRING, allowNull: true },
      sort_order: { type: DataTypes.INTEGER, defaultValue: 0 },
      status: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: 'product_size',
      timestamps: true,
      paranoid: true,
      deletedAt: 'deleted_at',
    },
  );

  ProductSize.associate = (models) => {
    ProductSize.belongsToMany(models.Product, {
      through: 'product_size_map',
      foreignKey: 'size_id',
      otherKey: 'product_id',
      as: 'products',
    });
  };

  return ProductSize;
};
