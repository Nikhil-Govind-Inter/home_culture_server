import { DataTypes } from "sequelize";

export default (sequelize) => {
  const HomeBanner = sequelize.define(
    "homeBanner",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      header_title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      media_type: {
        type: DataTypes.ENUM("image", "video"),
      },
      desktop_media_path: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      mobile_media_path: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      thumbnail:{
        type: DataTypes.TEXT,
        allowNull: true,
      },
      media_alt: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      button_one_text: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      button_one_link: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      button_two_text: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      button_two_link: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      sort_order: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "home_banner",
      timestamps: true,
      deletedAt: "deleted_at",
      paranoid: true,
    },
  );

  return HomeBanner;
};
