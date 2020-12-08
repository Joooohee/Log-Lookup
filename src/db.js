import sql from "mssql";

const config = {
  user: "sa",
  password: "Effex12!@",
  server: "121.78.152.148",
  database: "FineGWApiDb",
  options: {
    encrypt: false,
  },
};

export const webPoolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("Connected to MSSQL");
    return pool;
  })
  .catch((err) => console.log("Database Connection Failed! Bad Config: ", err));
