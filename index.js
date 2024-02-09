import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/index.js';
import registerRoute from './routes/register.js'
import cors from 'cors';

const app = express();
app.use(express.json());

app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.header('Access-Control-Allow-Headers', '*'); // Allow any headers in the request
    res.header('Access-Control-Allow-Methods', '*'); // Allow any HTTP methods
    next();
  });
  
  // Use cors middleware
  app.use(cors({
    origin: '*',
    credentials: true
  }));
  
  // Route to handle preflight requests
  app.options('*', (req, res) => {
    res.sendStatus(200); // Respond with a 200 OK status for OPTIONS requests
  });

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