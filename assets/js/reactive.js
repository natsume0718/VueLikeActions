"use strict";

let activeEffect = null;
const mapping = new WeakMap();

function effect(fn) {
  activeEffect = fn;
  activeEffect();
}

function trigger(target) {
  const effect = mapping.get(target);
  effect();
}

function track(target) {
  mapping.set(target, activeEffect);
}

function reactive(target) {
  const handler = {
    get(target, key, reciever) {
      const ref = Reflect.get(target, key, reciever);
      track(target);
      return ref;
    },
    set(target, key, value, reciever) {
      const ref = Reflect.set(target, key, value, reciever);
      trigger(target);
      return ref;
    },
  };
  return new Proxy(target, handler);
}

export { reactive, effect };
