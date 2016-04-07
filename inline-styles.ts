export function insertStyles(style:string) {
  if (typeof document === 'undefined') return;

  var element = document.createElement("style");
  element.setAttribute('type', 'text/css');

  if ('textContent' in element) {
    element.textContent = style;
  } else {
    (element as any).styleSheet.cssText = style;
  }

  var head = document.getElementsByTagName('head')[0];
  head.appendChild(element);
}

// z-depth official shadows
// (https://www.polymer-project.org/components/paper-elements/demo.html#paper-shadow)
export var z1ShadowStyle = {
  boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.37)"
};
