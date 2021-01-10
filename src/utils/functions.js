export function getScore(score) {
  if (
    !score.extraTime.awayTeam &&
    score.fullTime.awayTeam &&
    score.fullTime.homeTeam
  ) {
    return `${score.fullTime.awayTeam}:${score.fullTime.homeTeam}`;
  } else if (score.extraTime.awayTeam && score.extraTime.homeTeam) {
    return `${score.extraTime.awayTeam}:${score.extraTime.homeTeam}`;
  } else {
    return '-';
  }
}

export function formatDate(date, hasMinutes = true) {
  if (!date) {
    return '-';
  }

  const dateObj = new Date(date);
  const day =
    dateObj.getDate() < 10 ? `0${dateObj.getDate()}` : dateObj.getDate();
  const month =
    dateObj.getMonth() < 10
      ? `0${dateObj.getMonth() + 1}`
      : dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  const hours =
    dateObj.getHours() < 10 ? `0${dateObj.getHours()}` : dateObj.getHours();
  const minutes =
    dateObj.getMinutes() < 10
      ? `0${dateObj.getMinutes()}`
      : dateObj.getMinutes();

  return hasMinutes
    ? `${year}-${month}-${day} ${hours}:${minutes}`
    : `${year}-${month}-${day}`;
}

export function updateQuery(filters = {}) {
  const availableProps = {};

  for (const prop in filters) {
    if (filters[prop]) {
      availableProps[prop] = filters[prop];
    }
  }

  return availableProps;
}
