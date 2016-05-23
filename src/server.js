import express from 'express';
import path from 'path';
import routes from './routes/main.routes';
import mongoose from 'mongoose';
const app = express();

// database connection
mongoose.connect('mongodb://juonliners:janudroid@ds011860.mlab.com:11860/zoho-db-file');
// mongoose.connect('mongodb://localhost/zoho-db');
const db = mongoose.connection;
db.on('error', (err) => {
  console.log(err);
  console.log('error connection');
});
db.once('open', () => {
  console.log('connect!!');
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
app.use('/', routes);
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
