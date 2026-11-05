import { DataTypes } from "sequelize";

export default (sequelize) => {
  const WorkshopMaterial = sequelize.define(
    "workshop_materials",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      media_path: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      title: {
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
      tableName: "workshop_materials",
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",
    },
  );

  return WorkshopMaterial;
};
