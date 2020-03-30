# Koa & Typescript 项目模板

项目徽章：[![Badge](https://img.shields.io/badge/TPL-koa--template--ts-blue)](https://github.com/EsunR/koa-template-ts)

## 模板已支持

- koa
- koa-router
- koa-static 静态目录访问
- koa-cors CORS 跨域资源共享，默认无限制
- 开启 G-zip 压缩
- 控制台日志
- 错误的集中处理方案 [实现方案](https://blog.esunr.xyz/2019/11/koa%E7%9A%84%E9%94%99%E8%AF%AF%E5%A4%84%E7%90%86%E6%96%B9%E6%A1%88/)
- 集成 Prettier 与 ESLint 代码检查规则

## 模板设计思想

采用 MVC 分层的思想，目录结构如下：

```
+ src
  + db         // 数据库层链接逻辑
  + middle     // 项目中自行封装的中间件
  + model      // 项目的 Model 层
  + routers    // 路由分层中的路由层
  + struct     // 自定义的结构体
  + controller // 项目中的 Controller 层
  + utils 
  - config.ts  // 系统配置
  - serve.ts   // 入口文件
+ static       // 静态资源访问目录
```

实现参考：

- [QiniuManager 第三方七牛云上传管理器](https://github.com/EsunR/QiniuManager)
- [DormitoryManagement 基于Vue的宿舍管理系统（ES6实现）](https://github.com/EsunR/DormitoryManagement)

## cli 指令

安装依赖：

```sh
$ npm install
```

编译为 Javascript：

```sh
$ npm run build
```

开发模式（热更新模式）：

```sh
$ npm run dev
```

## 运行测试

命令行工具输入：

```sh
$ npm run dev
```

出现如下提示，说明连接成功：

![](http://img.cdn.esunr.xyz/markdown/20200330103338.png)

访问 `localhost:9090` 如果出现如下界面说明 Koa 静态文件访问服务正常：

![](http://img.cdn.esunr.xyz/markdown/20200330105130.png)

访问 `localhost:9090/api/test/success` 如果出现如下界面说明 api 服务正常：

![](http://img.cdn.esunr.xyz/markdown/20200330110550.png)

访问 `localhost:9090/api/test/error` 如果出现如下界面说明错误捕获正常：

![](http://img.cdn.esunr.xyz/markdown/20200330110635.png)