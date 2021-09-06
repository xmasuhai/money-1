export function getWindowConfig() {
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;
  if (typeof windowWidth !== 'number') {
    // 标准模式
    if (document.compatMode === 'CSS1Compat') {
      windowWidth = document.documentElement.clientWidth;
      windowHeight = document.documentElement.clientHeight;
    } else {
      // 怪异模式
      windowWidth = document.body.clientWidth;
      windowHeight = document.body.clientHeight;
    }
  }
  return {

    windowWidth: windowWidth,
    windowHeight: windowHeight
  };
}

export default function () {
  return document.documentElement.clientWidth <= 500 ?
    'mobile' :
    'PC';
}
