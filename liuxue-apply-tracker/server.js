// server.js -- 本机运行的小服务器（不上线）
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5173;
const HOST = "127.0.0.1"; // 只监听本机，局域网/外网都访问不到

const DATA_DIR = path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_DIR, "data.json");
const BAK_FILE = path.join(DATA_DIR, "data.json.bak");
const TMP_FILE = path.join(DATA_DIR, "data.json.tmp");

app.use(express.json({ limit: "10mb" }));

// 读取数据：文件不存在则返回 null（前端会用默认数据初始化）
app.get("/api/data", (req, res) => {
  try {
    if (!fs.existsSync(DATA_FILE)) return res.json(null);
    res.type("application/json").send(fs.readFileSync(DATA_FILE, "utf8"));
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

// 写入数据：原子写入（先写临时文件再改名），并先备份上一份
function writeData(req, res) {
  try {
    const data = req.body;
    if (!data || !Array.isArray(data.countries)) {
      return res.status(400).json({ error: "数据格式不正确：缺少 countries 数组" });
    }
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    if (fs.existsSync(DATA_FILE)) {
      try {
        fs.copyFileSync(DATA_FILE, BAK_FILE);
      } catch (_) {}
    }
    fs.writeFileSync(TMP_FILE, JSON.stringify(data, null, 2), "utf8");
    fs.renameSync(TMP_FILE, DATA_FILE);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}

app.put("/api/data", writeData);
app.post("/api/data", writeData); // 供页面关闭时 sendBeacon 兜底保存

// 提供前端静态页面（public/index.html）
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, HOST, () => {
  const url = `http://localhost:${PORT}`;
  console.log("\n  ▶ 留学申请进度追踪 已启动");
  console.log("  ▶ 在浏览器打开： " + url);
  console.log("  ▶ 数据文件： " + DATA_FILE);
  console.log("  ▶ 停止：在此终端按 Ctrl + C\n");
  openBrowser(url);
});

// 尽量自动打开默认浏览器（失败也不影响，手动打开上面的网址即可）
function openBrowser(url) {
  try {
    const { exec } = require("child_process");
    const cmd =
      process.platform === "win32"
        ? `start "" "${url}"`
        : process.platform === "darwin"
          ? `open "${url}"`
          : `xdg-open "${url}"`;
    exec(cmd, () => {});
  } catch (_) {}
}
