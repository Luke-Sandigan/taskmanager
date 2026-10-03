import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import projectRoutes from './routes/projectRoutes.js';



const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);

//Task Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/projects', projectRoutes);


const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

export default app;
