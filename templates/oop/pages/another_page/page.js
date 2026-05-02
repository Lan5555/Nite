import { Layout } from "../../lib/layout";
import { routeToPage } from "../routes";

export class AnotherPage extends Layout {
  
  constructor() {
    super();
    this.initializeRoute([() => this.render()]);
  }


  render = () => {
    /**
     * Nite makes routing to pages quite easy. All you have to do is to use the route function
     * Example usage below
     */
    //Page 2

    //New page
    const page = this.CreateNode("div");

    //Styling
    this.Style(
      page,
      "fixed top-0 bottom-0 left-0 right-0 w-100 h-screen-full bg-black flex-container flex-col space",
    );

    //Sample Text
    const h4 = this.CreateNode("h4");
    this.Text(h4, "Routing between pages is easy");
    this.Style(h4, "text-white");

    //back button
    const back = this.Button({
      variant: "contained",
      text: "Back",
    });
    this.Style(
      back,
      "p-1 absolute bottom-8 right-3 rounded pulse text-black bg-white border-none cursor-pointer hover",
    );
    this.Text(back, "Back");
    this.SetChild(page, back);
    this.HandleEvent(back, "click", () => {
      routeToPage(0);
    });

    //Append Text to page
    this.SetChild(page, h4);
    return page;
  };
}
