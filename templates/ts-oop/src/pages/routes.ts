import { Watch, route } from "../../lib/state";
import { AnotherPage } from "./another_page/page";
import { HomePage } from "./home_page/page";

const classes = [HomePage, AnotherPage];

// ✅ safer + cleaner than concat
const factories = classes.flatMap(
  (cls) => new cls().routes ?? []
);
// cache page instances
const instances: any[] = [];

const [currentPage, routeToPage, observeCurrentState] = Watch<number>(0);
const [previousPage, setPreviousPageIndex] = Watch<number>(0);

const method = () => {
  const fromIndex = previousPage();
  const toIndex = currentPage();

  if (toIndex >= factories.length) return;

  if (!instances[fromIndex]) instances[fromIndex] = factories[fromIndex]?.();
  if (!instances[toIndex]) instances[toIndex] = factories[toIndex]?.();

  const fromPage = instances[fromIndex];
  const toPage = instances[toIndex];

  fromPage?.onDestroy?.();

  route.move(fromPage, toPage);

  toPage?.onMount?.();

  setPreviousPageIndex(toIndex);
};

observeCurrentState(method);

export const initState = (): HTMLElement => {
  if (!instances[0]) instances[0] = factories[0]?.();
  return instances[0];
};

export { currentPage, routeToPage, previousPage, setPreviousPageIndex };