const ACCESS_TABLE = {
  ADMIN: 0b00001,
  GOODS_EDIT: 0b00010,
  GOODS_VIEW: 0b00100,
  ARTICLE_EDIT: 0b01000,
  ARTICLE_VIEW: 0b10000,
};

const guest = ACCESS_TABLE.ARTICLE_VIEW | ACCESS_TABLE.GOODS_VIEW; // 10100
const editor = guest | ACCESS_TABLE.ARTICLE_EDIT | ACCESS_TABLE.GOODS_EDIT; // 11110
const admin = editor | ACCESS_TABLE.ADMIN; // 11111

console.log(editor & ACCESS_TABLE.ADMIN); // 0 - no access
console.log(editor & ACCESS_TABLE.ARTICLE_EDIT); // > 0 - access to the edit
