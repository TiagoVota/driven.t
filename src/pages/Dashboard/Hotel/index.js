import { getTicket } from '../../../hooks/api/useTicket';
import Title from '../../../components/Title';
import Box from '../../../components/Box';
import GreyText from '../../../components/GreyText';

export default function Hotel() {
  const { ticket, getTicketError } = getTicket();
  console.log(getTicketError);
  return (
    <>
      <Title>Escolha de hotel e quarto</Title>
      {/* <Box center={enrollment}>
        { ticket.
        : (
          <GreyText width="200">
            Sua modalidade de ingresso não inclui hospedagem Prossiga para a escolha de atividades
          </GreyText>
        )}
      </Box> */}
    </>
  );
}
