import { DataTypes } from 'sequelize';

const BOOLEAN = () => ({ type: DataTypes.BOOLEAN, defaultValue: true });
const STRING = () => ({ type: DataTypes.STRING });
const TEXT = () => ({ type: DataTypes.TEXT });

export default (sequelize) => {
  const BlogCms = sequelize.define(
    'blogCms',
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      // Detail page section
      detail_page_status: BOOLEAN(),
      detail_page_header_title: STRING(),
      detail_page_title: STRING(),
      detail_page_button_text: STRING(),
      detail_page_button_link: STRING(),

      // CTA section
      cta_status: BOOLEAN(),
      cta_desktop_media_path: TEXT(),
      cta_mobile_media_path: TEXT(),
      cta_media_alt: STRING(),
      cta_header_title: STRING(),
      cta_title: STRING(),
      cta_description: TEXT(),
      cta_button_text: STRING(),
      cta_button_link: TEXT(),
    },
    {
      tableName: 'blog_cms',
      timestamps: true,
    },
  );

  return BlogCms;
};
