import { FormWrapper } from '../../../components/PersonalInformationForm/FormWrapper';
import Button from '../../../components/Form/Button.js';
import styled from 'styled-components';
import { BsPerson, BsPersonFill } from 'react-icons/bs';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function Rooms({ roomsArray, setRoomsArray, changePage }) {
  const [selectedRoom, setSelectedRoom] = useState(null);

  function handleReservation() {
    if (selectedRoom === null) return toast('Selecione um quarto!');

    changePage(false);
  }

  function roomSelection(room) {
    if (room.availableSlots === 0) return;

    setRoomsArray(() => {
      for (let i = 0; i < roomsArray.length; i++) {
        if (roomsArray[i].id === room.id) {
          roomsArray[i].isSelected = true;
        } else {
          roomsArray[i].isSelected = false;
        }
      }
      return [...roomsArray];
    });

    setSelectedRoom(room.id);
  }

  if (!roomsArray) {
    return 'Carregando...';
  }

  return (
    <Container>
      {roomsArray.length === 0 ? (
        <StyledParagraph>Não temos quartos disponíveis nesse hotel</StyledParagraph>
      ) : (
        <>
          <StyledParagraph>Ótima pedida! Agora escolha seu quarto:</StyledParagraph>
          <RoomsContainer>
            {roomsArray.map((room) => {
              return (
                <Room
                  key={room.id}
                  onClick={() => roomSelection(room)}
                  isSelected={room.isSelected}
                  isFull={room.availableSlots === 0}
                >
                  <Name isFull={room.availableSlots === 0}>{room.name}</Name>
                  <Capacity isFull={room.availableSlots === 0} isSelected={room.isSelected}>
                    {room.isSelected ? (
                      <>
                        {Array.from({ length: room.availableSlots - 1 }, (v, k) => k).map((number) => {
                          return <BsPerson key={number} />;
                        })}
                        <BsPersonFill className="icon-selected" />
                        {Array.from({ length: room.capacity - room.availableSlots }, (v, k) => k).map((number) => {
                          return <BsPersonFill key={number} />;
                        })}
                      </>
                    ) : (
                      <>
                        {Array.from({ length: room.availableSlots }, (v, k) => k).map((number) => {
                          return <BsPerson key={number} />;
                        })}
                        {Array.from({ length: room.capacity - room.availableSlots }, (v, k) => k).map((number) => {
                          return <BsPersonFill key={number} />;
                        })}
                      </>
                    )}
                  </Capacity>
                </Room>
              );
            })}
          </RoomsContainer>
          <FormWrapper>
            <Button onClick={() => handleReservation()}>Reservar Quarto</Button>
          </FormWrapper>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  align-self: flex-start;

  padding: 50px 0;
`;

const StyledParagraph = styled.p`
  width: 100%;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;

  color: #8e8e8e;

  margin-bottom: 30px;
`;

const RoomsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 15px;
  grid-row-gap: 10px;

  margin-bottom: 37px;
`;

const Room = styled.div`
  width: 190px;
  height: 45px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 10px 0 15px;

  border: 1px solid #cecece;
  border-radius: 10px;
  position: relative;

  background: ${(props) => (props.isFull ? '#E9E9E9' : props.isSelected ? '#ffeed2' : '')};

  cursor: pointer;
`;

const Name = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  text-align: center;

  color: ${(props) => (props.isFull ? '#9D9D9D' : '#454545')};
`;

const Capacity = styled.div`
  font-size: 27px;

  display: flex;
  align-items: center;

  color: ${(props) => (props.isFull ? '#8C8C8C' : '#000000')};

  .icon-selected {
    color: #ff4791;
  }
`;
