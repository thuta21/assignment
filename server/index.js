import express from 'express';
import { connectToDb, sequelize } from './config/database.js';
import cors from 'cors';
import EventRouter from './routes/event.js';
import authRouter from './routes/auth.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('public/uploads')); // Serve static files from 'public/uploads'

// Route definitions
app.use('/api', EventRouter);
app.use('/api/auth', authRouter);

// Start the server
app.listen(PORT, async () => {
    console.log(`Server is running at http://localhost:${PORT}`);

    // Connect to the database
    await connectToDb();

    // Sync models with the database
    try {
        await sequelize.sync(); // This will create tables based on your models if they do not exist
        console.log("Database synchronized successfully.");
    } catch (error) {
        console.error("Error synchronizing database:", error);
    }
});
