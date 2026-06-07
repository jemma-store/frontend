import { LoginForm } from '@/features/auth/LoginForm';
import { useAuth } from '@/lib/hooks/useAuth';

export const AuthLogin = () => {
  const {
    loginFormValue,
    onLoginFormSubmit,
    onLoginFormChange,
  } = useAuth();

  return (
    <div className="container mx-auto py-10 min-h-screen flex justify-center items-center">
        <LoginForm initialValues={loginFormValue} onLogin={onLoginFormSubmit} onChangeField={onLoginFormChange} />
    </div>
  );
};
