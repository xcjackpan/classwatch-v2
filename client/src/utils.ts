export function parseTerm(term: string): string {
  let season: string = "";
  let year: string;
  switch (term[3]) {
    case "1":
      season = "Winter";
      break;
    case "5":
      season = "Spring";
      break;
    case "9":
      season = "Fall";
      break;
  }
  year = term.substr(1, 2);
  return `${season} 20${year}`;
}

export function getSeason(term: string): string {
  switch (term ? term.charAt(3) : "") {
    case "1":
      return "winter";
    case "5":
      return "spring";
    default:
      return "fall";
  }
}
