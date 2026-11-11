import { DataTypes } from "sequelize";

export default (sequelize) => {
  const HomeProcessSteps = sequelize.define(
    "homeProcessSteps",
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
      description: {
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
      tableName: "home_process_steps",
      timestamps: true,
      deletedAt: "deleted_at",
      paranoid: true,
    },
  );

  return HomeProcessSteps;
};
