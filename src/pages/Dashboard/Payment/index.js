import PaymentScreen from './PaymentScreen';
import TicketScreen from './TicketScreen';
import { useState } from 'react';

export default function Payment() {
  const [ticketScreen, setTicketScreen] = useState(true);
  return <>{ticketScreen ? <TicketScreen changeScreen={setTicketScreen}  /> : <PaymentScreen/>}</>;
}
