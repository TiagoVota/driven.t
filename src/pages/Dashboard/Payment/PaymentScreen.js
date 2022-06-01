import Title from '../../../components/Title';
import useEnrollment from '../../../hooks/api/useEnrollment';
import Box from '../../../components/Box';
import GreyText from '../../../components/GreyText';

export default function PaymentScreen() {
  const { enrollment } = useEnrollment();

  return (
    <>
      <Title>Ingresso e pagamento </Title>
      <Box>
        {enrollment ? (
          'masss'
        ) : (
          <GreyText width="200">Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</GreyText>
        )}
      </Box>
    </>
  );
}
