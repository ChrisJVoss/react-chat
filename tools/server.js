import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import socket from 'socket.io'
import { Server } from 'http'


const port = 3000;
const app = express()
const server = Server(app)
const compiler = webpack(config)
const io = socket(server)


app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true, publicPath: config.out.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('*', function(req, res) {
 res.sendFile(path.join(__dirname, '../src/index.html'));
});

io.on('connection', function(socket) {
  console.log('a user connected')
})

server.listen(port, function(err) {
  if (err) {
    console.log('error', err);
   } else {
      open(`http://localhost:${port}`);
   }
 });
