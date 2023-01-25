conn = new Mongo();
db = conn.getDB("product_category");

db.createUser(
  {
    user: "root",
    pwd: "root",
    roles: [
      {
        role: "readWrite",
        db: "product_category"
      }
    ]
  }
);