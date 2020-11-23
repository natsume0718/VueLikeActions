import { effect, reactive } from "./assets/js/reactive.js";

let num = document.querySelector("#js-view").textContent;
const obj = reactive({ counter: num });

document
  .querySelector("#js-reactiveIncrement")
  .addEventListener("click", () => {
    obj.counter++;
  });
document
  .querySelector("#js-reactiveDecrement")
  .addEventListener("click", () => {
    obj.counter--;
  });

effect(() => {
  document.querySelector("#js-view").textContent = obj.counter;
  document.querySelector("#js-reactiveResult").textContent = obj.counter * 2;
});
