import { useEffect } from "react";

export default function useUnloadWarning(condition: boolean = true) {
  useEffect(() => {
    if (!condition) {
      return;
    }
    const listner = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    window.addEventListener("beforeunload", listner);
    return () => {
      window.removeEventListener("beforeunload", listner);
    };
  }, [condition]);
}
