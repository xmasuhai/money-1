/**
 * 描述
 * @date 2021-06-27
 * @param {Date} isoDate
 * @param {string} offsetType: new Date()
 * @returns {Date}
 */
function clearJetLag(isoDate: Date = new Date(), offsetType: '-' | '+' | '' = '') {
  let localClock;
  if (offsetType === '') {
    localClock = new Date(isoDate.getTime()).toISOString();
  } else if (offsetType === '-') {
    localClock = new Date(isoDate.getTime() - (isoDate.getTimezoneOffset() * 60000)).toISOString();
  } else if (offsetType === '+') {
    localClock = new Date(isoDate.getTime() + (isoDate.getTimezoneOffset() * 60000)).toISOString();
  } else {
    console.warn('输入时间错误');
    return '';
  }
  return localClock;
}

export default clearJetLag;
