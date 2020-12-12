const express = require('express');

const app = express();
const port = process.env.PORT || 4200;

app.use(express.static('./dist/CS5610-fall-2020-Semester-Project'));

app.get('/*', function (req, res) {
  res.sendFile('index.html', {
    root: 'dist/CS5610-fall-2020-Semester-Project',
  });
});

app.listen(port);
