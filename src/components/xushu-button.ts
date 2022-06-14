// 常用的生命周期方法如下:

// connectedCallback
// 当 web component 被添加到 DOM 时，会调用这个回调函数，这个函数只会被执行一次。可以在这个回调函数中完成一些初始化操作，比如更加参数设置组件的样式。

// disconnectedCallback
// 当 web component 从文档 DOM 中删除时执行。

// adoptedCallback
// 当 web component 被移动到新文档时执行。

// attributeChangedCallback
// 被监听的属性发生变化时执行。

type HTMLAttributes = boolean | string | Object;

class MyButton extends HTMLElement {
  static get observedAttributes() {
    return ["disabled"];
  }
  button!: HTMLElement | null | undefined;
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = `
      <style>
        :host {
          
        }
        #xushu-button{
          background-color: #f00;
          cursor: pointer;
          border: none;
          padding: 5px 10px;
          border-radius: 4px;
        }
      </style>
      <button id="xushu-button" />
      <slot></slot>
    `;
  }

  get disabled() {
    return this.getAttribute("disabled") !== null;
  }

  set disabled(value) {
    console.log(value);
    if (value === null || value === false) {
      this.removeAttribute("disabled");
    } else {
      this.setAttribute("disabled", "");
    }
  }

  connectedCallback() {
    this.button = this.shadowRoot?.getElementById("xushu-button");
    this.button?.addEventListener("click", (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(
        new CustomEvent("test", {
          detail: {
            value: 11111,
          },
        })
      );
    });
    this.disabled = this.disabled;
  }
  attributeChangedCallback(
    name: string,
    oldValue: HTMLAttributes,
    newValue: HTMLAttributes
  ) {
    if (name == "disabled" && this.button) {
      if (newValue !== null) {
        this.button.setAttribute("disabled", "disabled");
      } else {
        this.button.removeAttribute("disabled");
      }
    }
  }
}

customElements.define("xushu-button", MyButton);
