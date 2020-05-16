/* eslint-disable */
import moment from 'moment'
export const getHours = (startTime) => {
  const duration = moment.duration(moment().diff(moment(startTime)));
  const hours = duration.asHours();
  return hours < 10 ? Math.floor(hours) : 9;
}

export const loanRepayment = (interests, start_year, end_year, amount) => {
  let cumulative_amount = amount;
  const starting_index = start_year - 2000
  for (let i = 0; i < end_year - start_year; i++) {
    const interest = amount * (interests[starting_index + i] / 100);
    cumulative_amount += interest;
  }
  return cumulative_amount
}


export default {}