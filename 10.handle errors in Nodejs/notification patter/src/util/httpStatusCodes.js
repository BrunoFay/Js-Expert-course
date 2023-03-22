import { STATUS_CODES } from "http";

const normalizeHttoErrorName = (name) => name.toUpperCase().replace(/\s/g, '_')

export const statusCodes = Object.keys(STATUS_CODES)
  /* way to invert value to key of status codes */
  .map(code => ({ [normalizeHttoErrorName(STATUS_CODES[code])]: parseInt(code) }))
  /* way to convert array in object */
  .reduce((prev, next) => ({ ...prev, ...next }), {})


