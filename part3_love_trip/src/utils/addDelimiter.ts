function addDelimiter(value: number | string, delimiter = ',') {
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, delimiter)
}

export default addDelimiter
