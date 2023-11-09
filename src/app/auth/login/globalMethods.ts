export function getTransactionDate() {
  const currentDate = new Date();
  const dateFormat = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const [
    { value: month },
    ,
    { value: day },
    ,
    { value: year },
    ,
    { value: hour },
    ,
    { value: minute },
    ,
    { value: second },
  ] = dateFormat.formatToParts(currentDate);

  return `${year}${month}${day}${hour}${minute}${second}`;
}

export function getMinuteSecond() {
  const currentDate = new Date();
  const dateFormat = new Intl.DateTimeFormat('en-US', {
    minute: '2-digit',
    second: '2-digit',
  });

  const [{ value: minute }, , { value: second }] =
    dateFormat.formatToParts(currentDate);

  return `${minute}${second}`;
}

export function getHourMinuteSecond() {
  const currentDate = new Date();
  const dateFormat = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const [{ value: hour }, , { value: minute }, , { value: second }] =
    dateFormat.formatToParts(currentDate);

  return `${hour}${minute}${second}`;
}

export function getHourMinute() {
  const currentDate = new Date();
  const dateFormat = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const [{ value: hour }, , { value: minute }] =
    dateFormat.formatToParts(currentDate);

  return `${hour}${minute}`;
}

export function createRefno() {
  const customLetters = 'ABCD'; // Define your custom set of letters here
  const numbers = '0123456789';
  const customLetterCount = 4;
  const numberCount = 4;

  let refno = '';

  for (let i = 0; i < customLetterCount; i++) {
    const randomLetter = customLetters.charAt(
      Math.floor(Math.random() * customLetters.length)
    );
    refno += randomLetter;
  }

  for (let i = 0; i < numberCount; i++) {
    const randomNumber = numbers.charAt(
      Math.floor(Math.random() * numbers.length)
    );
    refno += randomNumber;
  }

  return refno;
}

export function formatPhone(phone: string | number): string {
  if (typeof phone !== 'string' && typeof phone !== 'number') {
    console.error('Invalid phone value:', phone);
    return '';
  }

  const phoneString = phone.toString();
  const numericPhone = phoneString.replace(/\D/g, '');

  const lastNineDigits = numericPhone.slice(-9);

  const formattedPhone = '254' + lastNineDigits;

  return formattedPhone;
}
