import express from 'express';
const chalk = require('chalk');
const mongoose = require('mongoose');

const port = 3005;
const app = express();

app.use(express.json());

app.post('/', async (req, res) => {
  console.log(req.body);
});

mongoose
  .connect(
    'mongodb+srv://progeat:silviaS2000@clustertest.vfynt.mongodb.net/applications?retryWrites=true&w=majority&appName=ClusterTest'
  )
  .then(() => {
    app.listen(port, () => {
      console.log(chalk.green(`Server has been started on port ${port}...`));
    });
  });
