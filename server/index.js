const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
const cors = require('cors');
app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));

app.listen(8080, () => {
  console.log('서버 실행중');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/product', (req, res) => {
  res.json({
    name: 'black shoes',
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
