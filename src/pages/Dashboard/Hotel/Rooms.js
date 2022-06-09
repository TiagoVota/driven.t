import styled from 'styled-components';
import { BsPerson, BsPersonFill } from 'react-icons/bs';

export default function Rooms() {
  const roomsArray = [
    {
      id: 17,
      name: '100',
      hotelId: 19,
      capacity: 3,
      availableSlots: 2,
    },
    {
      id: 18,
      name: '101',
      hotelId: 19,
      capacity: 1,
      availableSlots: 1,
    },
    {
      id: 19,
      name: '102',
      hotelId: 19,
      capacity: 1,
      availableSlots: 1,
    },
    {
      id: 20,
      name: '103',
      hotelId: 19,
      capacity: 1,
      availableSlots: 1,
    },
    {
      id: 21,
      name: '104',
      hotelId: 19,
      capacity: 2,
      availableSlots: 2,
    },
    {
      id: 22,
      name: '105',
      hotelId: 19,
      capacity: 1,
      availableSlots: 1,
    },
    {
      id: 23,
      name: '106',
      hotelId: 19,
      capacity: 3,
      availableSlots: 3,
    },
    {
      id: 24,
      name: '107',
      hotelId: 19,
      capacity: 3,
      availableSlots: 3,
    },
    {
      id: 25,
      name: '108',
      hotelId: 19,
      capacity: 1,
      availableSlots: 1,
    },
    {
      id: 26,
      name: '109',
      hotelId: 19,
      capacity: 2,
      availableSlots: 2,
    },
    {
      id: 27,
      name: '110',
      hotelId: 19,
      capacity: 2,
      availableSlots: 2,
    },
    {
      id: 28,
      name: '111',
      hotelId: 19,
      capacity: 2,
      availableSlots: 2,
    },
    {
      id: 29,
      name: '112',
      hotelId: 19,
      capacity: 2,
      availableSlots: 2,
    },
    {
      id: 30,
      name: '113',
      hotelId: 19,
      capacity: 2,
      availableSlots: 2,
    },
    {
      id: 31,
      name: '114',
      hotelId: 19,
      capacity: 3,
      availableSlots: 3,
    },
    {
      id: 32,
      name: '115',
      hotelId: 19,
      capacity: 2,
      availableSlots: 2,
    },
  ];

  return (
    <RoomsContainer className="teste">
      {roomsArray.map((room) => {
        return (
          <Room key={room.id}>
            <Name>{room.name}</Name>
            <Capacity>
              {Array.from({ length: room.capacity }).map((item) => {
                return <BsPerson />;
              })}
            </Capacity>
          </Room>
        );
      })}
    </RoomsContainer>
  );
}

const RoomsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 15px;
  grid-row-gap: 10px;
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

  cursor: pointer;
`;

const Name = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  text-align: center;

  color: #454545;
`;

const Capacity = styled.div`
  font-size: 27px;

  display: flex;
  align-items: center;

  color: #000000;
`;
