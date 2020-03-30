import ResBody from "../struct/ResBody"
import Router from "koa-router"
import axios from "axios"
import cheerio from "cheerio"

const router: Router = new Router()

function getChildText(cheerio: Cheerio, selector: string): string {
  return cheerio
    .find(selector)
    .text()
    .trim()
}

router.get("/test", async ctx => {
  ctx.body = new ResBody({
    data: { time: new Date() }
  })
})

router.get("/find", async ctx => {
  const { bookName: searchName } = ctx.query
  const host: string = encodeURI(
    `http://find.nlc.cn/search/doSearch?query=${searchName}&secQuery=&actualQuery=${searchName}&searchType=2&docType=全部&isGroup=isGroup&targetFieldLog=全部字段&orderBy=RELATIVE`
  )
  let htmlContent: string = (await axios.get(host)).data
  const $ = cheerio.load(htmlContent)
  const bookDom = $(
    "#wj_content > div > div.search_information > div.article_list > div:nth-child(1)"
  )
  let bookId = bookDom.find(".book_name a").attr("id")
  let result = {
    id: bookId,
    name: getChildText(bookDom, ".book_name a"),
    sort: getChildText(bookDom, ".book_type:nth-child(2) > .book_val"),
    author: getChildText(bookDom, ".book_type:nth-child(3) > .book_val"),
    year: getChildText(bookDom, ".book_type:nth-child(4) > .book_val"),
    publish: getChildText(
      bookDom,
      ".book_type:nth-child(4) > .book_she > .book_val"
    )
  }
  ctx.body = new ResBody({
    data: result
  })
})

export default router
