import { Reducer, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserStore } from '@/store';
import { localStorageService } from '@/api';
import { createOrderGuestService, createOrderService } from '@/services';
import { 
  IPersonalInfo, 
  IPaymentInfo, 
  IDeliveryInfo, 
} from '@/types/';
import { IOrderRequest, IOrderCreationDTO } from '@/types/order';
import { AppRoute, DeliveryMethod, LocalStorage, OrderAction, OrderStage, PaymentMethod } from '@/enums';
import { useSmartCart } from './useSmartCart';
import { IOrderCreationResponse } from '@/types/orderDetails';

type Return = {
  orderProcessStage: OrderStage;
  contactsFormValue: IPersonalInfo;
  deliveryFormValue: IDeliveryInfo;
  paymentFormValue: IPaymentInfo;
  onContactsFormSubmit: (contactsFormValue: IPersonalInfo) => void;
  onDeliveryFormSubmit: (deliveryFormValue: IDeliveryInfo) => void;
  onPaymentFormSubmit: (paymentFormValue: IPaymentInfo) => void;
  onResetOrderProcess: () => void;
  onOrderConfirmed: () => void;
  isOrderReady: boolean;
};

type State = {
  contactsFormValue: IPersonalInfo;
  deliveryFormValue: IDeliveryInfo;
  paymentFormValue: IPaymentInfo;
  orderProcessStage: OrderStage;
  isOrderReady: boolean;
  orderId?: number;
};

type ReducerAction =
  | { type: OrderAction.SUBMIT_CONTACT_FORM; payload: IPersonalInfo }
  | { type: OrderAction.SUBMIT_DELIVERY_FORM; payload: IDeliveryInfo }
  | { type: OrderAction.SUBMIT_PAYMENT_FORM; payload: IPaymentInfo }
  | { type: OrderAction.RESET_ORDER_PROCESS }
  | { type: OrderAction.ORDER_READY }
  | { type: OrderAction.CONFIRM_ORDER; payload: { orderId: number } }
  | { type: OrderAction.EDIT_FORM; payload: OrderStage };

const CONTACTS_INITIAL_VALUE = {
  firstName: '',
  lastName: '',
  fatherName: '',
  phone: '',
  email: '',
  isGift: false,
};

const DELIVERY_INITIAL_VALUE = {
  city: '',
  method: DeliveryMethod.COURIER,
};

const PAYMENT_INITIAL_VALUE = {
  method: PaymentMethod.CARD,
};

const INITIAL_STATE: State = {
  contactsFormValue: CONTACTS_INITIAL_VALUE,
  deliveryFormValue: DELIVERY_INITIAL_VALUE,
  paymentFormValue: PAYMENT_INITIAL_VALUE,
  orderProcessStage: OrderStage.CONTACTS,
  isOrderReady: false,
};

const reducer: Reducer<State, ReducerAction> = (state, action) => {
  switch (action.type) {
    case OrderAction.SUBMIT_CONTACT_FORM:
      return { ...state, contactsFormValue: action.payload, orderProcessStage: OrderStage.DELIVERY };
    case OrderAction.SUBMIT_DELIVERY_FORM:
      return { ...state, deliveryFormValue: action.payload, orderProcessStage: OrderStage.PAYMENT };
    case OrderAction.SUBMIT_PAYMENT_FORM:
      return { ...state, paymentFormValue: action.payload, orderProcessStage: OrderStage.DONE, isOrderReady: true };
    case OrderAction.RESET_ORDER_PROCESS:
      return INITIAL_STATE;
    case OrderAction.CONFIRM_ORDER:
      return { ...state, orderId: action.payload.orderId };
    default:
      return state;
  }
};

const useCheckout = (): Return => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const navigate = useNavigate();
  const { cartItems, clearCart } = useSmartCart(); 
  const currentUser = useUserStore((state) => state.currentUser);
  const sessionId = localStorageService.getItem(LocalStorage.SESSION_ID);

  const onContactsFormSubmit = (contactsFormValue: IPersonalInfo) =>
    dispatch({ type: OrderAction.SUBMIT_CONTACT_FORM, payload: contactsFormValue });

  const onDeliveryFormSubmit = (deliveryFormValue: IDeliveryInfo) =>
    dispatch({ type: OrderAction.SUBMIT_DELIVERY_FORM, payload: deliveryFormValue });

  const onPaymentFormSubmit = (paymentFormValue: IPaymentInfo) =>
    dispatch({ type: OrderAction.SUBMIT_PAYMENT_FORM, payload: paymentFormValue });

  const onOrderConfirmed = async () => {
    const { contactsFormValue, deliveryFormValue, paymentFormValue } = state;

    const items = cartItems.map((item) => ({
      id: 0,
      cartId: 0,
      productId: Number(item.productId),
      quantity: item.quantity,
    }));

    const orderCreationDTO: IOrderCreationDTO = {
      firstName: contactsFormValue.firstName,
      lastName: contactsFormValue.lastName,
      fatherName: contactsFormValue.fatherName,
      phone: contactsFormValue.phone,
      email: contactsFormValue.email,
      city: deliveryFormValue.city,
      isGift: contactsFormValue.isGift,
    };

    try {
      let result : IOrderCreationResponse | undefined; 

      if (currentUser?.id) {
        const userCart = { id: currentUser.id, userId: currentUser.id, items };
        result = await createOrderService(
          userCart,
          orderCreationDTO,
          paymentFormValue.method,
          deliveryFormValue.method
        );
      } else if (sessionId) {
        const guestOrderRequest: IOrderRequest = {
          userCart: { id: 0, userId: 0, items },
          orderCreationDTO,
        };
        result = await createOrderGuestService(
          guestOrderRequest,
          sessionId,
          paymentFormValue.method,
          deliveryFormValue.method
        );
      }

      console.log("📦 Що лежить у змінній result:", result?.order?.orderNumber);
      
      if (result && result.order) {
        dispatch({ type: OrderAction.CONFIRM_ORDER, payload: { orderId: result.order.id } });
        clearCart(); 

        if (result.payment && result.payment.data && result.payment.signature) {
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = result.payment.checkoutUrl;

            const dataInput = document.createElement('input');
            dataInput.type = 'hidden';
            dataInput.name = 'data';
            dataInput.value = result.payment.data;

            const signatureInput = document.createElement('input');
            signatureInput.type = 'hidden';
            signatureInput.name = 'signature';
            signatureInput.value = result.payment.signature;

            form.appendChild(dataInput);
            form.appendChild(signatureInput);
            document.body.appendChild(form);

            form.submit(); 
        } else {
            navigate(AppRoute.PRODUCTS);
        }
      }
    } catch (err) {
      console.error('Помилка при створенні замовлення:', err);
    }
    dispatch({ type: OrderAction.RESET_ORDER_PROCESS });
  };

  const onResetOrderProcess = () => dispatch({ type: OrderAction.RESET_ORDER_PROCESS });

  return {
    onResetOrderProcess,
    onContactsFormSubmit,
    onDeliveryFormSubmit,
    onPaymentFormSubmit,
    onOrderConfirmed,
    orderProcessStage: state.orderProcessStage,
    contactsFormValue: state.contactsFormValue,
    deliveryFormValue: state.deliveryFormValue,
    paymentFormValue: state.paymentFormValue,
    isOrderReady: state.isOrderReady,
  };
};

export { useCheckout };