const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path'); // 添加 path 模块

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // 使用静态资源路径

// 模拟用户数据库
const users = [
    { username: 'admin', password: '12345' }
];

// 登录路由
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        res.send('Login successful');
    } else {
        res.status(401).send('Invalid username or password');
    }
});

// 设置 multer 用于文件上传
const upload = multer({ dest: 'uploads/' });

// 发布博文路由
app.post('/new-post', upload.single('image'), (req, res) => {
    const { title, content } = req.body;
    const image = req.file; // 上传的图片
    console.log('New Post:', { title, content, image });
    res.send('Post published successfully!');
});

// 监听服务器
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
