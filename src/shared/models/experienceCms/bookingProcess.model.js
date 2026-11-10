import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const BookingProcess = sequelize.define(
    'bookingProcess',
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING(255),
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
      tableName: 'booking_process',
      timestamps: true,
      paranoid: true,
      deletedAt: 'deleted_at',
    },
  );

  return BookingProcess;
};
