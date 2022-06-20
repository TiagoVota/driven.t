import GreyText from '../../../components/GreyText';
import HotelCard from '../../../components/Hotel/HotelCard';
import HotelContainer from '../../../components/Hotel/HotelContainer';
import Box from '../../../components/Box';
import useToken from '../../../hooks/useToken';
import { getRooms } from '../../../services/roomApi';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { getHotels } from '../../../services/hotelsAPI';
import Rooms from './Rooms';

export default function HotelSelection({ changePage }) {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomsArray, setRoomsArray] = useState();
  const [showRooms, setShowRooms] = useState(false);
  const token = useToken();

  useEffect(() => {
    const promise = getHotels({ token });
    promise.then((hotelsData) => setHotels(hotelsData));
    promise.catch((error) => toast('Não foi possível encontrar os hotéis!'));
  }, []);

  function handleHotelSelection(hotelId) {
    setSelectedHotel(hotelId);
    setSelectedRoom(null);
    setShowRooms(true);
    fillRoomsArray(hotelId);
  }

  function addIsSelectedKey(array) {
    return array.map((obj) => ({ ...obj, isSelected: false }));
  }

  async function fillRoomsArray(hotelId) {
    try {
      const response = await getRooms(hotelId, token);
      setRoomsArray(addIsSelectedKey(response));
    } catch (err) {
      toast('Erro ao carregar opções de quarto');
    }
  }

  return (
    <>
      <Box center="left" height="300px">
        <GreyText width="400px" align="left">
          Primeiro, escolha seu hotel
        </GreyText>
        <HotelContainer>
          {hotels?.map((hotel) => (
            <HotelCard
              selected={selectedHotel === hotel.id}
              key={hotel.id}
              value={hotel.id}
              onClick={(e) => handleHotelSelection(hotel.id)}
            >
              <img src={hotel.image} alt="Hotel" />
              <h1>{hotel.name}</h1>
              <p>Tipos de acomodação:</p>
              <span>{hotel.type}</span>
              <p>Vagas disponíveis:</p>
              <span>{hotel.capacity - hotel.occupation}</span>
            </HotelCard>
          ))}
        </HotelContainer>
      </Box>
      {showRooms && (
        <Rooms
          roomsArray={roomsArray}
          setRoomsArray={setRoomsArray}
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
          changePage={changePage}
        />
      )}
    </>
  );
}
