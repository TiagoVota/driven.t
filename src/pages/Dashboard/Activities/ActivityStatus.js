import {
  IoLogInOutline,
  IoCloseCircleOutline,
  IoCheckmarkCircleOutline,
} from 'react-icons/io5';

import styled from 'styled-components';

export default function ActivityStatus({ isSelected, vacancy }) {
  if (isSelected) {
    return (
      <Container color={'green'} isSelected >
        <IoCheckmarkCircleOutline />
        <Status>
          Inscrito
        </Status>
      </Container>
    );
  }

  return (<>
    {vacancy <= 0 ? (
      <Container color={'red'} >
        <IoCloseCircleOutline />
        <Status>
          Esgotado
        </Status>
      </Container>
    ) : (
      <Container color={'green'} >
        <IoLogInOutline />
        <Status>
          {vacancy === 1
            ? 'Última vaga!'
            : `${vacancy.toString().padStart(2, '0')} vagas`
          }
        </Status>
      </Container>
    )}
  </>);
}

const Container = styled.div`
  width: 64px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-left: 1px solid ${p => p.isSelected ? '#99E8A1' : '#CFCFCF'};
  > svg {
    font-size: 20px;
    color: ${p => (p.color === 'green') ? '#078632' : '#CC6666'};

    margin-right: 5px;
  }

  > p {
    color: ${p => (p.color === 'green') ? '#078632' : '#CC6666'};
  }
`;

const Status = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 9px;
  margin-top: 3px;
`;
