import express from 'express';
import mongoose from 'mongoose';
import { registerValidation, loginValidation, postCreateValidation } from './validations/validations.js';
import checkAuth from './utils/checkAuth.js';
import { login, register, getMe } from './controllers/UserController.js';
import { create, getAll, getOne } from './controllers/PostController.js';


// Подключение к базе данных Mongo DB
mongoose.connect('mongodb+srv://admin:Belarus123@cluster0.r3bbsio.mongodb.net/blog?retryWrites=true&w=majority')
   .then(() => console.log('DB ok'))
   .catch((err) => console.log('DB error', err))

const app = express();
app.use(express.json()); // чтобы веб-сервер понимал JSON формат

app.get('/', (req, res) => {
   // req хранит, информ. от клиента
   // res то что мы передаем клиенту
   res.send('Web server')
});

app.post('/auth/login', loginValidation, login);
app.post('/auth/register', registerValidation, register);
app.get('/auth/me', checkAuth, getMe);
app.get('/posts', getAll)
app.get('/posts/:id', getOne)
app.post('/posts', checkAuth, postCreateValidation, create)
//app.delete('/posts', remove)
//app.patch('/posts', update)



// первый параметр номер порта
app.listen(4440, (err) => {
   if (err) {
      return console.log(err)
   }
   console.log('Server started...')
});