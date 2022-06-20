function isValidActivityTime(activity, userActivities) {
  const activityStart = Number(activity.startAt);
  const activityEnd = activityStart + Number(activity.duration);

  const haveConflictActivityTime = userActivities.some((actualActivity) => {
    const actualStart = Number(actualActivity.startAt);
    const actualEnd = actualStart + Number(actualActivity.duration);

    const chosenStartsInsideActual = actualStart <= activityStart && activityStart < actualEnd;
    const chosenEndsInActual = actualStart < activityEnd && activityEnd <= actualEnd;

    return chosenStartsInsideActual || chosenEndsInActual;
  });

  return !haveConflictActivityTime;
}

export {
  isValidActivityTime,
};
