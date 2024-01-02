export function $(selector: string) {
  return document.querySelector(selector);
}

export function matchMedia(mediaQuery: string) {
  return window.matchMedia(mediaQuery);
}

export function matchPrefersColorSchemeDark() {
  return window.matchMedia('(prefers-color-scheme: dark)');
}
