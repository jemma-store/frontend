import { RegisterForm } from '@/features/auth/RegisterForm';
import { useAuth } from '@/lib/hooks/useAuth';

export const AuthRegister = () => {
  const { registerFormValue, onRegisterFormSubmit, onRegisterFormChange } = useAuth();

  return (
    <div className="container mx-auto py-10 min-h-screen flex justify-center items-center">
      <RegisterForm
        initialValues={registerFormValue}
        onRegister={onRegisterFormSubmit}
        onChangeField={onRegisterFormChange}
      />
    </div>
  );
};
