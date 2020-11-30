const domOperator = {
  /**
   * @param {string} selector
   * @param {document} scope
   */
  qs(selector, scope) {
    return (scope || document).querySelector(selector);
  },
  /**
   * @param {string} type
   */
  create(type) {
    return document.createElement(type);
  },
  /**
   * @param {document} parent
   * @param {Element} target
   */
  append(parent, target) {
    parent.appendChild(target);
  },
  /**
   * @param {Element} target
   * @param {string} key
   * @param {any} value
   */
  setAttr(target, key, value) {
    target.setAttribute(key, value);
  },
  /**
   * @param {Element} target
   * @param {any} value
   */
  html(target, value) {
    target.innerHTML = value;
  },
  /**
   * @param {document} target
   * @param {string} eventType
   * @param {function} callback
   */
  on(target, eventType, callback) {
    target.addEventListener(eventType, callback);
  },
};

function createVirtualNode(type = "", props = {}, children = "") {
  return {
    type,
    props,
    children,
  };
}

/**
 * @param {{ type, props, children }} prevNode
 * @typedef {Object} nextNode
 * @param {{ type, props, children }} nextNode
 * @param {Element} container
 */
function patch(prevNode, nextNode, container) {
  let el = null;

  // dom自体の変更の反映
  if (prevNode.type !== nextNode.type) {
    el = nextNode.el = domOperator.create(nextNode.type);
    domOperator.append(container, el);
  } else {
    el = nextNode.el = prevNode.el;
  }

  // propsの変更の反映
  for (const key in nextNode.props) {
    const prevProp = prevNode.props[key];
    const nextProp = nextNode.props[key];

    if (prevProp !== nextProp) {
      if (key.startsWith("on")) {
        domOperator.on(el, key.substring("2").toLowerCase(), () => {
          nextProp();
        });
      } else {
        domOperator.setAttr(el, key, nextProp);
      }
    }
  }
  // 子要素の比較と追加
  if (nextNode.children instanceof Array) {
    for (let i = 0; i < nextNode.children.length; i++) {
      if (prevNode.hasOwnProperty(i)) {
        patch(prevNode.children[i], nextNode.children[i], el);
      } else {
        patch(createVirtualNode(), nextNode.children[i], el);
      }
    }
  } else {
    if (el && prevNode.children !== nextNode.children) {
      console.log(el, prevNode, nextNode);
      domOperator.html(el, nextNode.children);
    }
  }
}

export { domOperator, createVirtualNode, patch };
