import ResBody from "../struct/ResBody"
import Router from "koa-router"
import axios from "axios"
import cheerio from "cheerio"

// utils
import { getChildText, getBookTypeCode } from "../utils"

const router: Router = new Router()

router.get("/test", async ctx => {
  ctx.body = new ResBody({
    data: { time: new Date() }
  })
})

router.get("/find", async ctx => {
  let searchNames = ctx.query
  let result: any[] = []
  for (let key in searchNames) {
    if (!/book/.test(key)) {
      continue
    }
    let searchName = searchNames[key]
    const host: string = encodeURI(
      `http://find.nlc.cn/search/doSearch?query=${searchName}&secQuery=&actualQuery=${searchName}&searchType=2&docType=全部&isGroup=isGroup&targetFieldLog=全部字段&orderBy=RELATIVE`
    )
    let htmlContent: string = (await axios.get(host)).data
    const $ = cheerio.load(htmlContent)
    const bookDom = $(
      "#wj_content > div > div.search_information > div.article_list > div:nth-child(1)"
    )
    let bookId = bookDom.find(".book_name a").attr("id")
    let bookInfo = {
      id: bookId ? bookId : new Date().valueOf().toString(),
      searchName: searchName,
      name: getChildText(bookDom, ".book_name a"),
      sort: getChildText(bookDom, ".book_type:nth-child(2) > .book_val"),
      sortCode: getBookTypeCode(
        getChildText(bookDom, ".book_type:nth-child(2) > .book_val")
      ),
      author: getChildText(bookDom, ".book_type:nth-child(3) > .book_val"),
      year: getChildText(bookDom, ".book_type:nth-child(4) > .book_val"),
      publish: getChildText(
        bookDom,
        ".book_type:nth-child(4) > .book_she > .book_val"
      ),
      success: bookId ? true : false
    }
    result.push(bookInfo)
  }
  ctx.body = new ResBody({
    data: result
  })
})

export default router
