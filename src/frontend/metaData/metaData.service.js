import { models } from "../../shared/models/index.js";
import ApiError from "../../shared/utils/ApiError.js";
import MetaDataBuildSection from "./metaData.build.js";

const { MetaData } = models;

export default class MetaDataService {
  static async get(slug) {
    const record = await MetaData.findOne({
      attributes: ["meta_title", "meta_description", "meta_keywords"],
      where: { page_slug: String(slug) },
    });
    if (!record) throw new ApiError(404, "Meta data not found");
    return MetaDataBuildSection.buildMetaData(record);
  }
}
