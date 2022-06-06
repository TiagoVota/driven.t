import useAsync from '../useAsync';
import useToken from '../useToken';

import * as paymentApi from '../../services/paymentApi';

export default function usePayment() {
  const token = useToken();

  const {
    data: payment,
    loading: findPaymentLoading,
    error: findPaymentError,
    act: findPayment,
  } = useAsync(() => paymentApi.findPayment(token));

  return {
    payment,
    findPaymentLoading,
    findPaymentError,
    findPayment,
  };
}

