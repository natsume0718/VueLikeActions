import { effect, reactive } from "./assets/js/reactive.js";

let num = document.querySelector("#js-view").textContent;
const obj = reactive({ a: num });

document
  .querySelector("#js-reactiveIncrement")
  .addEventListener("click", () => {
    obj.a++;
  });
document
  .querySelector("#js-reactiveDecrement")
  .addEventListener("click", () => {
    obj.a--;
  });

effect(() => {
  document.querySelector("#js-view").textContent = obj.a;
  document.querySelector("#js-reactiveResult").textContent = obj.a * 2;
});
