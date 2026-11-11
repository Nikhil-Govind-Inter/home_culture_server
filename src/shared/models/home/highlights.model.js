import { DataTypes } from "sequelize";

export default (sequelize) => {
  const HomeHighlights = sequelize.define(
    "homeHighlights",
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
      media_path: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      media_alt: {
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
      tableName: "home_highlights",
      timestamps: true,
      deletedAt: "deleted_at",
      paranoid: true,
    },
  );

  return HomeHighlights;
};
