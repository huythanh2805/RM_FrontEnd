export const statusMapping = {
  ACTIVE: "Hoạt động",
  UN_ACTIVE: "Tạm ẩn",
};

export const UNITS = [
  "kg",
  "g",
  "mg",
  "lít",
  "ml",
  "cái",
  "chiếc",
  "hộp",
  "chai",
  "gói",
  "thùng",
  "chục",
  "lon",
  "túi",
  "thùng phi",
  "cuộn",
  "khay",
  "bó",
  "đôi",
  "bộ",
  "tấm",
  "tờ",
];

export const TYPE_EXPORT_NOTES_ENUM = {
  INTERNAL: "INTERNAL",
  RETURN: "RETURN",
  EXPIRED: "EXPIRED",
  ADJUSTMENT: "ADJUSTMENT",
};

export const TYPE_EXPORT_NOTES_OBJECT = [
  { value: TYPE_EXPORT_NOTES_ENUM.INTERNAL, title: "Phiếu xuất nội bộ" },
  { value: TYPE_EXPORT_NOTES_ENUM.RETURN, title: "Phiếu xuất trả lại nhà cung cấp" },
  { value: TYPE_EXPORT_NOTES_ENUM.EXPIRED, title: "Phiếu xuất sp hêt hạn" },
  { value: TYPE_EXPORT_NOTES_ENUM.ADJUSTMENT, title: "Phiếu xuất điều chỉnh số lượng" },
];
