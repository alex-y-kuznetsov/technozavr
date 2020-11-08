export default function getSuffix(number) {
  switch (number) {
    case 1:
      return "";

    case 2:
    case 3:
    case 4:
      return "а";

    default:
      return "ов";
  }
}