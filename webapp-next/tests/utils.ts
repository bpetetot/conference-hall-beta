export function getByAriaCurrent(container: HTMLElement, current: boolean | string) {
  return container.querySelector(`[aria-current="${current}"]`)
}
