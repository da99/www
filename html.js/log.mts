
export const IS_DEV = window.location.href.indexOf('://localhost:') > 0 || window.location.href.indexOf('.stream') > 0;

export function log(...args: any[]) {
  if (!IS_DEV)
    return false;

  return console.log(...args);
}

export function warn(...args: any[]) {
  if (!IS_DEV)
    return false;

  return console.warn(...args);
}
