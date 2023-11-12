const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pgp = require('pg-promise')();

const app = express();
const PORT = process.env.PORT || 3002;

// 允许所有来源的请求访问这个后端
app.use(cors());

// PostgreSQL数据库连接配置
const dbConfig = {
  host: 'localhost',
  port: 5432,
  database: 'testsql',
  user: 'admin',
  password: 'qwaszx1233',
};

const db = pgp(dbConfig);

// 解析请求体
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 处理用户提交的数据
app.post('/submit', async (req, res) => {
  try {
    const { uid, username } = req.body;

    // 将数据插入数据库
    await db.none('INSERT INTO your_table_name(uid, username) VALUES($1, $2)', [uid, username]);

    res.status(200).json({ success: true, message: 'Data submitted successfully.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// 提供JSON形式的uid和username数据
app.get('/data', async (req, res) => {
  try {
    const data = await db.any('SELECT uid, username FROM your_table_name');
    res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// 启动Express应用监听指定端口
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
