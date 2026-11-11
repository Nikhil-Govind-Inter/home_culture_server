import { DataTypes } from "sequelize";

const BOOLEAN = () => ({ type: DataTypes.BOOLEAN, defaultValue: true });
const STRING = () => ({ type: DataTypes.STRING });
const TEXT = () => ({ type: DataTypes.TEXT });

export default (sequelize) => {
  const HomeCms = sequelize.define(
    "homeCms",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      // Section One - Challenges Section
      challenges_section_status: BOOLEAN(),
      challenges_section_header_title: STRING(),
      challenges_section_title: STRING(),
      challenges_section_description: TEXT(),
      challenges_section_right_title: STRING(),
      challenges_section_button_text: STRING(),
      challenges_section_button_link: STRING(),

      // Section Two - Ownership Section
      ownership_status: BOOLEAN(),
      ownership_media_type: {
        type: DataTypes.ENUM("image", "video"),
      },
      ownership_desktop_media_path: TEXT(),
      ownership_mobile_media_path: TEXT(),
      ownership_mobile_media_alt: STRING(),
      ownership_thumbnail: TEXT(),
      ownership_header_title: STRING(),
      ownership_title: STRING(),
      ownership_description: TEXT(),
      ownership_choose_title: STRING(),
      ownership_button_text: STRING(),
      ownership_button_link: STRING(),

      // Section Three - Welcome Section
      welcome_section_status: BOOLEAN(),
      welcome_section_header_title: STRING(),
      welcome_section_title: STRING(),
      welcome_section_description: TEXT(),

      // Section Four - Style Section
      style_section_status: BOOLEAN(),
      style_section_title: STRING(),

      // Section Five - Experience Section
      experience_section_status: BOOLEAN(),
      experience_section_header_title: STRING(),
      experience_section_title: STRING(),
      modal_title: STRING(),
      modal_description: TEXT(),
      button_one_text: STRING(),
      button_one_link: STRING(),
      button_two_text: STRING(),
      phone: STRING(),
      whatsapp_number: STRING(),

      // Section Six - Journey Section
      journey_section_status: BOOLEAN(),
      journey_section_header_title: STRING(),
      journey_section_title: STRING(),
      journey_section_media_type: {
        type: DataTypes.ENUM("image", "video"),
      },
      journey_section_desktop_media_path: TEXT(),
      journey_section_mobile_media_path: TEXT(),
      journey_section_media_alt: STRING(),
      journey_section_thumbnail: TEXT(),
      journey_section_description: TEXT(),
      journey_section_button_text: STRING(),
      journey_section_button_link: STRING(),

      // Section Seven - Insights Section
      insights_status: BOOLEAN(),
      insights_header_title: STRING(),
      insights_title: STRING(),
      insights_description: TEXT(),
      insights_button_text: STRING(),
      insights_button_link: STRING(),

      // Section Eight - CTA
      cta_status: BOOLEAN(),
      cta_desktop_media_path: TEXT(),
      cta_mobile_media_path: TEXT(),
      cta_media_alt: STRING(),
      cta_header_title: STRING(),
      cta_title: STRING(),
      cta_description: TEXT(),
      cta_button_one_text: STRING(),
      cta_button_one_link: STRING(),
      cta_button_two_text: STRING(),
      cta_button_two_link: STRING(),
    },
    {
      tableName: "home_cms",
      timestamps: true,
    },
  );

  return HomeCms;
};
