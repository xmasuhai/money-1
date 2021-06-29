import dayjs from 'dayjs';

export default function (isoString: string) {
  return dayjs(isoString).format('YYYY-MM-DD');
}
