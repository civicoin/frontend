export { throwAnyErrors } from "@/shared/utils/api.ts";

export function debounce<Args extends unknown[]>(cb: (...args: Args) => unknown, timeout: number) {
  let timeoutID: ReturnType<typeof setTimeout> | null = null;
  return function (...args: Args){
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    timeoutID = setTimeout(() => cb(...args), timeout);
  }
}