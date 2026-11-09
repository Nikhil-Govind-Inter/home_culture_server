import { DataTypes } from "sequelize";

export default (sequelize) => {
  const PrivacyPolicy = sequelize.define(
    "privacyPolicy",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      // Content Section
      content_section_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      content_section_side_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      // CTA Section
      cta_section_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      cta_section_desktop_media_path: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      cta_section_mobile_media_path: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      cta_section_media_alt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cta_section_header_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cta_section_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cta_section_description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      cta_section_button_text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cta_section_button_link: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "privacy_policy",
      timestamps: true,
    },
  );

  return PrivacyPolicy;
};
