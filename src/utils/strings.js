export const generateRandomUsername = () => {
  return 'User ' + Math.floor(Math.random() * 10000);
}

export const generateRandomString = () => {
  let r = (Math.random() + 1).toString(36).substring(7);
  return r;
}
