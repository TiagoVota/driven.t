import GreyText from '../../../components/GreyText';
import HotelCard from '../../../components/Hotel/HotelCard';
import HotelContainer from '../../../components/Hotel/HotelContainer';

export default function HotelSelection() {
  const MockDBResponse = [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWxzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      name: 'Driven Resort',
      types: 'Single',
      availableRooms: 76,
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWxzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      name: 'Driven Resort',
      types: 'Single',
      availableRooms: 32,
    },
    {
      id: 3,
      image:
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWxzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      name: 'Driven Resort',
      types: 'Single',
      availableRooms: 102,
    },
  ];

  //   OS TIPOS (single, double...) PODEM VIR DO FRONT, SO FIZ O MOCK PRA TESTAR O CSS
  return (
    <>
      <GreyText width="400px" align="left">
        Primeiro, escolha seu hotel
      </GreyText>
      <HotelContainer>
        {MockDBResponse.map((hotel) => (
          <HotelCard selected={false} key={hotel.id}>
            <img src={hotel.image} alt="Hotel" />
            <h1>{hotel.name}</h1>
            <p>Tipos de acomodação:</p>
            <span>{hotel.types}</span>
            <p>Vagas disponíveis:</p>
            <span>{hotel.availableRooms}</span>
          </HotelCard>
        ))}
      </HotelContainer>
    </>
  );
}
