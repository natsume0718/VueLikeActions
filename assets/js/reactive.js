"use strict";

let activeEffect = null;
const mapping = new WeakMap();

/**
 * メソッドの格納
 * @param {function} fn
 */
function effect(fn) {
  activeEffect = fn;
  activeEffect();
  activeEffect = null;
}

/**
 * 登録されたメソッドの実行
 * @param {object} target
 * @param {string} key
 */
function trigger(target, key) {
  const dependencyMap = mapping.get(target);
  if (!dependencyMap) {
    return;
  }
  /** @type Set */
  const deps = dependencyMap.get(key);
  if (!deps) {
    return;
  }

  deps.forEach((effect) => {
    effect();
  });
}

/**
 * 依存関係の登録
 * @param {object} target
 * @param {string} key
 */
function track(target, key) {
  if (activeEffect === null) {
    return;
  }
  /**
   * WeakMapにtargetをキーにマップを登録します
   * 二回目以降はmapが取得できる
   * @type Map
   */
  let dependencyMap = mapping.get(target);
  if (!dependencyMap) {
    dependencyMap = new Map();
    mapping.set(target, dependencyMap);
  }

  /**
   * mapにsetを登録します
   * 二回目以降はsetが取得できる
   * @type Set
   */
  let multiplePropertyEffect = dependencyMap.get(key);
  if (!multiplePropertyEffect) {
    multiplePropertyEffect = new Set();
    dependencyMap.set(key, multiplePropertyEffect);
  }
  // setにメソッドを追加していきます
  if (!multiplePropertyEffect.has(activeEffect)) {
    multiplePropertyEffect.add(activeEffect);
  }
}

/**
 * reactivityを有効化するオブジェクトを登録と、getter、setterの定義
 * @param {object} target
 */
function reactive(target) {
  const handler = {
    get(target, key, reciever) {
      const ref = Reflect.get(target, key, reciever);
      track(target, key);
      return ref;
    },
    set(target, key, value, reciever) {
      const ref = Reflect.set(target, key, value, reciever);
      trigger(target, key);
      return ref;
    },
  };
  return new Proxy(target, handler);
}

export { reactive, effect };
