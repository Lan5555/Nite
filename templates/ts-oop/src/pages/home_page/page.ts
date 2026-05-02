import { FloatingActionButton as FAB } from "../../../lib/components";
import { routeToPage } from "../routes";
import { Layout } from "../../../lib/layout";
import { Component, Singleton } from "../../../lib/decorators";


@Component("HomePage")
@Singleton()
export class HomePage extends Layout {
  constructor(){
    super();
    this.initializeRoute([() => this.render()]);

  }

  
  private render = ():HTMLElement => {
  // Page 1
    const page = this.CreateNode("div") as HTMLDivElement;
    const text = this.CreateNode("h1") as HTMLHeadElement;
    const navbar = this.CreateNode("div") as HTMLDivElement;
    const title = this.CreateNode("h2") as HTMLHeadElement;
    const mode = this.CreateNode("small") as HTMLElement;

    this.Style(page, "flex-container w-100 h-screen-full space flex-col transition bg-image");
    this.Style(text, `font-bold`);
    this.Style(navbar, "navbar shadowXl");
    this.Style(title, "ml-3");
    this.Style(mode, "relative right-8");
    // Rendered state of count
    const [count, setCount, observeCount] = this.Watch<number>(0);

    // Toggle view Mode
    const [isDark, setDark, observe] = this.Watch<boolean>(false);
    const handleValue = (): void => {
      setDark(prev => !prev);
    };

    const switchBar = this.SwitchBar({
      activeColor: "grey",
      activeTrackColor: "white",
      inactiveColor: "white",
      inActiveTrackColor: "plum",
      isClicked: () => handleValue(),
    });

    this.Text(mode, "Light mode");

    observe(() => {
      this.Vanilla(page, {
        backgroundColor: isDark() ? "black" : "white",
      });
      this.Vanilla(text, {
        color: isDark() ? "white" : "black",
      });
      this.Vanilla(title, {
        color: isDark() ? "white" : "black",
      });
      this.Vanilla(navbar, {
        boxShadow: isDark() ? "2px 4px 8px rgba(222, 214, 214, 0.1)" : "",
      });
      this.Vanilla(mode, {
        color: isDark() ? "white" : "black",
      });
      this.Text(mode, isDark() ? "Dark mode" : "Light mode");

      if (isDark()) {
        this.RemoveClass(page, "bg-image");
        page.classList.add("bg-image2");
        this.Vanilla(navbar, {
          backdropFilter: "blur(5px)",
        });
      } else {
        this.RemoveClass(page, "bg-image2");
        page.classList.add("bg-image");
      }
    });

    // State controlling dropbar
    const [dropBarState, setDropBarState, observeDropbarState] = this.Watch<boolean>(false);

    // Sets Text to the respective nodes
    this.Text(text, `${count()}`);
    this.Text(title, "My App");

    const row = this.Row("space-evenly", {
      children: [mode, switchBar],
    });

    this.SetChild(page, text);
    this.SetChild(page, navbar);
    this.SetChild(navbar, title);
    this.SetChild(navbar, row);

    // Drop down
    const dropDown = this.CreateNode("div") as HTMLElement;
    const dropDownHead = this.CreateNode("a") as HTMLElement;

    this.Style(dropDownHead, "text-center font-bold");
    this.Text(dropDownHead, "Toolkit");
    this.SetChild(dropDown, dropDownHead);

    this.Style(dropDown, "w-auto h-auto rounded absolute bottom-10 right-10 shadowXl p-1 flex flex-col space");

    observe(() => {
      this.Vanilla(dropDown, {
        border: isDark() ? "0.5px solid white" : "",
        backdropFilter: "blur(3px)",
        boxShadow: isDark() ? "2px 4px 8px rgba(0,0,0,0.1)" : "",
      });
      this.Vanilla(dropDownHead, {
        color: isDark() ? "white" : "",
      });
    });

    observeCount(() => {
      this.Text(text, `${count()}`);
    });

    // Drop down Toolkit
    const handleClick = (index: number): void => {
      if (index === 0) {
        setCount(prev => prev + 1);
      } else {
        routeToPage(1);
      }
    };

    ["Increment count", "Next page"].forEach((element:string, index:number) => {
      const container = this.CreateNode("div");
      this.Style(container, "border-bottom");

      const linkText = this.CreateNode("a");
      this.Style(linkText, "font-xs text-grey shadow-dynamic cursor-pointer");
      this.Text(linkText, element);
      this.SetChild(container, linkText);
      this.SetChild(dropDown, container);

      this.HandleEvent(linkText, "click", () => handleClick(index));
    });

    this.SetChild(page, dropDown);


    /**
   * Rendered page, this displays the initial page created.
   */

    this.Vanilla(document.body, {
      margin: "0",
      padding: "0",
    });

    this.Vanilla(dropDown, {
      display: dropBarState() ? "flex" : "none",
    });

    observeDropbarState(() => {
      this.Vanilla(dropDown, {
        display: dropBarState() ? "flex" : "none",
      });
    });

    FAB.create({
      target:page,
      position:"bottomRight",
      icon:this.UseFontAwesomeIcon({
        iconStyle:'fa fa-sign-out'
      }),
      onclick: () => {
        setDropBarState(!dropBarState());
      },
    });


    return page;
  };
}