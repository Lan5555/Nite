import { Watch, route } from "../lib/state";
import { AnotherPage } from "./another_page/page";
import { HomePage } from "./home_page/page";

// Use factories so we don't invoke the constructors during module initialization
// which can cause "Cannot access 'Webpage' before initialization" in circular imports.
const classes = [HomePage, AnotherPage];
const factories = classes.map((cls) => new cls().routes).flat();

// cache instances so we reuse page objects instead of creating new ones on each route
const instances = new Array(factories.length).fill(null);

const [currentPage, routeToPage, observeCurrentState] = Watch(0);
const [previousPage, setPreviousPageIndex] = Watch(0);

const method = () => {
  const fromIndex = previousPage();
  const toIndex = currentPage();

  if (toIndex < factories.length) {
    if (!instances[fromIndex]) instances[fromIndex] = factories[fromIndex]();
    if (!instances[toIndex]) instances[toIndex] = factories[toIndex]();

    const fromPage = instances[fromIndex];
    const toPage = instances[toIndex];

    // 🔴 destroy old page
    fromPage?.onDestroy?.();

    // 🔵 mount new page
    route.move(fromPage, toPage);
    toPage?.onMount?.();

    setPreviousPageIndex(toIndex);
  }
};
observeCurrentState(method);

export const initState = () => {
  if (!instances[0]) instances[0] = factories[0]();
  return instances[0];
};

export { currentPage, routeToPage, previousPage, setPreviousPageIndex };
