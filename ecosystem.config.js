const path = require("path")

module.exports = {
  apps: [
    {
      name: "reference-format-generator",
      script: "./dist/serve.js",
      cwd: path.resolve(__dirname, "./")
    }
  ]
}
