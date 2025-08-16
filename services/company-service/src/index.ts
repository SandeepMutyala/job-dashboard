import express from 'express';
import companyRoutes from './routes/company.routes';

const app = express();
app.use(express.json());

app.use('/company', companyRoutes);

export default app;
