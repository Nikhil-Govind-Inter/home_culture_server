import { DataTypes } from 'sequelize';

const STRING = () => ({ type: DataTypes.STRING });
const TEXT = () => ({ type: DataTypes.TEXT });

export default (sequelize) => {
  const ProductCms = sequelize.define(
    'productCms',
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      // Product section
      product_section_title: STRING(),
      product_section_description: TEXT(),

      // Style section
      style_section_title: STRING(),
      style_section_description: TEXT(),

      // Trim section
      trim_section_title: STRING(),
      trim_section_description: TEXT(),

      // Size section
      size_section_title: STRING(),
      size_section_description: TEXT(),

      // Add-ons section
      add_ons_section_title: STRING(),
      add_ons_section_description: TEXT(),

      // Summary section
      summary_section_title: STRING(),
      summary_section_description: TEXT(),
      summary_section_media_path: TEXT(),
      summary_section_media_alt: STRING(),
      summary_section_media_header_title: STRING(),
      summary_section_media_title: STRING(),

      // CTA section
      cta_section_status: { type: DataTypes.BOOLEAN, defaultValue: true },
      cta_section_desktop_media_path: TEXT(),
      cta_section_mobile_media_path: TEXT(),
      cta_section_media_alt: STRING(),
      cta_section_header_title: STRING(),
      cta_section_title: STRING(),
      cta_section_description: TEXT(),
      cta_section_button_text: STRING(),
      cta_section_button_link: TEXT(),
    },
    {
      tableName: 'product_cms',
      timestamps: true,
    },
  );

  return ProductCms;
};
