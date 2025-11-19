// src/utils/validators.js
export const isEmailValid = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isNotEmpty = (value) => value && value.trim() !== "";
