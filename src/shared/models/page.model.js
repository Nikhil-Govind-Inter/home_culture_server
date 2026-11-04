import { DataTypes } from 'sequelize';

export default (sequelize) =>
  sequelize.define(
    'page',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      title: { type: DataTypes.STRING, allowNull: false },
      slug: { type: DataTypes.STRING, allowNull: false, unique: true },
      content: { type: DataTypes.TEXT },
      metaTitle: { type: DataTypes.STRING },
      metaDescription: { type: DataTypes.STRING },
      status: { type: DataTypes.ENUM('draft', 'published'), defaultValue: 'draft' },
    },
    {
      tableName: 'pages',
      timestamps: true,
      paranoid: true,
      deletedAt: 'deleted_at',
    },
  );
