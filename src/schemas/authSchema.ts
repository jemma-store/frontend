import { z } from 'zod';

const ukrainianPhoneRegex = /^(?:\+380|380|0)(?:39|50|63|66|67|68|73|91|92|93|94|95|96|97|98|99)\d{7}$/;
const nameRegex = /^[а-яА-ЯіїІЇєЄёЁґҐ'’ -]{2,}$/u;
const email = /^(?![ .])[\w!#$%&'*+/=?^_`{|}~.-]{4,63}(?<![ .])@[a-zA-Z\d.-]{2,9}(?<![ ])\.[a-zA-Z]{2,9}$/;

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Поле повинно містити щонайменше 2 символи' })
    .max(50, { message: 'Поле повинно містити щонайбільше 50 символів' })
    .regex(nameRegex, { message: 'Введіть ім’я кирилицею' }),
  email: z
    .string()
    .regex(email, { message: 'Невірний формат email' }),
  // phone: z
  //   .string()
  //   .min(10, { message: 'Поле повинне містити щонайменше 10 цифр' })
  //   .max(13, { message: 'Поле повинне містити не більше 13 цифр' })
  //   .regex(ukrainianPhoneRegex, { message: 'Невірний формат телефону' }),
});

export const loginSchema = z.object({
  email: z
    .string()
    .regex(email, { message: 'Невірний формат email' }),
});

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Ім’я повинно містити щонайменше 2 символи' })
    .max(50, { message: 'Поле повинно містити щонайбільше 50 символів' })
    .regex(nameRegex, { message: 'Введіть ім’я кирилицею' }),

  phone: z
    .string()
    .regex(ukrainianPhoneRegex, { message: 'Невірний формат телефону' })
    .optional(),
});
