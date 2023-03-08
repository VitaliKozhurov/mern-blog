import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import { registerValidation, loginValidation, postCreateValidation } from './validations/validations.js';
import { login, register, getMe } from './controllers/UserController.js';
import { create, getAll, getOne, remove, update } from './controllers/PostController.js';
import { checkAuth, handleValidationError } from './utils/index.js';

// Подключение к базе данных Mongo DB
mongoose.connect('mongodb+srv://admin:Belarus123@cluster0.r3bbsio.mongodb.net/blog?retryWrites=true&w=majority')
   .then(() => console.log('DB ok'))
   .catch((err) => console.log('DB error', err))

const app = express();

// Хранилище для загрузки файлов
const storage = multer.diskStorage({
   destination: (_, __, cb) => {
      cb(null, 'uploads')
   },
   filename: (_, file, cb) => {
      cb(null, file.originalname)
   }
});

const upload = multer({ storage });

app.use(express.json()); // чтобы веб-сервер понимал JSON формат
app.use('/uploads', express.static('uploads')); // если запрос приходит на uploads перенаправляем его в папку uploads для поиска файлы в этой папке


app.get('/', (req, res) => {
   // req хранит, информ. от клиента
   // res то что мы передаем клиенту
   res.send('Web server')
});

app.post('/auth/login', loginValidation, handleValidationError, login);
app.post('/auth/register', registerValidation, handleValidationError, register);
app.get('/auth/me', checkAuth, getMe);
app.get('/posts', getAll);
app.get('/posts/:id', getOne);
app.post('/posts', checkAuth, postCreateValidation, create);
app.delete('/posts/:id', checkAuth, remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, update);
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
   res.json({
      url: `/uploads/${req.file.originalname}`,
   })
});
// первый параметр номер порта
app.listen(4440, (err) => {
   if (err) {
      return console.log(err)
   }
   console.log('Server started...')
});