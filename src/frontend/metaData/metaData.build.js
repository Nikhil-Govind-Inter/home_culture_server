export default class MetaDataBuildSection {
  static buildMetaData(record) {
    return {
      meta_title: record?.meta_title ?? "",
      meta_description: record?.meta_description ?? "",
      meta_keywords: record?.meta_keywords ?? "",
    };
  }
}
