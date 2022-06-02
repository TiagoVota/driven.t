import styled from 'styled-components';

const GreyText = styled.p`
  max-width: ${(props) => props.width ? '400px' : '100%'};

  font-family: Roboto;
  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: center;
  color: #8e8e8e;
`;

export default GreyText;
