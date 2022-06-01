import styled from 'styled-components';

const Box = styled.section`
  height: 100%;
  max-height: ${(props) => props.height || '500px'};

  width: 100%;
  max-width: ${(props) => props.width || '1200px'};

  overflow: hidden;

  display: flex;
  justify-content: ${(props) => props.center || 'center'};
  align-items: ${(props) => props.center || 'center'};

  @media (max-width: 600px) {
    border-radius: 0;
    min-height: 100vh;
    height: auto;
    max-height: initial;
    min-width: 100%;
    max-width: initial;
  }
`;

export default Box; 
