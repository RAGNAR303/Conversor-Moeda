const error = document.getElementById("error"); // mensagem de erro
const info = document.getElementById("info");
const loading = document.getElementById("loading");
const convertButton = document.getElementById("convertButton");
const fromCurrency = document.getElementById("fromCurrency");
const result = document.getElementById("result");
const toCurrency = document.getElementById("toCurrency"); //
const amount = document.getElementById("amount"); // valor inserido no primeiro input
const converterForm = document.getElementById("converterForm"); // formulario que estão os valores

const API_URL = "https://api.exchangerate-api.com/v4/latest/";

async function convertMoney() {
  // async => acincrona
  loading.style.display = "block";

  try {
    // try => tentar    // await => esperar  // fetch => comunicação com servidor
    const response = await fetch(API_URL + fromCurrency.value);

    //data transforma em json para manupulação no java
    const data = await response.json();
    // pega o valor "rates" que são a cotações do dia e compara com a que fi selecionada
    const rate = data.rates[toCurrency.value];

    const convertedValue = (amount.value * rate).toFixed(2);

    result.value = convertedValue;

    info.style.display = "block";

    info.innerHTML = `
    <h1 class="font-bold text-2xl">${amount.value} ${fromCurrency.value} = ${result.value} ${toCurrency.value}</h1>
        <p class="font-medium">Taxa 1 ${fromCurrency.value}  = ${rate} ${toCurrency.value}</p>
    `;
  } catch (err) {
    error.style.display = "block";
    error.innerHTML = `
    <p class="text-xl text-red-700 font-medium text-center">Erro em consultar , tente novamente</p>
    `;
  }

  loading.style.display = "none";
}

converterForm.addEventListener("submit", function (event) {
  event.preventDefault();
  convertMoney();
});

