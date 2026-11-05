import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Banner = sequelize.define(
    "banner",
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

      header_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      banner_desktop_media_path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      banner_mobile_media_path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      banner_media_alt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "banners",
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",
    },
  );

  return Banner;
};
