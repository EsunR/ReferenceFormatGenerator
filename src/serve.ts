import { sysConfig } from "./config"
import Koa from "koa"
import Router from "koa-router"
import cors from "@koa/cors"
import KoaBody from "koa-body"
import errorHandler from "./middle/error_handler"
import dbGenerator from "./db/db_generator"
import KoaStatic from "koa-static"
import path from "path"
import KoaLogger from "koa-logger"

const app: Koa = new Koa()
const router: Router = new Router()

// Database 不需要数据库的项目直接注释掉下一行，可选择删除 db 层代码
dbGenerator()

// log
app.use(KoaLogger())

// 错误处理
app.use(errorHandler())

// 静态文件服务
app.use(
  KoaStatic(path.join(__dirname, "../static"), {
    gzip: true
  })
)

// CORS
app.use(cors())

// 解析 HTTP Body
app.use(
  KoaBody({
    multipart: true,
    formidable: {
      maxFieldsSize: 2000 * 1024 * 1024
    }
  })
)

// Router
import testRouter from "./routers/test_router"
router.use("/api/test", testRouter.routes())

app.use(router.routes()).use(router.allowedMethods())

// Listen
app.listen(sysConfig.port)
console.log(`serve running on port ${sysConfig.port}`)
