import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Admin = sequelize.define(
    "admin",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
    },
    {
      tableName: "admins",
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",
    },
  );

  return Admin;
};
