import styled from 'styled-components';

const HotelStyle = styled.article`
  background-color: ${(props) => (props.selected ? '#FFEED2' : '#F1F1F1')};
  height: 264px;
  width: 196px;
  border-radius: 10px;
  margin: 18px 0 36px 0;
  padding-left: 14px;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  font-family: Roboto;
  font-style: normal;
  font-size: 20px;
  line-height: 23px;
  font-weight: 400;
  line-height: 14px;

  div {
    display: flex;
    flex-direction: column;
  }

  img {
    height: 109px;
    width: 168px;
    border-radius: 5px;
  }

  strong {
    font-weight: 700;
    font-size: 12px;
  }

  span {
    font-size: 12px;
  }
`;

export default HotelStyle;
