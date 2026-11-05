import { DataTypes } from 'sequelize';

const BOOLEAN = () => ({ type: DataTypes.BOOLEAN, defaultValue: true });
const STRING = () => ({ type: DataTypes.STRING });
const TEXT = () => ({ type: DataTypes.TEXT });

export default (sequelize) => {
  const HowItWorksCms = sequelize.define(
    'howItWorksCms',
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      // Section One - Vision
      vision_section_status: BOOLEAN(),
      vision_section_media_path: TEXT(),
      vision_section_media_alt: STRING(),
      vision_section_header_title: STRING(),
      vision_section_title: STRING(),
      vision_section_description: TEXT(),

      // Section Two - Workshop
      workshop_section_status: BOOLEAN(),
      workshop_section_media_path: TEXT(),
      workshop_section_media_alt: STRING(),
      workshop_section_header_title: STRING(),
      workshop_section_title: STRING(),
      workshop_section_description: TEXT(),

      // Section Three - Artisans
      artisans_section_status: BOOLEAN(),
      artisans_section_header_title: STRING(),
      artisans_section_title: STRING(),
      artisans_section_description: TEXT(),

      // Section Four - Journey
      journey_section_status: BOOLEAN(),
      journey_section_title: STRING(),
      journey_section_media_path: TEXT(),
      journey_section_media_alt: STRING(),

      // Section Five - CTA
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
      tableName: 'how_it_works_cms',
      timestamps: true,
    },
  );

  return HowItWorksCms;
};
