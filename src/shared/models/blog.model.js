import { DataTypes } from "sequelize";

export default (sequelize) =>
  sequelize.define(
    "blog",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: { type: DataTypes.STRING, allowNull: false },
      slug: { type: DataTypes.STRING, allowNull: false, unique: true },
      excerpt: { type: DataTypes.STRING },
      content: { type: DataTypes.TEXT },
      image: { type: DataTypes.STRING },
      status: {
        type: DataTypes.ENUM("draft", "published"),
        defaultValue: "draft",
      },
    },
    {
      tableName: "blogs",
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",
    },
  );
