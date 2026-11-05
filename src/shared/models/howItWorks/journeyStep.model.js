import { DataTypes } from "sequelize";

export default (sequelize) => {
  const JourneyStep = sequelize.define(
    "journey_steps",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(255),
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
      tableName: "journey_steps",
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",
    },
  );

  return JourneyStep;
};
