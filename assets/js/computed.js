"use strict";
import { effect } from "./reactive.js";

function computed(getter) {
  let computed = null;
  let value = null;
  const runner = effect(getter);
  computed = {
    get value() {
      if (runner.dirty) {
        value = runner();
        runner.dirty = fale;
      }
      return value;
    },
  };
  return computed;
}

export { computed };
