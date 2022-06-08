import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketApi from '../../services/ticketApi';

export default function useTicket() {
  const {
    loading: createTicketLoading,
    error: createTicketError,
    act: createTicket,
  } = useAsync(ticketApi.createTicket, false);

  return {
    createTicketError,
    createTicketLoading,
    createTicket,
  };
}

export function getTicket() {
  const token = useToken();

  const {
    data: ticket,
    loading: getTicketLoading,
    error: getTicketError,
    act: getTicket,
  } = useAsync(() => ticketApi.getTicket(token));

  return {
    ticket,
    getTicketError,
    getTicketLoading,
    getTicket,
  };
}
