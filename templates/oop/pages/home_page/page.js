import { Layout } from "../../lib/layout";
import { nJFloatingActionButton as FAB } from "../../lib/main";
import { routeToPage } from "../routes";

export class HomePage extends Layout {
  constructor() {
    super();
    this.initializeRoute([() => this.render()]);
  }

  render = () => {
    //Page 1
    const page = this.CreateNode("div");
    // Center text
    const text = this.CreateNode("h1");
    //Header
    const navbar = this.CreateNode("div");
    // Header title
    const title = this.CreateNode("h2");
    const mode = this.CreateNode("small");

    //Body style
    this.Style(
      page,
      "flex-container w-100 h-screen-full space flex-col transition bg-image",
    );
    // Center text style
    this.Style(text, `font-bold`);
    // Header style
    this.Style(navbar, "navbar shadowXl");
    // Header title style
    this.Style(title, "ml-3");
    this.Style(mode, "relative right-8");

    //Rendered state of count
    const [count, setCount, observeCount] = this.Watch(0);

    //Toggle view Mode
    const [isDark, setDark, observe] = this.Watch(false);

    const handleValue = () => {
      setDark(prev => !prev);
    };

    const switchBar = this.SwitchBar({
      activeColor: "grey",
      activeTrackColor: "white",
      inactiveColor: "white",
      inActiveTrackColor: "plum",
      isClicked: (value) => handleValue(value),
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

    //State controlling dropbar

    const [dropBarState, setDropBarState, observeDropbarState] =
      this.Watch(false);
    //Sets Text to the respective nodes
    this.Text(text, `${count()}`);
    this.Text(title, "My App");

    const row = this.Row("space-evenly", {
      children: [mode, switchBar],
    });

    // Appends child to the respective nodes
    this.SetChild(page, text);
    this.SetChild(page, navbar);
    this.SetChild(navbar, title);
    this.SetChild(navbar, row);

    //Drop down
    const dropDown = this.CreateNode("div");
    const dropDownHead = this.CreateNode("a");
    this.Style(dropDownHead, "text-center, font-bold");
    this.Text(dropDownHead, "Toolkit");
    this.SetChild(dropDown, dropDownHead);

    this.Style(
      dropDown,
      `w-auto h-auto rounded absolute bottom-10 right-10 shadowXl p-1 flex flex-col space`,
    );
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
    //Drop down Toolkit
    const handleClick = (index) => {
      index === 0 ? setCount((prev) => prev + 1) : routeToPage(1);
    };

    ["Increment count", "Next page"].map((element, index) => {
      const container = this.CreateNode("div");
      this.Style(container, "border-bottom");

      const text = this.CreateNode("a");
      this.Style(text, "font-xs text-grey shadow-dynamic cursor-pointer");
      this.Text(text, element);
      this.SetChild(container, text);
      this.SetChild(dropDown, container);

      //Drop down handler
      this.HandleEvent(text, "click", () => handleClick(index));
    });
    this.SetChild(page, dropDown);

    /**

   * Rendered page, this displays the initial page created.
   */

    //Floating action button

    this.Vanilla(document.body, {
      margin: 0,
      padding: 0,
    });

    this.Vanilla(dropDown, {
      display: dropBarState() ? "flex" : "none",
    });

    observeDropbarState(() => {
      this.Vanilla(dropDown, {
        display: dropBarState() ? "flex" : "none",
      });
    });
    FAB.FloatingActionButton(
      {
        onclick: () => {
          setDropBarState(!dropBarState());
        },
      },
      page,
    );

    return page;
  };
}
