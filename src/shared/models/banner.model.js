import { DataTypes } from 'sequelize';

export default (sequelize) =>
  sequelize.define(
    'banner',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      title: { type: DataTypes.STRING, allowNull: false },
      subtitle: { type: DataTypes.STRING },
      image: { type: DataTypes.STRING },
      link: { type: DataTypes.STRING },
      sortOrder: { type: DataTypes.INTEGER, defaultValue: 0 },
      status: { type: DataTypes.ENUM('draft', 'published'), defaultValue: 'draft' },
    },
    {
      tableName: 'banners',
      timestamps: true,
      paranoid: true,
      deletedAt: 'deleted_at',
    },
  );
