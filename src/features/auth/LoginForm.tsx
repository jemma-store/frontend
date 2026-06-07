import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import cn from 'classnames';

import { ApiEndpoint, AppRoute } from '@/enums';
import { LoginRequest } from '@/types/';
import { loginSchema } from '@/schemas/authSchema';
import { AppleIcon, GoogleIcon, MailIcon, X } from '@/assets';
import { Button, Card, CardContent, Input } from '@/components/ui';

interface LoginFormProps {
  initialValues: LoginRequest;
  onLogin: (data: LoginRequest) => void;
  onChangeField: (value: LoginRequest) => void;
}

export const LoginForm: FC<LoginFormProps> = ({ initialValues, onLogin, onChangeField }) => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
    defaultValues: initialValues,
  });

  return (
    <Card className="w-[448px] bg-main relative">
      <CardContent className="p-8 flex flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-7 w-full">
          <h2 className="text-second  font-[500] font-main">Увійти в акаунт</h2>

          <form
            className="flex flex-col items-center gap-7 w-full"
            onSubmit={handleSubmit(onLogin)}
          >
            <div className="w-full">
              <div
                className={cn(
                  'flex items-center gap-2 border-0 border-b-2 bg-transparent rounded-none focus-within:border-brown-dark focus-within:text-brown-dark',
                  errors.email ? 'border-error text-error' : 'border-grey text-grey',
                )}
              >
                <MailIcon classname="w-5 h-5 text-inherit" />
                <Input
                  {...register('email')}
                  name="email"
                  placeholder="Ваша електронна пошта"
                  className="w-full h-10 !bg-transparent border-none"
                  type="email"
                  onChange={(e) => {
                    setValue('email', e.target.value);
                    onChangeField({ ...initialValues, email: e.target.value });
                  }}
                />
              </div>

              {errors.email && (
                <p className="text-error text-xs text-center mt-1">{errors.email.message} </p>
              )}
            </div>

            <Button className="w-full">Увійти</Button>
          </form>

          <div className="flex flex-col items-center gap-5 w-full">
            <p className="text-grey">або продовжити з</p>

            <form className="flex w-full items-center justify-between">
              <Button variant="secondary" asChild>
                <Link to={ApiEndpoint.GOOGLE} className="text-black">
                  <GoogleIcon />
                  Google
                </Link>
              </Button>

              <Button variant="secondary" className="bg-black text-white" asChild>
                <Link to={ApiEndpoint.APPLE} className="text-black">
                  <AppleIcon />
                  Apple
                </Link>
              </Button>
            </form>
          </div>
        </div>

        <div className="flex flex-col w-full items-center gap-5">
          <p className="text-grey">Немає акаунта?</p>

          <Button asChild variant="outline" className="w-full">
            <Link to={AppRoute.SIGN_UP}>Зареєструватися</Link>
          </Button>
        </div>
      </CardContent>

      <Button
        variant="ghost"
        className="absolute right-5 top-5 h-5 w-5 p-0 text-grey hover:text-accent transition-text duration-300"
        aria-label="Close"
        asChild
      >
        <Link to={AppRoute.ROOT}>
          <X classname="h-5 w-5" />
        </Link>
      </Button>
    </Card>
  );
};
