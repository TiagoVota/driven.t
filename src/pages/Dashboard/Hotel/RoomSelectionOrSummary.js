import { useState } from 'react';

import HotelSelection from './HotelSelection';
import RoomSummary from './RoomSummary';

export default function RoomSelectionOrSummary() {
  const [isSelectionRoomPage, setIsSelectionRoomPage] = useState(false);

  function changeToSelectHotel() {
    setIsSelectionRoomPage(true);
  }
  function changeToRoomSummary() {
    setIsSelectionRoomPage(false);
  }
  return (
    <>
      {
        isSelectionRoomPage
          ? <HotelSelection changePage={changeToRoomSummary} />  // Se quiser pode usar essa função ao final do botão de reservar quarto!
          : <RoomSummary changePage={changeToSelectHotel} />
      }
    </>
  );
}
