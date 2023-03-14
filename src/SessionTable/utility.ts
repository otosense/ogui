import * as moment from 'moment'

/**
 * Timestamp is expected to be in milliseconds
 *
 * @param timestamp milliseconds
 * @param showDateTimeInUTC
 */
export const formatTimestamp = (timestamp: number, showDateTimeInUTC = false): string => {
  if (showDateTimeInUTC) {
    return (!isNaN(timestamp))
      ? moment.utc(new Date(timestamp)).format('YYYY-MM-DD, HH:mm:ss') + ' -UTC'
      : '-'
  }
  return (!isNaN(timestamp)) ? moment.unix(timestamp / 1000).format('YYYY-MM-DD, HH:mm:ss') : '-'
}

/**
 * Session time is expected to be in microseconds
 *
 * @param bt microseconds
 * @param showDateTimeInUTC
 */
export const formatSessionTime = (bt: number, showDateTimeInUTC = false): string => {
  return formatTimestamp(bt / 1000, showDateTimeInUTC)
}
