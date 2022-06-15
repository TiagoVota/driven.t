import Title from '../../../components/Title';
import GreyText from '../../../components/GreyText';
import Box from '../../../components/Box';

import { getTicket } from '../../../hooks/api/useTicket';
import usePayment from '../../../hooks/api/usePayment';
import DaySelectionContainer from '../../../components/Activities/DaySelectionContainer';
import DaySelectionButton from '../../../components/Activities/DaySelectionButton';
import { getEventDays } from '../../../services/eventDayApi';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useToken from '../../../hooks/useToken';

export default function Activities() {
  const { ticket, getTicketLoading } = getTicket();
  const { payment } = usePayment();
  const token = useToken();
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(0);

  useEffect(() => {
    const promise = getEventDays(token);
    promise.then((eventDaysData) => setDays(eventDaysData));
    promise.catch((error) => toast('Não foi possível encontrar os dias dos eventos'));
  }, []);

  console.log(selectedDay);
  function handleDaySelection(dayId) {
    if (selectedDay === dayId) {
      return;
    }
    setSelectedDay(dayId);
  }

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
            <>
              <GreyText align="left">Primeiro, filtre pelo dia do evento: </GreyText>
              <DaySelectionContainer>
                {days.map((day) => (
                  <DaySelectionButton
                    selected={selectedDay === day.id}
                    key={day.id}
                    onClick={(e) => setSelectedDay(day.id)}
                  >
                    {day.day}
                  </DaySelectionButton>
                ))}
              </DaySelectionContainer>
            </>
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
