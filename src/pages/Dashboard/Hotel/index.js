import { getTicket } from '../../../hooks/api/useTicket';

import Title from '../../../components/Title';
import Box from '../../../components/Box';
import GreyText from '../../../components/GreyText';
import usePayment from '../../../hooks/api/usePayment';
import { useEffect, useState } from 'react';
import RoomSelectionOrSummary from './RoomSelectionOrSummary';

export default function Hotel() {
  const { ticket, getTicketLoading } = getTicket();
  const { payment } = usePayment();
  const [modality, setModality] = useState(null);
  
  useEffect(() => {
    if(!getTicketLoading) setModality(ticket.Modality.name);
  }, []);
  
  if (getTicketLoading) {
    return 'Loading...';
  }

  return (
    <>
      <Title>Escolha de hotel e quarto</Title>
      <Box >
        {payment ? (
          modality === 'Online' ? (
            <GreyText width="200">
              Sua modalidade de ingresso não inclui hospedagem
              {<br></br>}
              Prossiga para a escolha de atividades
            </GreyText>
          ) : <RoomSelectionOrSummary />
        ) : (
          <GreyText width="200">Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</GreyText>
        )}
      </Box>
    </>
  );
}
