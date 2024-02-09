import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/index.js';
import registerRoute from './routes/register.js'
import cors from 'cors';

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://iste-registeration-backend.vercel.app');
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    // Add other CORS headers as needed
    next();
  });

dotenv.config({
    path: './.env',
});
const port = 3000;

app.use('/register', registerRoute);

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server Running at ${port}`);
    })
}).catch((err) => {
    console.log(`MongoDB Connection Failed!!`, err);
})