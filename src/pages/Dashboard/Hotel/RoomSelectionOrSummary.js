import { useState } from 'react';

import HotelSelection from './HotelSelection';
import RoomSummary from './RoomSummary';

export default function RoomSelectionOrSummary() {
  const [isSelectionRoomPage, setIsSelectionRoomPage] = useState(true);

  function changeToSelectHotel() {
    setIsSelectionRoomPage(true);
  }
  function changeToRoomSummary() {
    setIsSelectionRoomPage(false);
  }
  return (
    <>
      {isSelectionRoomPage ? (
        <HotelSelection changePage={changeToRoomSummary} />
      ) : (
        <RoomSummary changePage={changeToSelectHotel} />
      )}
    </>
  );
}
