const error = document.getElementById("error"); // mensagem de erro
// const error = document.getElementsByClassName(".error");
const info = document.getElementById("info");
const loading = document.getElementById("loading");
const convertButton = document.getElementById("convertButton");
const fromCurrency = document.getElementById("fromCurrency");
const result = document.getElementById("result");
const toCurrency = document.getElementById("toCurrency"); //
const amount = document.getElementById("amount"); // valor inserido no primeiro input
const converterForm = document.getElementById("converterForm"); // formulario que estão os valores
const reload = document.getElementById("reload");
const API_URL = "https://api.exchangerate-api.com/v4/latest/";

reload.style.display = "none";

async function convertMoney() {
  // async => acincrona
  loading.style.display = "block";
  setTimeout(async function () {
    try {
      // try => tentar    // await => esperar  // fetch => comunicação com servidor
      const response = await fetch(API_URL + fromCurrency.value);

      //data transforma em json para manupulação no java
      const data = await response.json();
      // pega o valor "rates" que são a cotações do dia e compara com a que fi selecionada
      const rate = data.rates[toCurrency.value];

      const convertedValue = (amount.value * rate).toFixed(2);

      result.value = convertedValue;

      setTimeout(function () {
        loading.style.display = "none";
        info.style.display = "block";
        reload.style.display = "block";
        info.innerHTML = `
    <h1 class="font-bold text-2xl">${amount.value} ${fromCurrency.value} = ${result.value} ${toCurrency.value}</h1>
        <p class="font-medium">Taxa 1 ${fromCurrency.value}  = ${rate} ${toCurrency.value}</p>
    `;

        loading.style.display = "none";
      }, 2000);
    } catch (err) {
      error.style.display = "block";
      reload.style.display = "block";
      error.innerHTML = `
    <p class="text-xl bg-red-300 w-full p-2 rounded-md text-red-700 
    font-medium text-center">Erro em consultar , tente novamente</p>
         
    `;

      loading.style.display = "none";
    }
  }, 100);

  convertButton.style.display = "none";
}

converterForm.addEventListener("submit", function (event) {
  event.preventDefault();
  convertMoney();
});

reload.addEventListener("click", function () {
  window.location.reload();
});
