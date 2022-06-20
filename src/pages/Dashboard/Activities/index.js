import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import usePayment from '../../../hooks/api/usePayment';
import useToken from '../../../hooks/useToken';
import useRegisterActivity from '../../../hooks/api/useRegisterActivity';
import { getTicket } from '../../../hooks/api/useTicket';

import { getEventDays } from '../../../services/eventDayApi';

import Locations from './Locations';

import DaySelectionContainer from '../../../components/Activities/DaySelectionContainer';
import DaySelectionButton from '../../../components/Activities/DaySelectionButton';
import Title from '../../../components/Title';
import GreyText from '../../../components/GreyText';
import Box from '../../../components/Box';

export default function Activities() {
  const { ticket, getTicketLoading } = getTicket();
  const { payment } = usePayment();
  const token = useToken();
  const [days, setDays] = useState([]);
  const [userActivities, setUserActivities] = useState([]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [locations, setLocations] = useState();
  const {
    registerActivityLoading,
    registerActivity,
  } = useRegisterActivity();

  useEffect(() => {
    const promise = getEventDays(token);
    promise.then((eventDaysData) => {
      setDays(eventDaysData.days);
      setUserActivities(eventDaysData.userActivityIds);
    });
    promise.catch((error) => toast('Não foi possível encontrar as informações do evento'));
  }, []);

  async function handleActivityClick(activity) {
    if (registerActivityLoading) return;

    if (activity.capacity <= activity.occupation) return;

    if (isSelectedActivity(activity.id)) return;

    addUserActivity(activity.id);
    try {
      await registerActivity(activity.id);
    } catch (err) {
      removeUserActivity(activity.id);

      handleFailRegister(err.response.status);
    }
  }

  function addUserActivity(activityId) {
    setUserActivities([ ...userActivities, activityId]);
  }

  function removeUserActivity(activityId) {
    const withoutIdList = userActivities.filter(id => id !== activityId);

    setUserActivities(withoutIdList);
  }

  function isSelectedActivity(activityId) {
    return userActivities.includes(activityId);
  }

  function handleFailRegister(status) {
    const msgStatus = {
      401: 'Não autorizado, tente fazer login novamente!',
      409: 'Horário ou atividade já selecionada!',
      500: 'Erro com nosso servidor, tente novamente mais tarde, por favor 🥺'
    };

    const msgToSend = msgStatus[status] || 'Problema com o servidor 🥺';

    toast.error(msgToSend);
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
              {!selectedDay && <GreyText align="left">Primeiro, filtre pelo dia do evento: </GreyText>}
              <DaySelectionContainer>
                {days.map((day) => (
                  <DaySelectionButton
                    selected={selectedDay === day.id}
                    key={day.id}
                    onClick={(e) => {
                      setSelectedDay(day.id);
                      setLocations(day.location);
                    }}
                  >
                    {day.day}
                  </DaySelectionButton>
                ))}
              </DaySelectionContainer>
              <Locations
                locations={locations}
                handleActivityClick={handleActivityClick}
                isSelectedActivity={isSelectedActivity}
              />
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
