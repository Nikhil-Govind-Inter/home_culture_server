import { DataTypes } from 'sequelize';

const BOOLEAN = () => ({ type: DataTypes.BOOLEAN, defaultValue: true });
const STRING = (length) => ({ type: length ? DataTypes.STRING(length) : DataTypes.STRING });
const TEXT = () => ({ type: DataTypes.TEXT });

export default (sequelize) => {
  const CareerCms = sequelize.define(
    'careerCms',
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      // Life at home section
      life_at_home_status: BOOLEAN(),
      life_at_home_header_title: STRING(),
      life_at_home_title: STRING(),
      life_at_home_quote: STRING(),
      life_at_home_description: STRING(),
      life_at_home_skills_title: STRING(),

      // Why join us section
      why_join_us_status: BOOLEAN(),
      why_join_us_header_title: STRING(100),
      why_join_us_title: STRING(100),
      why_join_us_description: STRING(),

      // Media
      media_one_path: TEXT(),
      media_one_alt: STRING(),
      media_two_path: TEXT(),
      media_two_alt: STRING(),
      media_three_path: TEXT(),
      media_three_alt: STRING(),
      media_four_path: TEXT(),
      media_four_alt: STRING(),

      // Current opening section
      current_opening_status: BOOLEAN(),
      current_opening_header_title: STRING(100),
      current_opening_title: STRING(100),
      current_opening_description: STRING(),

      // Testimonial section
      testimonial_status: BOOLEAN(),
      testimonial_header_title: STRING(100),
      testimonial_title: STRING(100),
      testimonial_description: STRING(),

      // CTA section
      cta_status: BOOLEAN(),
      cta_desktop_media_path: TEXT(),
      cta_mobile_media_path: TEXT(),
      cta_media_alt: STRING(),
      cta_header_title: STRING(),
      cta_title: STRING(),
      cta_description: TEXT(),
      cta_button_text: STRING(),
      cta_button_link: STRING(),
    },
    {
      tableName: 'career_cms',
      timestamps: true,
    },
  );

  return CareerCms;
};
