# liuxue-apply-tracker

一个本地运行的留学申请进度追踪工具，用来整理国家/地区、学校、项目、申请状态、截止日期和备注等信息。

数据保存在本机项目文件夹里的 `data/data.json`，不会上传到云端或第三方服务器。

## 功能

- 按国家/地区管理目标院校
- 记录学校、项目、申请链接、开放时间、截止日期、学费、申请费和备注
- 用状态看板追踪申请进度
- 支持搜索和筛选
- 支持本地自动保存
- 支持导入/导出备份数据

## 技术栈

- HTML / CSS / JavaScript
- Node.js
- Express

## 本地运行

先安装 [Node.js](https://nodejs.org/)。

然后在终端进入项目目录：

```bash
cd liuxue-apply-tracker
npm install
npm start
```

启动后访问：

```text
http://localhost:5173
```

## 项目结构

```text
liuxue-apply-tracker/
├── data/
│   └── data.json
├── public/
│   └── index.html
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

## 数据说明

默认数据文件是：

```text
data/data.json
```

这个文件保存申请追踪数据。更换电脑时，可以复制整个项目文件夹，或者单独备份 `data/data.json`。

## 隐私说明

本项目默认只在本机运行，服务监听地址为 `127.0.0.1`。  
数据不会自动上传到任何服务器。

如果把项目发布到 GitHub，请确认 `data/data.json` 中没有个人隐私信息，例如真实姓名、邮箱、电话、账号、密码、申请编号或私人备注。

## 注意

不要上传 `node_modules/` 文件夹。

依赖可以通过下面命令重新安装：

```bash
npm install
```

## License

MIT
