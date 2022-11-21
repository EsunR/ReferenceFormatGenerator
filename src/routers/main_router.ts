import ResBody from "../struct/ResBody"
import Router from "koa-router"
import axios from "axios"
import cheerio from "cheerio"

// utils
import { getChildText, getBookTypeCode, sleep } from "../utils"

const router: Router = new Router()

router.get("/test", async ctx => {
  ctx.body = new ResBody({
    data: { time: new Date() }
  })
})

router.get("/find", async ctx => {
  let searchNames = ctx.query
  console.log("searchNames: ", searchNames)
  let results: any[] = []
  const books = Object.values(searchNames)
  if (books.length > 10) {
    throw new Error("一次最多只能查询10本书")
  }
  let retryTimes = 1
  for (let i = 0; i < books.length; i++) {
    let searchName = books[i]
    const host: string = encodeURI(
      `http://find.nlc.cn/search/doSearch?query=${searchName}&secQuery=&actualQuery=${searchName}&searchType=2&docType=全部&isGroup=isGroup&targetFieldLog=全部字段&orderBy=RELATIVE`
    )
    try {
      console.log("searching book: ", searchName)
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
      // 查询成功
      console.log(`success, waiting ${(500 * retryTimes) / 1000}s`)
      results.push(bookInfo)
      retryTimes = 1
      await sleep(500 * retryTimes)
    } catch (error) {
      // 重试失败，跳出
      if (retryTimes > 3) {
        break
      }
      // 插叙失败，重试
      console.log(
        `searching error, book: ${searchName},retry times: ${retryTimes}`
      )
      retryTimes++
      i--
    }
  }
  ctx.body = new ResBody({
    data: {
      results,
      success: results.length,
      fail: books.length - results.length
    }
  })
})

export default router
