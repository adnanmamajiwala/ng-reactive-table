const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/ng-reactive-table'));

app.get('/*', (req,res,next) => {
  res.sendFile(path.join(__dirname + '/dist/ng-reactive-table/index.html'));
});

app.listen(process.env.PORT || 8000);
