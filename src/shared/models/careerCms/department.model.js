import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Department = sequelize.define(
    "departments",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      slug: { type: DataTypes.STRING, allowNull: false, unique: true },
      sort_order: { type: DataTypes.INTEGER, defaultValue: 0 },
      status: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: "departments",
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",
    },
  );

  Department.associate = (models) => {
    Department.hasMany(models.Job, { foreignKey: "department_id", as: "jobs" });
  };

  return Department;
};
