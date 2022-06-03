import useAsync from '../useAsync';

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
