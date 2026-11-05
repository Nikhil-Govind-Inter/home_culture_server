import { DataTypes } from "sequelize";

export default (sequelize) => {
  const AboutHighlight = sequelize.define(
    "aboutHighlight",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      icon_media_path: { type: DataTypes.TEXT, allowNull: false },
      sort_order: { type: DataTypes.INTEGER, defaultValue: 0 },
      status: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: "about_highlights",
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",
    },
  );

  return AboutHighlight;
};
