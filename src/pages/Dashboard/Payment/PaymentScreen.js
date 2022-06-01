import Title from '../../../components/Title';
import useEnrollment from '../../../hooks/api/useEnrollment';
import Box from '../../../components/Box';
import GreyText from '../../../components/GreyText';
import useModality from '../../../hooks/api/useModality';

export default function PaymentScreen() {
  const { enrollment } = useEnrollment();
  const { modalities, getModalityError } = useModality();

  return (
    <>
      <Title>Ingresso e pagamento </Title>
      <Box center={enrollment}>
        {enrollment ? (
          <GreyText>Primeiro, escolha sua modalidade de ingresso</GreyText>

        ) : (
          <GreyText width="200">
            Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso
          </GreyText>
        )}
      </Box>
    </>
  );
}
