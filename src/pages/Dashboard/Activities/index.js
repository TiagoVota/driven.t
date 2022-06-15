import Title from '../../../components/Title';
import GreyText from '../../../components/GreyText';
import Box from '../../../components/Box';

import { getTicket } from '../../../hooks/api/useTicket';
import usePayment from '../../../hooks/api/usePayment';

export default function Activities() {
  const { ticket, getTicketLoading } = getTicket();
  const { payment } = usePayment();

  if (getTicketLoading) {
    return 'Carregando...';
  }

  return (
    <>
      <Title>Escolha de atividades</Title>
      <>
        {payment ? (
          ticket.Modality.name === 'Online' ? (
            <Box center={false}>
              <GreyText width="true">
                Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades.
              </GreyText>
            </Box>
          ) : (
            'Aqui a função pra outra page de Activities'
          )
        ) : (
          <Box center={false}>
            <GreyText width="true">
              Você precisa ter confirmado pagamento antes de fazer a escolha de atividades
            </GreyText>
          </Box>
        )}
      </>
    </>
  );
}
