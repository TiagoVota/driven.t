import useAsync from '../useAsync';
import useToken from '../useToken';

import * as userApi from '../../services/userApi';

export default function useUserRoom() {
  const token = useToken();

  const {
    data: userRoom,
    loading: getUserRoomLoading,
    error: getUserRoomError,
    act: getUserRoom,
  } = useAsync(() => userApi.getUserRoom(token));

  return {
    userRoom,
    getUserRoomLoading,
    getUserRoomError,
    getUserRoom,
  };
}
