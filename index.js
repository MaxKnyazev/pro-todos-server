import express from 'express';
import chalk from 'chalk';
import cors from 'cors';
import { database } from './database/database.js';
import { User } from './entities/users/users.model.js';
import { usersRoutes } from './entities/users/users.routes.js';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

app.use('/users', usersRoutes);

const start = async () => {
  try {
    await database.authenticate();
    console.log(chalk.blue(`Connection DB successfully...`));

    await User.sync({});
    console.log(chalk.blue(`User model has been sync successfully...`));

    app.listen(PORT, () => {
      console.log(chalk.bgGreen(`Server started on port ${PORT}...`));
    })
  } catch (error) {
    console.log(chalk.bgRed(`Error start app: ${error}`))
  }
}
start();