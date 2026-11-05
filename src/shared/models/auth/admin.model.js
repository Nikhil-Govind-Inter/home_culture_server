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
      reset_otp_hash: { type: DataTypes.STRING, allowNull: true },
      reset_otp_expires_at: { type: DataTypes.DATE, allowNull: true },
      reset_otp_attempts: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
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
