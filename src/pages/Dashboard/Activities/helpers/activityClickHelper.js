function isValidActivityTime(activity, userActivities, eventDayIdSelected) {
  const activityStart = Number(activity.startAt);
  const activityEnd = activityStart + Number(activity.duration);
  const userDayActivities = userActivities.filter(userActivity => {
    return userActivity.Location.eventDayId === eventDayIdSelected;
  });

  const haveConflictActivityTime = userDayActivities.some((actualActivity) => {
    const actualStart = Number(actualActivity.startAt);
    const actualEnd = actualStart + Number(actualActivity.duration);

    const chosenStartsInsideActual = actualStart <= activityStart && activityStart < actualEnd;
    const chosenEndsInActual = actualStart < activityEnd && activityEnd <= actualEnd;

    return chosenStartsInsideActual || chosenEndsInActual;
  });

  return !haveConflictActivityTime;
}

function addEventDayInActivity(activity, eventDayId) {
  return {
    ...activity,
    Location: {
      eventDayId,
    }
  };
}

export {
  isValidActivityTime,
  addEventDayInActivity,
};
