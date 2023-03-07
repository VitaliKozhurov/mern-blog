import { body } from 'express-validator';

// body('какой параметр проверяем', 'Информационное сообщение при проверке с ошибкой')

export const loginValidation = [
   body('email', 'Неверный формат почты').isEmail(),               // проверка на email
   body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }), // проверка на кол-во символов
];

export const registerValidation = [
   body('email', 'Неверный формат почты').isEmail(),               // проверка на email
   body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }), // проверка на кол-во символов
   body('fullName', 'Укажите имя').isLength({ min: 3 }), // проверка на кол-во символов
   body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),  //  опциональный параметр, если он есть проверка является ли он ссылкой
];

export const postCreateValidation = [
   body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
   body('text', 'Введите текст статьи').isLength({ min: 10 }).isString(),
   body('tags', 'Неверный формат даты тегов').optional().isString(),
   body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
]