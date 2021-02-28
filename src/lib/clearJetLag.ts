function clearJetLag(isoDate: Date = new Date(), offsetType: '-' | '+' | '' = '') {
  let localClock;
  if (offsetType === '') {
    localClock = new Date(isoDate.getTime()).toISOString();
  }else if(offsetType === '-'){
    localClock = new Date(isoDate.getTime() - (isoDate.getTimezoneOffset() * 60000)).toISOString();
  }else{
    localClock = new Date(isoDate.getTime() + (isoDate.getTimezoneOffset() * 60000)).toISOString();
  }
  return localClock
}

export default clearJetLag;
