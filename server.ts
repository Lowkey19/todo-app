import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import routes from './routes/todoRoutes';
import database from './database';

dotenv.config();

export const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

routes(app);

app.use(express.static(path.join(__dirname, "client", "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

database.connect(() => {
  app.listen(process.env.PORT, () => console.log(`Express server has started on port ${process.env.PORT}`));
})

