export const totalYearsDOB = (dob: string) => {
  let date: number = 0;
  if (dob) {
    date = new Date(new Date().valueOf() - new Date(dob).valueOf()).getFullYear() - 1970;
  }

  return date;
};

export const formatDateToDOB = (date: string) => {
  let formatDate: string = '';
  if (date && date.indexOf('T')) {
    const tempDate = date.slice(0, date.indexOf('T'));
    const splitDate = tempDate.split('-');
    formatDate = `${splitDate[1]}/${splitDate[2]}/${splitDate[0]}`;
  }
  return formatDate;
};

// Returns date format YYYY-MM-DD from string timestamp date
export const getFormattedDate = (date: string) => {
  const effectiveDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const dateArray = effectiveDate.split('/');
  const formatted = `${dateArray[2]}-${dateArray[0]}-${dateArray[1]}`;

  return formatted;
};

export const getMonthDayYear = (date: string, year = false) => {
  if (year)
    return new Date(date).toLocaleString('default', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  else
    return new Date(date).toLocaleString('default', {
      month: 'long',
      day: 'numeric',
    });
};

export const getTimestamp = (date: string) => {
  const splitDate = date.split('T')[0];
  const dateArray = splitDate.split('-');
  const year = parseInt(dateArray[0]);
  const month = parseInt(dateArray[1], 10) - 1;
  const day = parseInt(dateArray[2]);
  const formattedDate = new Date(year, month, day);
  return formattedDate;
};
