import * as dotenv from 'dotenv';
dotenv.config();
import app from './app';
import { AppDataSource } from './src/data-source';

const PORT = process.env.PORT
AppDataSource.initialize()
  .then(() => {
    console.log("Database connection successful ✅")
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  })
