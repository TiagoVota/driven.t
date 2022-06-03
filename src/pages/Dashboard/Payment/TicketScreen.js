import { FormWrapper } from '../../../components/PersonalInformationForm/FormWrapper';
import Button from '../../../components/Form/Button.js';
import styled from 'styled-components';
import { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { createTicket, getTicketByUser } from '../../../services/ticketApi';
import { getModalities } from '../../../services/modalityApi';
import UserContext from '../../../contexts/UserContext';

export default function TicketScreen(props) {
  const { userData } = useContext(UserContext);

  const [modalityPrice, setModalityPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [modalitiesArray, setModalitiesArray] = useState([]);
  const [hotelOptionsArray, setHotelOptionsArray] = useState([]);

  const [firstModalitySelected, setFirstModalitySelected] = useState(false);
  const [allModalitiesSelected, setAllModalitiesSelected] = useState(false);

  const [modalityId, setModalityId] = useState(0);

  useEffect(() => {
    async function checkIfUserHasATicket() {
      try {
        const status = await getTicketByUser(userData.user.id);
        if (status === 200) props.changeScreen(false);
      } catch (err) {
        console.log(err);
      }
    }

    async function fillModalitiesArray() {
      try {
        const response = await getModalities();
        setModalitiesArray(addIsSelectedKey(response));
      } catch (err) {
        toast('Erro ao carregar opções de pagamento');
      }
    }

    checkIfUserHasATicket();
    fillModalitiesArray();
  }, []);

  function sumModalities(ticketPrice, hotelPrice) {
    setTotalPrice(ticketPrice + hotelPrice);
  }

  function handleFirstSelection(modality) {
    resetClicks();
    modalitySelection(modality);

    if (modality.hotelOptionId === null) {
      setModalityId(modality.id);
      setAllModalitiesSelected(true);
      setTotalPrice(modality.price);
      return;
    }

    setHotelOptionsArray(addIsSelectedKey(modality.hotelOptions));
    setModalityPrice(modality.price);
    setFirstModalitySelected(true);
  }

  function handleSecondSelection(hotelOption) {
    hotelSelection(hotelOption);

    setModalityId(hotelOption.id);
    sumModalities(modalityPrice, hotelOption.price);
    setAllModalitiesSelected(true);
  }

  function resetClicks() {
    setModalityId(0);
    setAllModalitiesSelected(false);
    setTotalPrice(0);
    setModalityPrice(0);
    setHotelOptionsArray();
    setFirstModalitySelected(false);
  }

  function modalitySelection(modality) {
    setModalitiesArray(() => {
      for (let i = 0; i < modalitiesArray.length; i++) {
        if (modalitiesArray[i].name === modality.name) {
          modalitiesArray[i].isSelected = true;
        } else {
          modalitiesArray[i].isSelected = false;
        }
      }
      return [...modalitiesArray];
    });
  }

  function hotelSelection(hotelOption) {
    setHotelOptionsArray(() => {
      for (let i = 0; i < hotelOptionsArray.length; i++) {
        if (hotelOptionsArray[i].id === hotelOption.id) {
          hotelOptionsArray[i].isSelected = true;
        } else {
          hotelOptionsArray[i].isSelected = false;
        }
      }
      return [...hotelOptionsArray];
    });
  }

  function addIsSelectedKey(array) {
    return array.map((obj) => ({ ...obj, isSelected: false }));
  }

  async function handleTicketReservation(event) {
    event.preventDefault();
    try {
      const userId = userData.user.id;
      await createTicket({ modalityId, userId });
      toast('Ticket reservado com sucesso!');
      props.changeScreen(false);
    } catch (err) {
      toast('Não foi possível criar o ticket!');
    }
  }

  if (modalitiesArray.length === 0) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <StyledParagraph>Primeiro, escolha sua modalidade de ingresso</StyledParagraph>

      <SelectionContainer>
        {modalitiesArray.map((modality) => {
          return (
            <SelectDiv
              key={modality.name}
              className={modality.isSelected ? 'selected' : ''}
              onClick={() => handleFirstSelection(modality)}
            >
              <Modality>{modality.name}</Modality>
              <Price>{`R$ ${modality.price / 100}`}</Price>
            </SelectDiv>
          );
        })}
      </SelectionContainer>

      {firstModalitySelected && (
        <>
          <StyledParagraph>Ótimo! Agora escolha sua modalidade de hospedagem</StyledParagraph>
          <SelectionContainer>
            {hotelOptionsArray.map((option) => {
              return (
                <SelectDiv
                  key={option.id}
                  className={option.isSelected ? 'selected' : ''}
                  onClick={() => handleSecondSelection(option)}
                >
                  <Modality>{option.isWanted ? 'Com Hotel' : 'Sem Hotel'}</Modality>
                  <Price>{`+ R$ ${option.price / 100}`}</Price>
                </SelectDiv>
              );
            })}
          </SelectionContainer>
        </>
      )}

      <FormWrapper>
        <SubmitContainer>
          {allModalitiesSelected && (
            <>
              <StyledParagraph> Fechado! O total ficou em R$ {totalPrice / 100}. Agora é só confirmar:</StyledParagraph>
              <Button onClick={handleTicketReservation}>Reservar Ingresso</Button>
            </>
          )}
        </SubmitContainer>
      </FormWrapper>
    </>
  );
}

const SubmitContainer = styled.div`
  margin-top: 40px !important;
  width: 100% !important;

  > button {
    margin-top: 0 !important;
  }
`;

const StyledParagraph = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  margin-bottom: 17px;

  color: #8e8e8e;
`;

const SelectionContainer = styled.div`
  display: flex;

  gap: 24px;

  margin-bottom: 40px;

  :last-of-type {
    margin-bottom: 0;
  }

  .selected {
    background-color: #ffeed2;
    border: hidden;
  }
`;

const SelectDiv = styled.div`
  width: 145px;
  height: 145px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border: 1px solid #cecece;
  border-radius: 20px;

  cursor: pointer;
`;

const Modality = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #454545;
`;

const Price = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #898989;
`;
