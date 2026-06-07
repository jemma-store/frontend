import { Reducer, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppRoute, AuthAction } from '@/enums';
import { LoginRequest, RegisterRequest, VerifyRequest } from '@/types/auth';
import { login, registerUser, verifyPhoneLogin, verifyPhoneNumber } from '@/services/authService';
import { useModalStore } from '@/store/useModalStore';
import { useNotificationStore } from '@/store';
import { useAuthStore } from '@/store';

type Return = {
  loginFormValue: LoginRequest;
  registerFormValue: RegisterRequest;
  verifyCodeValue: VerifyRequest;
  onLoginFormSubmit: (loginFormValue: LoginRequest) => void;
  onLoginFormChange: (loginFormValue: LoginRequest) => void;
  onRegisterFormChange: (value: RegisterRequest) => void;
  onRegisterFormSubmit: (registerFormValue: RegisterRequest) => void;
  onVerifyPhoneCode: (code: VerifyRequest, payload : string | null) => void;
  onVerifyPhoneLogin: (code: VerifyRequest, payload : string | null) => void;
  onVerifyPhoneCodeChange: (code: VerifyRequest) => void;
};

type State = {
  loginFormValue: LoginRequest;
  registerFormValue: RegisterRequest;
  verifyCodeValue: VerifyRequest;
  token : string | null;
};

type ReducerAction =
  | {
    type: AuthAction.LOGIN_FORM;
    payload: LoginRequest;
  }
  | {
    type: AuthAction.REGISTER_FORM;
    payload: RegisterRequest;
  }
  | {
    type: AuthAction.VERIFY_CODE;
    payload: VerifyRequest;
  }
  | {
    type: AuthAction.RESET_FORM;
  }
  | {
    type: AuthAction.SET_SESSION_TOKEN;
    payload : string | null;
  }

const LOGIN_FORM_INITIAL_VALUE: LoginRequest = {
  email: '',
};

const VERIFY_CODE_INITIAL_VALUE: VerifyRequest = {
  code: '',
};

const REGISTER_FORM_INITIAL_VALUE: RegisterRequest = {
  name: '',
  email: '',
};

const INITIAL_STATE: State = {
  loginFormValue: LOGIN_FORM_INITIAL_VALUE,
  registerFormValue: REGISTER_FORM_INITIAL_VALUE,
  verifyCodeValue: VERIFY_CODE_INITIAL_VALUE,
  token : null,
};

const reducer: Reducer<State, ReducerAction> = (state, action) => {

  switch (action.type) {
    case AuthAction.LOGIN_FORM:
      return {
        ...state,
        loginFormValue: action.payload,
      };

    case AuthAction.VERIFY_CODE:
      return {
        ...state,
        verifyCodeValue: action.payload,
      };

    case AuthAction.SET_SESSION_TOKEN :
      return {
        ...state,
        token : action.payload,
      }

    case AuthAction.REGISTER_FORM:
      return {
        ...state,
        registerFormValue: action.payload,
      };

    case AuthAction.RESET_FORM:
      return {
        ...state,
        token : state.token,
        loginFormValue: LOGIN_FORM_INITIAL_VALUE,
        registerFormValue: REGISTER_FORM_INITIAL_VALUE,
        verifyCodeValue: VERIFY_CODE_INITIAL_VALUE,
      };

    default:
      console.error('Unknown action type');
      return state;
  }
};

const useAuth = (): Return => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const navigate = useNavigate();

  const onLoginFormChange = (newValue: LoginRequest) => {
    dispatch({ type: AuthAction.LOGIN_FORM, payload: newValue });
  };

  const onVerifyPhoneCodeChange = (code: VerifyRequest) => {
    dispatch({ type: AuthAction.VERIFY_CODE, payload: code })
  };
  
  const onRegisterFormChange = (newValue: RegisterRequest) => {
    dispatch({ type: AuthAction.REGISTER_FORM, payload: newValue });
  };
  
  const onVerifyPhoneCode = async (code: VerifyRequest, token : string | null) => {
    try{
    const res = await verifyPhoneNumber(code, token);

     if (res) {
      useModalStore.getState().close();
      useAuthStore.getState().setTokens(res.token, res.refresh_token);
      navigate(AppRoute.ROOT);
      }

    dispatch({ type: AuthAction.RESET_FORM })
    }catch (error) {
      const errorMessage = (error as Error).message;

      useNotificationStore.getState().setNotification(errorMessage, "error")
    }
  };

  const onVerifyPhoneLogin = async (code: VerifyRequest, token : string | null) => {

    try{
      const res = await verifyPhoneLogin(code, token);

    if (res) {
      useModalStore.getState().close();
      useAuthStore.getState().setTokens(res.token, res.refresh_token);
      navigate(AppRoute.ROOT);
      }

    dispatch({ type: AuthAction.RESET_FORM })
    
    }catch(error) {
      const errorMessage = (error as Error).message;
      useNotificationStore.getState().setNotification(errorMessage, "error")
    }
  };

  const onLoginFormSubmit = async (loginFormValue: LoginRequest) => {
    try{
      const res = await login(loginFormValue);
      if (res) {
        dispatch({
          type : AuthAction.SET_SESSION_TOKEN,
          payload : res.token,
        })
        useModalStore.getState().open('phoneVerification', res.token);
    }

    }catch(error) {
      const somethingErorr = (error as Error).message;
      useNotificationStore.getState().setNotification(somethingErorr, "error")
    }

  };

  const onRegisterFormSubmit = async (registerFormValue: RegisterRequest) => {
    try{
      const res = await registerUser(registerFormValue);

      if (res) {
        console.log(res)
        dispatch({
          type : AuthAction.SET_SESSION_TOKEN,
          payload : res.token,
        })
        useModalStore.getState().open('phoneVerification', res.token);
      }

      
    }catch(error) {
      const somethingError = (error as Error).message;
      useNotificationStore.getState().setNotification(somethingError, "error")
    }
  };

  return {
    loginFormValue: state.loginFormValue,
    registerFormValue: state.registerFormValue,
    verifyCodeValue: state.verifyCodeValue,
    onLoginFormSubmit,
    onLoginFormChange,
    onRegisterFormSubmit,
    onRegisterFormChange,
    onVerifyPhoneCode,
    onVerifyPhoneLogin,
    onVerifyPhoneCodeChange,
  };
};

export { useAuth };
