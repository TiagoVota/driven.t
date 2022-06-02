import { getTicket } from '../../../hooks/api/useTicket';

export default function Hotel() {
  const { ticket } = getTicket();
  console.log(ticket);
  return 'Hotel: Em breve!';
}
