import { Watch,route } from "../lib/state";
import { HomePage } from "./home_page/page";
import { AnotherPage } from "./another_page/page";


// Use factories so we don't invoke the constructors during module initialization
// which can cause "Cannot access 'Webpage' before initialization" in circular imports.

const factories = [() => HomePage(), () => AnotherPage()]; //====== Add more pages here ===== //

// cache instances so we reuse page objects instead of creating new ones on each route
const instances = new Array(factories.length).fill(null);

const [currentPage, routeToPage, observeCurrentState] = Watch(0);
const [previousPage,setPreviousPageIndex] = Watch(0);
  
const method = () => {
  const fromIndex = previousPage();
  const toIndex = currentPage();
  if(toIndex < factories.length){
    // create instances lazily when actually routing, and reuse existing ones
    if (!instances[fromIndex]) instances[fromIndex] = factories[fromIndex]();
    if (!instances[toIndex]) instances[toIndex] = factories[toIndex]();
    route.move(instances[fromIndex], instances[toIndex]);
    setPreviousPageIndex(toIndex);
  }
};
observeCurrentState(method);

export const initState = () => {
  if (!instances[0]) instances[0] = factories[0]();
  return instances[0];
};

export {currentPage,routeToPage,previousPage,setPreviousPageIndex};




