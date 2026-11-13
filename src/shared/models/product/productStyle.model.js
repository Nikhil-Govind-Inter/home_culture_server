import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const ProductStyle = sequelize.define(
    'productStyle',
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      media_path: { type: DataTypes.TEXT, allowNull: true },
      media_alt: { type: DataTypes.STRING, allowNull: true },
      slug: { type: DataTypes.STRING, allowNull: false, unique: true },
      title: { type: DataTypes.STRING, allowNull: true },
      description: { type: DataTypes.STRING, allowNull: true },
      button_text: { type: DataTypes.STRING, allowNull: true },
      sort_order: { type: DataTypes.INTEGER, defaultValue: 0 },
      status: { type: DataTypes.BOOLEAN, defaultValue: true },
      show_in_home: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: 'product_style',
      timestamps: true,
      paranoid: true,
      deletedAt: 'deleted_at',
    },
  );

  ProductStyle.associate = (models) => {
    ProductStyle.belongsToMany(models.Product, {
      through: 'product_style_map',
      foreignKey: 'style_id',
      otherKey: 'product_id',
      as: 'products',
    });
  };

  return ProductStyle;
};
