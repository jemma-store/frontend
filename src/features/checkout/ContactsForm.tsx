import { useFormContext } from 'react-hook-form';

import { IFormSchema } from '@/types/';
import { Input } from '@/components/ui';

export const ContactsForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<IFormSchema>();

  return (
    <fieldset className="flex flex-col items-start gap-7 w-full">
      <div className="w-full relative flex items-center gap-2 border-b-2 border-grey bg-transparent rounded-none focus-within:border-brown-dark focus-within:text-brown-dark">
        <Input
          id="firstName"
          {...register('personalInfo.firstName')}
          className="h-10 w-full bg-transparent border-none rounded-none px-3 pt-2.5"
          placeholder="Ім’я"
        />
        {errors.personalInfo?.firstName && (
          <p className="text-sm text-red-500">{errors.personalInfo.firstName.message}</p>
        )}
      </div>

      <div className="w-full relative flex items-center gap-2 border-b-2 border-grey bg-transparent rounded-none focus-within:border-brown-dark focus-within:text-brown-dark">
        <Input
          id="lastName"
          {...register('personalInfo.lastName')}
          className="h-10 w-full bg-transparent border-none rounded-none px-3 pt-2.5"
          placeholder="Прізвище"
        />
        {errors.personalInfo?.lastName && (
          <p className="text-sm text-red-500">{errors.personalInfo.lastName.message}</p>
        )}
      </div>

      <div className="w-full relative flex items-center gap-2 border-b-2 border-grey bg-transparent rounded-none focus-within:border-brown-dark focus-within:text-brown-dark">
        <Input
          {...register('personalInfo.fatherName')}
          placeholder="По-батькові"
          className="h-10 w-full bg-transparent border-none rounded-none px-3 pt-2.5"
        />
        {errors.personalInfo?.fatherName && (
          <p className="text-sm text-red-500">{errors.personalInfo.fatherName.message}</p>
        )}
      </div>

      <div className="w-full relative flex items-center gap-2 border-b-2 border-grey bg-transparent rounded-none focus-within:border-brown-dark focus-within:text-brown-dark">
        <Input
          id="phone"
          {...register('personalInfo.phone')}
          className="h-10 w-full bg-transparent border-none rounded-none px-3 pt-2.5"
          placeholder="Номер телефону"
        />
        {errors.personalInfo?.phone && (
          <p className="text-sm text-red-500">{errors.personalInfo.phone.message}</p>
        )}
      </div>

      <div className="w-full relative flex items-center gap-2 border-b-2 border-grey bg-transparent rounded-none focus-within:border-brown-dark focus-within:text-brown-dark">
        <Input
          id="email"
          {...register('personalInfo.email')}
          className="h-10 w-full bg-transparent border-none rounded-none px-3 pt-2.5"
          placeholder="Електронна пошта"
        />
        {errors.personalInfo?.email && (
          <p className="text-sm text-red-500">{errors.personalInfo.email.message}</p>
        )}
      </div>
    </fieldset>
  );
};
