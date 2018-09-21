export const getLanguage = function () {
  let language = navigator.language || navigator.userLanguage;
  return language.substr(0, 2);
};
