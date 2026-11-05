import { DataTypes } from "sequelize";

export default (sequelize) =>
  sequelize.define(
    "metaData",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      page: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      page_slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      meta_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      meta_description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
        meta_keywords: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "meta_data",
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",
    },
  );
