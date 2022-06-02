import { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { getTicketPrice } from '../../../services/ticketApi';
import UserContext from '../../../contexts/UserContext';
import { toast } from 'react-toastify';
export default function PaymentScreen() {
  const { userData } = useContext(UserContext);
  const [ticket, setTicket] = useState();

  useEffect(() => {
    const userId = userData.user.id;
    const promise = getTicketPrice(userId);
    promise.then((response) => setTicket(response));
    promise.catch((error) => toast('Não foi possível selectionar o ticket!'));
  }, []);

  return (
    <>
      <StyledParagraph>Ingresso Escolhido</StyledParagraph>
      <SelectionContainer>
        <SelectDiv>
          <Modality>{ticket.name}</Modality>
          <Price>R$ {ticket.price}</Price>
        </SelectDiv>
      </SelectionContainer>
    </>
  );
}

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
  align-items: center;
  justify-content: center;
  max-width: 290px;

  gap: 24px;

  margin-bottom: 40px;
  border-radius: 20px;

  background-color: #ffeed2;
  border: hidden;
`;

const SelectDiv = styled.div`
  max-width: 290px;
  height: 145px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border: 0px;
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
