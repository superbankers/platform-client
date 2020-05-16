/* eslint-disable */
import moment from 'moment'
export const getHours = (startTime) => {
  const duration = moment.duration(moment().diff(moment(startTime)));
  const hours = duration.asHours();
  return Math.floor(hours);
}


export default {}