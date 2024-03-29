let transBtn = document.querySelector("#trans-btn")
let originTextarea = document.querySelector("#origin")
let resultTextarea = document.querySelector("#result")
let failResult = document.querySelector("#warning .fail-result")
let waring = document.querySelector("#warning")

let fetching = false

let request = (function() {
  const service = axios.create({
    baseURL: "/",
    timeout: 60000
  })

  service.interceptors.response.use(response => {
    const { data } = response
    if (data.response || data.success) {
      return data
    } else {
      return Promise.reject(data.msg)
    }
  })
  return service
})()

function handleBtnClick() {
  if (fetching || originTextarea.value.trim() === "") {
    return
  }
  fetching = true
  transBtn.classList.add("animate")
  let originStr = originTextarea.value
  let originArr = originStr.split("\n")
  let data = {}
  for (let i in originArr) {
    let searchName = originArr[i]
    data[`book${i}`] = searchName
  }
  if (Object.values(data).length > 0) {
    alert("最多只能查询10本书")
    return
  }
  request({
    url: "/api/main/find",
    method: "get",
    params: data
  })
    .then(res => {
      formatToResult(res.data.results)
      fetching = false
      transBtn.classList.remove("animate")
      if (res.data.fail > 0) {
        alert(
          `有${res.data.fail}本书籍的查询失败了，请手动删除已查询到的书籍后重试`
        )
      }
    })
    .catch(e => {
      alert("连接超时，请重试")
      fetching = false
      transBtn.classList.remove("animate")
    })
}

function formatToResult(data) {
  let resultArr = []
  let failArr = []
  let i = 0
  data.forEach(info => {
    if (info.success) {
      let infoStr = `[${i + 1}] ${info.author}.${info.name} [${
        info.sortCode
      }].${info.publish},${info.year}`
      resultArr.push(infoStr)
      i++
    } else {
      failArr.push(info.searchName)
    }
  })
  resultTextarea.value = resultArr.join("\n")
  if (failArr.length !== 0) {
    waring.classList.remove("hide")
    failResult.innerHTML = failArr.join("，")
  } else {
    waring.classList.add("hide")
    failResult.innerHTML = ""
  }
}

transBtn.addEventListener("click", handleBtnClick)
