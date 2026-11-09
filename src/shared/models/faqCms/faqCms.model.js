import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const FaqCms = sequelize.define(
    'faqCms',
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      // Section One
      section_one_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      section_one_media_path: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      section_one_media_alt: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      section_one_header_title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      section_one_title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      section_one_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      // Sidebar
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      sidebar_title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sidebar_quotes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      // Section Two
      section_two_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      section_two_header_title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      section_two_title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      section_two_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      section_two_button_text: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      section_two_button_link: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: 'faq_cms',
      timestamps: true,
    },
  );

  return FaqCms;
};
