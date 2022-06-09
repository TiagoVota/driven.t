import Title from '../../../components/Title';
import Box from '../../../components/Box';
import GreyText from '../../../components/GreyText';
import Button from '../../../components/Form/Button';
import HotelStyle from '../../../components/HotelStyle';

export default function ChageHotel() {
  return (
    <>
      <Title>Escolha de hotel e quarto</Title>
      <Box center={'flex-start'}>
        <GreyText>Você já escolheu seu quarto:</GreyText>
        <HotelStyle selected={true}>
          <img
            src="https://dicasdecancun.com.br/wp-content/uploads/2018/04/melhores-hoteis-centro-cancun.jpg"
            alt="erro"
          />
          <p>Driven Resort</p>
          
          <div>
            <strong>Quarto reservado</strong>
            <span>101</span>
          </div>

          <div>
            <strong>Pessoas no seu quarto</strong>
            <span>blabla</span>
          </div>
        </HotelStyle>
        <Button>TROCAR DE QUARTO</Button>
      </Box>
    </>
  );
}
