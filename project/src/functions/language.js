export const setDefaultLanguage = (language) => {
  if (language) {
    if (language === "th") {
      return "th";
    } else {
      return "eng";
    }
  } else {
    return "th";
  }
};
