export default function useViewTransition() {
  return (update) => {
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      return document.startViewTransition(update);
    }
    update();
    return null;
  };
}
