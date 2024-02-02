
import dotenv from 'dotenv'
import express from 'express'
import Crypto from './model.js'
import Axios from 'axios'
import path from 'path'
import { fileURLToPath } from 'url';
dotenv.config()
const app = express()
const port = 3000
app.use(express.json())

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname,"frontend")

app.use(express.static(publicPath))


app.get('/crypto', async (req, res) => {

  try {
    const data = await Crypto.find(); // or any other query based on your needs
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
})

// app.get('/', async (req, res) => {

//   res.sendFile(path.join( './frontend', 'index.html'));

// })





app.post('/cryptodb', async (req, res) => {

  const result = await Axios.get('https://api.wazirx.com/api/v2/tickers')

  const body = result.data
  await Crypto.deleteMany()
  const Array = []
  Object.keys(body).forEach(key => {
    const value = body[key];
    Array.push({ name: key, ...value })
  });

  // console.log(Array)
  const user = await Crypto.create(Array.slice(0, 10))
  res.send(user);
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
