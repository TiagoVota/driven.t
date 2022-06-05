import styled from 'styled-components';
import {
  FaCheckCircle,
} from 'react-icons/fa';

export default function SuccessPayment() {
  return (
    <Container>
      <FaCheckCircle size='45' color='#36B853' />

      <SuccessMessage>
        <strong>Pagamento confirmado!</strong><br />
        Prossiga para escolha de hospedagem e atividades
      </SuccessMessage>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  font-family: 'Roboto';
`;

const SuccessMessage = styled.p`
  margin-left: 14px;

  font-style: normal;
  font-size: 16px;
  line-height: 19px;

  color: #454545;
`;

