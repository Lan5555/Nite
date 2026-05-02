import { CreateNode,Style,Button,SetChild,HandleEvent,Text } from "../../lib/state";
import { routeToPage } from "../routes";

export const AnotherPage = () => {
  /**
   * Nite makes routing to pages quite easy. All you have to do is to use the route function
   * Example usage below
   */
  //Page 2
  
  //New page
  const page = CreateNode('div');
  
  //Styling
  Style(page, 'fixed top-0 bottom-0 left-0 right-0 w-100 h-screen-full bg-black flex-container flex-col space');
  
  //Sample Text
  const h4 = CreateNode('h4');
  Text(h4,"Routing between pages is easy");
  Style(h4, "text-white");
  
  //back button
  const back = Button({
    variant:'contained',
    text:'Back',
  });
  Style(back,'p-1 absolute bottom-8 right-3 rounded pulse text-black bg-white border-none cursor-pointer hover');
  Text(back, 'Back');
  SetChild(page,back);
  HandleEvent(back,'click',() => {
    routeToPage(0);
  });
  
  
  //Append Text to page
  SetChild(page,h4);
  return page;
};