import { DataTypes } from "sequelize";

export default (sequelize) => {
  const HomeBrokenProcess = sequelize.define(
    "homeBrokenProcess",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      media_type: {
        type: DataTypes.ENUM("image", "video"),
      },
      media_path: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      media_alt: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      thumbnail: {
        type: DataTypes.TEXT,
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
      tableName: "home_broken_process",
      timestamps: true,
      deletedAt: "deleted_at",
      paranoid: true,
    },
  );

  return HomeBrokenProcess;
};
