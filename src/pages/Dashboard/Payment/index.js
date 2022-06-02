import PaymentScreen from './PaymentScreen';
import TicketScreen from './TicketScreen';
import { useState } from 'react';

export default function Payment() {
  const [ticketScreen, setTicketScreen] = useState(false);
  return <>{ticketScreen ? <TicketScreen changeScreen={setTicketScreen}  /> : <PaymentScreen/>}</>;
}
