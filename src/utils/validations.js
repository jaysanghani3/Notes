export const isEmailValid = email => {
  return email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
};
export const isNameValid = name => {
  return name.length >= 3;
};
export const isMobileNumberValid = mobileNumber => {
  return mobileNumber.match(/^\d{10}$/);
};
export const isConfirmPasswordValid = (password, confirmPassword) => {
  return password === confirmPassword;
};
export const isPasswordStrong = password => {
  return /(?=.*[a-z])(?=.*[~!@#$%^&*()])(?=.*[A-Z])(?=.*[0-9])(?=.{8,16})/.test(
    password,
  );
};
export const isPasswordMatched = (password, confirmPassword) => {
  return password === confirmPassword;
};
export const isNameContainsNumber = name => {
  return /\d/.test(name);
};