import { DataTypes } from "sequelize";

export default (sequelize) => {
  const BlogCategory = sequelize.define(
    "blogCategory",
    {
      // Primary key
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      // Content
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      // Display settings
      sort_order: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "blog_categories",
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",
    }
  );

  BlogCategory.associate = (models) => {
    BlogCategory.hasMany(models.Blog, {
      foreignKey: "category_id",
      as: "blogs",
    });
  };

  return BlogCategory;
};