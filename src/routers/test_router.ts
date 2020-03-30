import ResBody from "../struct/ResBody"
import Router from "koa-router"

const router: Router = new Router()

router.get("/success", async ctx => {
  ctx.body = new ResBody({
    data: { time: new Date() }
  })
})

router.get("/error", async ctx => {
  throw new Error("500-未知错误")
})

export default router
