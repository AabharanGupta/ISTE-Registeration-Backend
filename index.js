import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/index.js';
import registerRoute from './routes/register.js'
import cors from 'cors';

const app = express();
app.use(express.json());

app.use((_req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', '*');
      res.header('Access-Control-Allow-Methods', '*');
    next();
  })
  app.use(cors({
    origin:"*",
    credentials:true
  }))

app.options('*', cors());

dotenv.config({
    path: './.env',
});
const port = 3000;

app.use('/register', registerRoute);

app.use('/', (req,res)=>
{
    res.json(
        {
            status : "Server is up"
        }
    )
});

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server Running at ${port}`);
    })
}).catch((err) => {
    console.log(`MongoDB Connection Failed!!`, err);
})