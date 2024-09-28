import express from 'express';
import { connectToDb, sequelize } from './config/database.js';
import cors from 'cors';
import EventRouter from './routes/event.js';
import authRouter from './routes/auth.js';
import attendeeRouter from './routes/attendee.js';
import organizerRouter from './routes/organizer.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('public/uploads')); // Serve static files from 'public/uploads'

app.use('/api/events', EventRouter);
app.use('/api/auth', authRouter);
app.use('/api/attendees', attendeeRouter);
app.use('/api/organizers', organizerRouter)

app.listen(PORT, async () => {
    console.log(`Server is running at http://localhost:${PORT}`);

    await connectToDb();

    try {
        // await sequelize.sync();
        console.log("Database synchronized successfully.");
    } catch (error) {
        console.error("Error synchronizing database:", error);
    }
});
