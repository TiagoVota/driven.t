import useAsync from '../useAsync';
import * as eventDayApi from '../../services/eventDayApi';
import useToken from '../useToken';

export default function useEventDay() {
  const token = useToken();

  const {
    data: modalities,
    loading: geteventDayLoading,
    error: geteventDayError,
    act: getModalities,
  } = useAsync(() => eventDayApi.getEventDays(token));

  return {
    modalities,
    geteventDayLoading,
    geteventDayError,
    getModalities,
  };
}
