import { DataTypes } from "sequelize";

export default (sequelize) =>
  sequelize.define(
    "social_media",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      link: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      icon_media_path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      media_alt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sort_order: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    },
    {
      tableName: "social_media",
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",
    },
  );
