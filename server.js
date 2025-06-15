const express = require('express');
const app = express();
const path = require ('path')
const cors = require ('cors')
const connection = require ('./config/mongoose')
const router = require ('./routes/perfumeRoutes')
const menrouter = require ('./routes/menperfumeroutes')
const womenrouter = require ('./routes/womenperfumeroutes')
const adminrouter = require ('./routes/adminroutes')
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
connection()
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello, world!');
});
app.use ('/api/luxury',router)
app.use ('/api/men',menrouter)
app.use ('/api/womens',womenrouter)
app.use('/api/admin', adminrouter);
module.exports=app