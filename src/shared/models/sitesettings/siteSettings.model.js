import { DataTypes } from "sequelize";

export default (sequelize) =>
  sequelize.define(
    "siteSettings",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      header_logo: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      footer_logo: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      logo_alt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      footer_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      footer_description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "site_settings",
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",
    },
  );
