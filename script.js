const BASE_URL = "https://api.currencyapi.com/v3/latest?apikey=cur_live_bBQBwQxPJZv4NRc3xobyrLJ37QbJlrLjD9dOvVuA";

const dropdown = document.querySelectorAll(".dropdown select");


for (let select of dropdown) {
  for (let code in countryList) {
    if (countryList.hasOwnProperty(code)) {
      let option = document.createElement("option");
      option.innerText = code;
      option.value = code;
      if (select.name === "from" && code === "USD") {
        option.selected = "selected";
      } else if (select.name === "to" && code === "INR") {
        option.selected = "selected";
      }
      select.append(option);
    }
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let code = element.value;
  let countryCode = countryList[code];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

const fetchExchangeRate = async (fromCurrency, toCurrency, amount) => {
  try {
    let response = await fetch(`${BASE_URL}&base_currency=${fromCurrency}`);
    let data = await response.json();
    let rate = data.data[toCurrency].value;
    let convertedAmount = (amount * rate).toFixed(2);
    document.querySelector(".msg p").innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
  }
};

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  let amount = parseFloat(document.querySelector("input[type='text']").value);
  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }
  let fromCurrency = document.querySelector("select[name='from']").value;
  let toCurrency = document.querySelector("select[name='to']").value;
  fetchExchangeRate(fromCurrency, toCurrency, amount);
});
