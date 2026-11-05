import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const ContactCms = sequelize.define(
    'contactCms',
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      // Form Section
      form_section_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      form_section_title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      form_section_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      google_map_link: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      // Form
      form_title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      form_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      // Faq Section
      faq_section_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      faq_section_title: {
      type: DataTypes.STRING,
        allowNull: true,
      },
      faq_section_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      faq_section_button_text: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      faq_section_button_link: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: 'contact_cms',
      timestamps: true,
    },
  );

  return ContactCms;
};
