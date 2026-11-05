import { DataTypes } from 'sequelize';

const STATUS = () => ({ type: DataTypes.BOOLEAN, defaultValue: true });
const STRING = () => ({ type: DataTypes.STRING });
const TEXT = () => ({ type: DataTypes.TEXT });

export default (sequelize) =>
  sequelize.define(
    'aboutCms',
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      // Story Section
      story_section_status: STATUS(),
      story_section_media_path: TEXT(),
      story_section_media_alt: STRING(),
      story_section_header_title: STRING(),
      story_section_title: STRING(),
      story_section_description: TEXT(),

      // Philosophy Section
      philosophy_section_status: STATUS(),
      philosophy_section_media_path: TEXT(),
      philosophy_section_media_alt: STRING(),
      philosophy_section_header_title: STRING(),
      philosophy_section_title: STRING(),
      philosophy_section_description: TEXT(),

      // Mission
      mission_title: STRING(),
      mission_icon: STRING(),
      mission_description: TEXT(),

      // Vision
      vision_title: STRING(),
      vision_icon: STRING(),
      vision_description: TEXT(),

      // Highlight Section
      highlight_section_status: STATUS(),
      highlight_section_header_title: STRING(),
      highlight_section_title: STRING(),

      // Promise Section
      promise_section_status: STATUS(),
      promise_section_left_media_path: TEXT(),
      promise_section_left_media_alt: STRING(),
      promise_section_right_media_path: TEXT(),
      promise_section_right_media_alt: STRING(),
      promise_section_header_title: STRING(),
      promise_section_title: STRING(),
      promise_section_description: TEXT(),

      // CTA Section
      cta_section_status: STATUS(),
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
      tableName: 'about_cms',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  );
