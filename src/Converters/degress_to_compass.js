export default function degToCompass(num) {
  var val = Math.floor((num / 22.5) + 0.5);
  var arr = ["Nord", "Nord nordøst", "nordøst", "Øst nordøst", "Øst", "Øst sydøst", "Sydøst", "Syd sydøst", "Syd", "Syd sydvest", "Sydvest", "Vest sydvest", "Vest", "Vest nordvest", "nordvest", "Nord nordvest"];
  return arr[(val % 16)];
}