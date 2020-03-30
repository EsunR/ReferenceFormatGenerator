import { Sequelize } from "sequelize"
import { databaseConfig } from "../config"

class Db {
  sequelize: Sequelize
  constructor() {
    this.sequelize = this._connect()
  }
  _connect() {
    const { host, name, user, password } = databaseConfig
    const sequelize = new Sequelize(name, user, password, {
      host: host,
      dialect: "mysql"
    })
    return sequelize
  }
  connectTest() {
    this.sequelize
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.")
      })
      .catch((err: Error) => {
        console.error("Unable to connect to the database:", err)
      })
  }
}

export default new Db()
