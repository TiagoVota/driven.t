import { FormWrapper } from '../../../components/PersonalInformationForm/FormWrapper';
import Button from '../../../components/Form/Button.js';
import styled from 'styled-components';
import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { createTicket } from '../../../services/ticketApi';
import UserContext from '../../../contexts/UserContext';

export default function TicketScreen(props) {
  const { userData } = useContext(UserContext);
  const [totalPrice, setTotalPrice] = useState(0);

  const [allModalitiesSelected, setAllModalitiesSelected] = useState(false);
  //   setAllModalitiesSelected DEVE VIRAR true QUANDO O USER ESCOLHER AS OPCOES DO TICKET

  // A SOMA DOS VALORES DO TICKET DEVE MUDAR CONFORME A SELECAO DO USER
  function sumModalities(ticketPrice, hotelPrice) {
    setTotalPrice(ticketPrice + hotelPrice);
  }

  async function handleTicketReservation(event) {
    event.preventDefault();
    try {
      const modalityId = 3;
      // MODALITY ID DEVE MUDAR CONFORME A SELECAO DO USER, AI ESTA CHUMBADO P/ TESTE
      const userId = userData.user.id;
      await createTicket({ modalityId, userId });
      toast('Ticket reservado com sucesso!');
      props.changeScreen(false);
    } catch (err) {
      toast('Não foi possível criar o ticket!');
    }
  }

  return (
    <FormWrapper>
      <SubmitContainer>
        {allModalitiesSelected && (
          <>
            <StyledParagraph> Fechado! O total ficou em R$ {totalPrice}. Agora é só confirmar:</StyledParagraph>
            <Button onClick={handleTicketReservation}>Reservar Ingresso</Button>
          </>
        )}
      </SubmitContainer>
    </FormWrapper>
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
