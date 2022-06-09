import GreyText from '../../../components/GreyText';
import HotelCard from '../../../components/Hotel/HotelCard';
import HotelContainer from '../../../components/Hotel/HotelContainer';
import Box from '../../../components/Box';
import useToken from '../../../hooks/useToken';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { getHotels } from '../../../services/hotelsAPI';

export default function HotelSelection() {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(0);
  const token = useToken();
  useEffect(() => {
    const promise = getHotels({ token });
    promise.then((hotelsData) => setHotels(hotelsData));
    promise.catch((error) => toast('Não foi possível encontrar os hoteis!'));
  }, []);

  function handleHotelSelection(hotelId) {
    setSelectedHotel(hotelId);
  }

  return (
    <Box center="left">
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
  );
}
