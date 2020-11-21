export default function convertFahrenheitToCelsisus(fahrenheit) {
    fahrenheit = parseFloat(fahrenheit);
    let celsisus = (fahrenheit - 32) / 1.8;
    return celsisus.toFixed(2);
  }