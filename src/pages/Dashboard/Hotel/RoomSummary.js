import useUserRoom from '../../../hooks/api/useUserRoom';

import HotelCard from '../../../components/Hotel/HotelCard';
import GreyText from '../../../components/GreyText';
import HotelContainer from '../../../components/Hotel/HotelContainer';
import Button from '../../../components/Form/Button';
import { FormWrapper } from '../../../components/PersonalInformationForm/FormWrapper';
import styled from 'styled-components';

export default function RoomSummary({ changePage }) {
  const { userRoom, getUserRoomLoading } = useUserRoom();

  if (getUserRoomLoading) return (
    <GreyText>
      Carregando...
    </GreyText>
  );
  if (!userRoom) return (
    <GreyText>
      Reserva ainda não realizada. Que tal escolher um de nossos ótimos quartos?
    </GreyText>
  );

  const {
    name,
    hotel,
    roomType,
    occupation,
  } = userRoom;

  function makePeopleInRoomStr(occupation) {
    let outputStr = 'Você';
    if (occupation === 1) return outputStr;

    return `${outputStr} e mais ${occupation - 1}`;
  }

  function handleChangeRoom() {
    // Pode colocar as funcionalidades necessárias para troca de quarto nessa função
    changePage();
  }
  return (
    <>
      <GreyText width="400px" align="left">
        Você já escolheu seu quarto:
      </GreyText>

      <HotelContainer>
        <HotelCard selected={true} >
          <img src={hotel.image} alt="Hotel selecionado" />
          <h1>{hotel.name}</h1>

          <p>Quarto reservado:</p>
          <span>{name} ({roomType})</span>

          <p>Pessoas no seu quarto:</p>
          <span>{makePeopleInRoomStr(occupation)}</span>
        </HotelCard>
      </HotelContainer>

      <ButtonWrapper>
        <Button onClick={handleChangeRoom}>
          Trocar de Quarto
        </Button>
      </ButtonWrapper>
    </>
  );
}

const ButtonWrapper = styled(FormWrapper)`
  margin-top: 30px;
  
  > button {
    width: 196px;
  }
`;

