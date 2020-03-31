export function getBookTypeCode(type: string): string | null {
  if (!type) {
    return ""
  }
  let dictionary: string =
    "专著M；报纸N；期刊J；专利文献P；汇编G；古籍O；技术标准S；学位论文D；科技报告R；参考工具K；检索工具W；档案B；录音带A；图表Q；唱片L；产品样本X；录相带V；会议录C；中译文T；乐谱I；电影片Y；手稿H；微缩胶卷U；幻灯片Z；微缩平片F；其他E"
  let dictionaryArr: string[] = dictionary.split("；")
  let result: string | undefined = dictionaryArr.find((dicItem: string) => {
    return new RegExp(type).test(dicItem) ? dicItem : ""
  })
  result = result ? result.trim() : "其他E"
  let reg: RegExp = new RegExp("[A-Z]")
  let regResult: any[] | null = reg.exec(result)
  return regResult ? regResult[0] : "E"
}

export function getChildText(cheerio: Cheerio, selector: string): string {
  return cheerio
    .find(selector)
    .text()
    .trim()
}
