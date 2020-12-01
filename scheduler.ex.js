import { queueJob, nextTick } from "./assets/js/scheduler.js";

queueJob(() => {
  console.warn("一番上に定義");
});

console.warn("一番下に定義");
