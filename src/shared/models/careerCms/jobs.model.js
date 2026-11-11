import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Job = sequelize.define(
    "job",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      city_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: { model: "city", key: "id" },
      },
      department_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: { model: "departments", key: "id" },
      },
      position: { type: DataTypes.STRING, allowNull: false },
      slug: { type: DataTypes.STRING, allowNull: false, unique: true },
      posted_at: { type: DataTypes.DATE, allowNull: true },
      sort_order: { type: DataTypes.INTEGER, defaultValue: 0 },
      status: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: "jobs",
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",
    },
  );

  Job.associate = (models) => {
    Job.belongsTo(models.City, {
      foreignKey: "city_id",
      as: "city",
    });
    Job.belongsTo(models.Department, {
      foreignKey: "department_id",
      as: "department",
    });
  };

  return Job;
};
