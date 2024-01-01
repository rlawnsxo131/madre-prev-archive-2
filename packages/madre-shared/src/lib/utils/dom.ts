export function $(selector: string) {
  return document.querySelector(selector);
}

export function matchMedia(mediaQuery: string) {
  return window.matchMedia(mediaQuery);
}
