import "./assets/js/virtualdom.js";
import {
  domOperator,
  patch,
  createVirtualNode,
} from "./assets/js/virtualdom.js";

const container = domOperator.qs("#app");
const prev = createVirtualNode();
const next = createVirtualNode(
  "div",
  {
    style: "color:green",
    onClick: () => {
      alert("click");
    },
  },
  "hello",
);

patch(prev, next, container);
