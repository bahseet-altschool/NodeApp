import express from 'express';

import authRoutes from "./src/auth/auth.routes";
import userRoutes from "./src/user/user.routes"
import adminRoutes from "./src/user/admin.routes";
const app = express();
app.use(express.json());


app.use('/api/v1/auth', authRoutes);



// user routes
app.use('/api/v1/user', userRoutes)



// admin routes
app.use('/api/v1/admin', adminRoutes)


export default app;
