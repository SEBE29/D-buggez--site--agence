export const MONTHS = {
  1: "janvier",
  2: "février",
  3: "mars",
  4: "avril",
  5: "mai",
  6: "juin",
  7: "juillet",
  8: "août",
  9: "septembre",
  10: "octobre",
  11: "novembre",
  12: "décembre",
};

export const getMonth = (inputDate) => {
  const date = inputDate instanceof Date ? inputDate : new Date(inputDate);

  if (Number.isNaN(date.getTime())) {
    return ""; // Gérer les cas où la conversion échoue
  }

  const monthIndex = date.getMonth() + 1; // Ajuster l'index de 0-11 à 1-12
  return MONTHS[monthIndex] || ""; // Retourner une chaîne vide si aucune correspondance
};
