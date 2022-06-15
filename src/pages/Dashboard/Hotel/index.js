import { getTicket } from '../../../hooks/api/useTicket';

import Title from '../../../components/Title';
import GreyText from '../../../components/GreyText';
import usePayment from '../../../hooks/api/usePayment';
import RoomSelectionOrSummary from './RoomSelectionOrSummary';
import Box from '../../../components/Box';

export default function Hotel() {
  const { ticket, getTicketLoading } = getTicket();
  const { payment } = usePayment();

  if (getTicketLoading) {
    return 'Carregando...';
  }

  return (
    <>
      <Title>Escolha de hotel e quarto</Title>
      <>
        {payment ? (
          ticket.Modality.name === 'Online' ? (
            <Box center={false}>
              <GreyText >
              Sua modalidade de ingresso não inclui hospedagem
                {<br></br>}
              Prossiga para a escolha de atividades
              </GreyText>
            </Box>
          ) : (
            <RoomSelectionOrSummary />
          )
        ) : (
          <Box center={false}>
            <GreyText width="200">
              Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem
            </GreyText>
          </Box>
        )}
      </>
    </>
  );
}
