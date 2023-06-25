const compareStringLength = (string, length) => {
  if(string.length <= length) {
    return true;
  }

  return false;
};

const compareStringPalindrome = (string) => {
  const normalizedString = string.replaceAll(' ', '').toLowerCase();
  let reversedString = '';
  for(let i = normalizedString.length - 1;i >= 0;i--) {
    reversedString += normalizedString[i];
  }

  return reversedString === normalizedString;
};

const getNumbers = (string) => {
  string = string.toString();
  let result = '';
  let number;
  for (let i = 0; i < string.length; i++) {
    number = parseInt(string[i], 10);
    if (!Number.isNaN(number)) {
      result += number;
    }
  }

  return Number(result) || NaN;
};

function timeToMeeting(startDay, endDay, startMeeting, meetingTime) {
  const chunks = startMeeting.split(':');
  let meetingTimeEnd = new Date();
  meetingTimeEnd.setHours(Number(chunks[0]));
  meetingTimeEnd.setMinutes(Number(chunks[1]));
  meetingTimeEnd = meetingTimeEnd.setMinutes(meetingTimeEnd.getMinutes() + meetingTime);

  startDay = startDay.split(':');
  const startDayTime = new Date();
  startDayTime.setHours(Number(startDay[0]));
  startDayTime.setMinutes(Number(startDay[1]));
  startDay = startDayTime;


  endDay = endDay.split(':');
  const endDayTime = new Date();
  endDayTime.setHours(Number(endDay[0]));
  endDayTime.setMinutes(Number(endDay[1]));
  endDay = endDayTime;

  if(endDay < meetingTimeEnd){
    return false;
  }else if(meetingTimeEnd < startDay){
    return false;
  }

  return true;
}
