import { DataTypes } from "sequelize";

const BOOLEAN = () => ({ type: DataTypes.BOOLEAN, defaultValue: true });
const STRING = () => ({ type: DataTypes.STRING });
const TEXT = () => ({ type: DataTypes.TEXT });

export default (sequelize) => {
  const Blog = sequelize.define(
    "blog",
    {
      // Primary key
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      // Relations
      category_id: {
        type: DataTypes.BIGINT,
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
      excerpt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      reading_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      // Media
      thumbnail_media_path: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      thumbnail_media_alt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      media_path: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      media_alt: {
        type: DataTypes.STRING,
        allowNull: false,
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
      is_featured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      show_in_home: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "blogs",
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",
    }
  );

  Blog.associate = (models) => {
    Blog.belongsTo(models.BlogCategory, {
      foreignKey: "category_id",
      as: "category",
    });
  };

  return Blog;
};