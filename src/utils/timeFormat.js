export function formatTime(startAt, duration) {
  const endTime = startAt + duration;

  return `${getHours(startAt)}:${getMinutes(startAt)} - ${getHours(endTime)}:${getMinutes(endTime)}`;
}

function getHours(time) {
  return Math.floor(time).toString().padStart(2, '0');
}

function getMinutes(time) {
  return ((time * 60) % 60).toString().padStart(2, '0');
}
