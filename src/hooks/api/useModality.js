import useAsync from '../useAsync';
import * as modalityApi from '../../services/modalityApi';
import useToken from '../useToken';

export default function useModality() {
  const token  = useToken();

  const {
    data: modalities,
    loading: getModalityLoading,
    error: getModalityError,
    act: getModalities,
  } = useAsync(() => modalityApi.getModalities(token));

  return {
    modalities,
    getModalityLoading,
    getModalityError,
    getModalities,
  };
}
