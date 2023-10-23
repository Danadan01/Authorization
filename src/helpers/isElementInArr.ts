
export const isElementInArr = (element: string, array: string[]): boolean  => {
  const elementFound = array.find(item => item === element);
  if (elementFound) {
    return true
  } else {
    return false
  }
}