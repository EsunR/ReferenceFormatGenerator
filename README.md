# 引用文献格式生成工具

[![Badge](https://img.shields.io/badge/TPL-koa--template--ts-blue)](https://github.com/EsunR/koa-template-ts)

该项目基于 Nodejs，前端页面已适配移动端。该项目数据源通过简单爬取 [中国国家图书馆](http://find.nlc.cn) 搜索结果所得，仅用于学习交流使用。

项目部署地址：http://esunr.xyz:9093（没钱续费了，自己跑着玩吧）

## 截图

![](http://img.cdn.esunr.xyz/markdown/引用.jpg)

## 使用

安装依赖：

```sh
npm install
```

编译为 Javascript：

```sh
npm run build
```

运行：

```sh
node ./dist/serve.js
```

使用 pm2 启动：

```sh
pm2 start ./ecosystem.config.js
pm2 save
```

请求 `9093` 端口以访问应用。

## 开发

安装依赖：

```sh
npm install
```

开发模式：

```sh
npm run dev
```
