import useAsync from '../useAsync';
import useToken from '../useToken';

import * as userApi from '../../services/userApi';

export default function useRegisterActivity() {
  const token = useToken();

  const {
    loading: registerActivityLoading,
    error: registerActivityError,
    act: registerActivity,
  } = useAsync((data) => userApi.registerActivity(data, token), false);

  return {
    registerActivityLoading,
    registerActivityError,
    registerActivity,
  };
}
