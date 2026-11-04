// Shapes records for the public API: hides internal fields (status, soft-delete marker).
export default class ContentView {
  static one(record) {
    const { status, deleted_at: deletedAt, ...publicFields } = record.toJSON();
    return publicFields;
  }

  static many(records) {
    return records.map((record) => ContentView.one(record));
  }
}
