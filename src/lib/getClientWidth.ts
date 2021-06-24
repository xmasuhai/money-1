export default function () {
  return document.documentElement.clientWidth <= 500 ?
    'mobile' :
    'PC';
}
