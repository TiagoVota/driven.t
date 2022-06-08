import styled from 'styled-components';

const HotelCard = styled.div`
  height: 264px;
  width: 196px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 14px;
  background-color: ${(props) => (props.selected ? '#FFEED2' : '#f1f1f1')};

  img {
    width: 168px;
    height: 109px;
    border-radius: 5px;
    margin-bottom: 10px;
  }

  h1 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #343434;
    margin-bottom: 10px;
  }
  p {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
    color: #3c3c3c;
    margin-bottom: 2px;
  }

  span {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #3c3c3c;
    margin-bottom: 14px;
  }
`;

export default HotelCard;
