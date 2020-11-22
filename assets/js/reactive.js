"use strict";

let activeEffect = null;

function effect(fn) {
  activeEffect = fn;
}

function trigger() {
  if (activeEffect !== null) {
    activeEffect();
  }
}

function reactive(target) {
  const handler = {
    get(target, key, reciever) {
      const ref = Reflect.get(target, key, reciever);
      return ref;
    },
    set(target, key, value, reciever) {
      const ref = Reflect.set(target, key, value, reciever);
      trigger();
      return ref;
    },
  };
  return new Proxy(target, handler);
}

export { reactive, effect };
