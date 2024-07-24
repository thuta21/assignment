import express from 'express';
import { connectToDb } from './config/database.js'
import cors from 'cors';
import router from './routes/todo.js'

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api' , router);

app.listen(PORT , async ()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
    await connectToDb();
})
