const express = require('express');
const app = express();
const path = require ('path')
const cors = require ('cors')
const connection = require ('./config/mongoose')
const router = require ('./routes/perfumeRoutes')
const menrouter = require ('./routes/menperfumeroutes')
const womenrouter = require ('./routes/womenperfumeroutes')
const adminrouter = require ('./routes/adminroutes')
const corsOptions = {
  origin: ['https://your-frontend.vercel.app'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
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