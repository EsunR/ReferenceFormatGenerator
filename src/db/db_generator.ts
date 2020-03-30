import db from "./index"

export default function() {
  db.sequelize.sync()
  db.connectTest()
}
