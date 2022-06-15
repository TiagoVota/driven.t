import PaymentScreen from './PaymentScreen';
import TicketScreen from './TicketScreen';
import { useState } from 'react';
import Title from '../../../components/Title';
import useEnrollment from '../../../hooks/api/useEnrollment';
import Box from '../../../components/Box';
import GreyText from '../../../components/GreyText';

export default function Payment() {
  const { enrollment } = useEnrollment();
  const [ticketScreen, setTicketScreen] = useState(true);

  return (
    <>
      <Title>Ingresso e pagamento</Title>
      <Box center={enrollment}>
        {enrollment ? (
          ticketScreen ? (
            <TicketScreen changeScreen={setTicketScreen} />
          ) : (
            <PaymentScreen />
          )
        ) : (
          <GreyText width="true">
            Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso
          </GreyText>
        )}
      </Box>
    </>
  );
}
