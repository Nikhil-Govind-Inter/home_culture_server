import { DataTypes } from 'sequelize';

const BOOLEAN = () => ({ type: DataTypes.BOOLEAN, defaultValue: true });
const STRING = () => ({ type: DataTypes.STRING });
const TEXT = () => ({ type: DataTypes.TEXT });

export default (sequelize) => {
  const ExperienceCms = sequelize.define(
    'experienceCms',
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      // Section One - Intro
      intro_section_status: BOOLEAN(),
      intro_section_media_path: TEXT(),
      intro_section_media_alt: STRING(),
      intro_section_header_title: STRING(),
      intro_section_title: STRING(),
      intro_section_quote: TEXT(),
      intro_section_description: TEXT(),

      // Section Two - Journey
      journey_section_status: BOOLEAN(),
      journey_section_header_title: STRING(),
      journey_section_title: STRING(),
      journey_section_description: TEXT(),

      // Section Three - Lifestyle
      lifestyle_status: BOOLEAN(),
      lifestyle_header_title: STRING(),
      lifestyle_title: STRING(),
      lifestyle_description: TEXT(),

      // Section Four - Visit
      visit_section_status: BOOLEAN(),
      visit_section_media_path: TEXT(),
      visit_section_media_alt: STRING(),
      visit_section_header_title: STRING(),
      visit_section_title: STRING(),
      visit_section_description: TEXT(),

      // Section Five - Feature
      feature_section_status: BOOLEAN(),
      feature_section_header_title: STRING(),
      feature_section_title: STRING(),

      // Section Six - Booking process
      booking_process_status: BOOLEAN(),
      booking_process_header_title: STRING(),
      booking_process_title: STRING(),

      // Section Seven - FAQ
      faq_section_status: BOOLEAN(),
      faq_section_header_title: STRING(),
      faq_section_title: STRING(),
      faq_section_description: TEXT(),

      // Section Eight - Enquiry
      enquiry_section_status: BOOLEAN(),
      enquiry_section_header_title: STRING(),
      enquiry_section_title: STRING(),
      enquiry_section_description: TEXT(),
    },
    {
      tableName: 'experience_cms',
      timestamps: true,
    },
  );

  return ExperienceCms;
};
