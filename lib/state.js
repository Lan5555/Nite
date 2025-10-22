

let stateIndex = 0;
const stateStore = [];
let globalRender = null;

/**
 * Custom implementation of applyState.
 * @param {any} initialValue - The initial state value.
 * @returns {[any, Function]} - Current state and function to update it.
 * @deprecated- use Watch() instead
 */
export function ApplyState(initialValue) {
  const currentIndex = stateIndex;

  if (stateStore[currentIndex] === undefined) {
    stateStore[currentIndex] = initialValue;
  }

  const setState = (newValue) => {
    stateStore[currentIndex] =
      typeof newValue === "function"
        ? newValue(stateStore[currentIndex])
        : newValue;

    if (typeof globalRender === "function") {
      globalRender(); // Trigger re-render
    }
  };

  stateIndex++;
  return [stateStore[currentIndex], setState];
}

/**
 * Resets the state index for the next render cycle.
 */
export function resetStateIndex() {
  stateIndex = 0;
}

/**
 * Main render function to render the app.
 * @param {Function} App - The main app function to render.
 * @param {HTMLElement} rootElement - The root DOM element to render into.
 */
export function render(App, rootElement) {
  globalRender = () => {
    resetStateIndex(); // Reset the state index before rendering
    rootElement.innerHTML = ""; // Clear existing content
    const app = App();
    if(app !== null) rootElement.appendChild(app);
  };

  globalRender(); // Initial render
}

/**
 * Append element to body
 * @param {function} node
 */
export const renderBody = (node) => {
  document.body.innerHTML = ""; // Clear the body content
  document.body.appendChild(node); // Append the new node
};

/**
 * Append child to container
 * @param {HTMLElement} prev
 * @param {...Node} nodes
 */
export const SetChild = (prev, ...nodes) => {
  if (!(prev instanceof HTMLElement)) {
    throw new Error("The first parameter must be a valid DOM element.");
  }

  for (const node of nodes) {
    if (!(node instanceof Node)) {
      throw new Error("All additional parameters must be valid DOM nodes.");
    }

    prev.appendChild(node);
  }
};
/**@deprecated Use SetChild() instead */
export const setChild = (prev, ...nodes) => {
  if (!(prev instanceof HTMLElement)) {
    throw new Error("The first parameter must be a valid DOM element.");
  }

  for (const node of nodes) {
    if (!(node instanceof Node)) {
      throw new Error("All additional parameters must be valid DOM nodes.");
    }

    prev.appendChild(node);
  }
};


/**
 * Adds styling to element
 * @param {HTMLElement} node
 * @param {string} className
 */
export const Style = (node, className) => {
  const classes = className.trim().split(/\s+/).filter(Boolean);
  node.classList.add(...classes);
};

/**@deprecated- Use Style() instead */
export const style = (node, className) => {
  const classes = className.trim().split(/\s+/).filter(Boolean);
  node.classList.add(...classes);
};


/**
 * Creates a new element
 * @param {string} name
 */
export const CreateNode = (name) => {
  const element = document.createElement(`${name}`);
  return element;
};

/**
 * Watches for events
 * @param {HTMLElement} node
 * @param {string} type
 * @param {Function} run
 */

/**@deprecated Use HandleEvent() instead*/
export const ListenForEvent = (node, type, run = () => {}) => {
  node.addEventListener(`${type}`, () => {
    run();
  });
};

export const HandleEvent = (node, type, run = () => {}) => {
  node.addEventListener(type, run);
};


/**
 * Inner HTML of element
 * @param {HTMLElement} node
 * @param {string} content
 */
export const SetInner = (node, content) => {
  node.innerHTML = content;
};


/**
 * Text Element
 * @param {HTMLElement} node
 * @param {String} content
 */
export const Text = (node, text) => {
  node.textContent = text;
};


 
export function CreateKeyframes() {
  let styleSheet;

  if (document.styleSheets.length > 0) {
    styleSheet = document.styleSheets[0];
  } else {
    const styleElement = document.createElement('style');
    document.head.appendChild(styleElement);
    styleSheet = styleElement.sheet;
  }

  // Define keyframes
  const fadeOutKeyframes = `
    @keyframes fadeOut {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
  `;

  const fadeInKeyframes = `
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `;

  try {
    styleSheet.insertRule(fadeOutKeyframes, styleSheet.cssRules.length);
    styleSheet.insertRule(fadeInKeyframes, styleSheet.cssRules.length);
  } catch (error) {
    console.error('Error adding keyframes:', error.message);
  }
}

CreateKeyframes();
 
 
/**
 * Routes to pages From and To.
 * @param {HTMLElement} page
 * @param {any} location
 * @param {String} locationName - Specifies the link to be shown on your browser
 */

export const route = {
  type: "page",
  routes: {}, // Map of routeName -> DOM Node

  register(routeName, element) {
    if (!(element instanceof Node)) {
      throw new Error('Element must be a valid DOM Node.');
    }
    this.routes[routeName] = element;
  },

  move(currentPage, newPage, routeName = 'page') {
    if (this.type === "page") {
      if (!(currentPage instanceof Node) || !(newPage instanceof Node)) {
        throw new Error('Both current and new pages must be valid DOM nodes.');
      }

      currentPage.style.animation = "fadeOut 0.1s forwards";
      currentPage.addEventListener("animationend", () => {
        currentPage.remove();
        newPage.style.animation = "fadeIn 0.1s";
        const target = document.getElementById("app");
        target.appendChild(newPage);
        history.pushState({ routeName }, '', `/${routeName}`);
      }, { once: true });

      // Save route for back/forward use
      this.routes[routeName] = newPage;
    } else {
      if (typeof newPage !== 'string') {
        throw new Error('Location must be a valid URL.');
      }
      window.location.href = newPage;
    }
  },

  handlePopState(event) {
    const routeName = event.state?.routeName || window.location.pathname.slice(1);
    const page = this.routes[routeName];

    if (page) {
      // Remove current page if any
      document.body.innerHTML = '';
      page.style.animation = "fadeIn 0.1s";
      document.body.appendChild(page);
    } else {
      console.warn(`No registered route found for: ${routeName}`);
    }
  },

  start() {
    window.addEventListener('popstate', this.handlePopState.bind(this));
  }
};
 
 
 
 
 
/**
  * Adds vanilla style
  * @param {HTMLElement} node
  * @param {any} name
  */
  
export const Vanilla = (node, styles = {}) => {
  Object.entries(styles).forEach(([property, value]) => {
    node.style[property] = value;
  });
};
  
  
  
/**
   * Takes in Class Name and items to be placed within the class
   * @param {String} resourceName
   * @param {[]} resources
   * 
   */
export const CreateClass = (resourceName, resources = []) => {
  const newStyle = document.createElement('style'); // Create a <style> element
  newStyle.type = 'text/css'; // Set type to text/css

  
  const className = `.${resourceName} {
    ${resources.join(';')}
  }`;

  // Add the class definition to the style element
  newStyle.appendChild(document.createTextNode(className));

  // Append the style element to the head
  document.head.appendChild(newStyle);
};

/**
 * Places elements in a row
 * @param {any} children
 * @param {Function} callback
 * @param {String} sxis
 */
 
export const Row = (axis,{ children = [], callback = [] }) => {
  // Create the row container
  const div = document.createElement('div');
  div.style.display = 'flex';
  div.style.justifyContent = axis;
  div.style.alignItems = "center";
  
  children.forEach((element,index) => {
    div.appendChild(element);
    element.addEventListener('click',
      callback[index]
    );
  });


  return div;
};

/**
 * Places elements in a column
 * @param {any} children
 * @param {Function} callback
 * @param {String} sxis
 */
 
export const Column = (axis,{ children = [], callback = [] }) => {
  // Create the row container
  const div = document.createElement('div');
  div.style.display = 'grid';
  div.style.placeContent = axis;
  div.style.placeItems = "center";
  
  children.forEach((element,index) => {
    div.appendChild(element);
    element.addEventListener('click',
      callback[index]
    );
  });


  return div;
};


/**
 * Loads a sprite sheet
 * @param {[any]} items
 * @param {Style} design 
 * @param {any} position
 */
 
export const SpriteSheet = (items = [], design = {
  width: '20px',
  height: '20px'
}, position = [50, 50]) => {
  // Create an image element
  const img = document.createElement('img'); // Assuming createNode creates an element
  img.src = items[0];
  Object.entries(design).forEach(([property, value]) => {
    img.style[property] = value; // Apply design styles to the image
  });

  if (items.length > 0 && items[0]) {
    img.style.position = 'absolute';
    img.style.top = `${position[1]}%`; // Add 'px' for proper positioning
    img.style.left = `${position[0]}%`;
  }

  return img;
};

/**
 * A Timer.. Use to create a delay or an interval
 * @param {Number} Duration
 * @Callback {Function} callback
 * @param {String} type
 */
 
export const Timer = ({ Duration = 1000 }, type, callback) => {
  if (type === "single") {
    const time = setTimeout(() => {
      callback();
      clearTimeout(time);
    }, Duration);
  } else if (type === "constant") {
    const time = setInterval(() => {
      callback();
    }, Duration);
    return () => clearInterval(time);
  }
};

/**
 * Renders the inner and updates state. This is used to control the position of a Sprite.. Usually used in games
 * @param {Node} node
 * @Param {any} initialState
 * @Param {any} axis
 */
export const RenderInner = (node, initialValue, axis) => {
  if (!(node instanceof Node)) {
    throw new Error('Must be a valid node');
  }

  let initialState = initialValue;
  const setState = (newValue) => {
    initialState = newValue;
    if (axis === 'x') {
      node.style.left = `${initialState}%`;
    } else if (axis === 'y') {
      node.style.top = `${initialState}%`;
    }
  };
  return [initialState, setState];
};

/**
 * Used to switch the state of a sprite image. This is usually used while working on games or images
 * @param {Node} node
 * @param {String} value
 */

export const SwitchState = (node,value) => {
  let initialState = value;
  const setState = (newValue) => {
    initialState = newValue;
    node.src = initialState;
  };
  return [initialState, setState];
};


/**
 * Removes existing class
 * @param {Node} node
 * @param {String} name
 */
export const RemoveClass = (node,name) => {
  node.classList.remove(name);
};

/**
 * This updates the innerHTML of a node
 * @param {Node} node
 * @param {any} value
 */

export const UpdateState = (node,value) => {
  let initialState = value;
  const setState = (newValue) => {
    initialState = newValue;
    node.innerHTML = initialState;
  };
  return [initialState,setState];
};

/**
 * Logs to terminal
 * @param {any} parameter
 */
 
export const Print = (parameter) => {
  console.log(parameter);
};
 
/**
 * Logs error to terminal
 * @param {any} error
 */
 
 
export const Err = (error) => {
  console.error(error);
};
 
/** Creates a snackbar
  * @param {Function} SnackBar
  */
export const SnackBar = {
  ShowNiteSnackBar: ({ Snackbar }) => {
    // Define Snackbar function inside showNiteSnackBar
    const innerSnackbar = ({ text, duration, color, page }) => {
      // Create the snack bar container
      const bar = document.createElement('div');
      const textItem = document.createElement('p');



      // Style the snack bar itself
      Vanilla(bar, {
        position: 'fixed',
        bottom: '0',
        width: '100%',
        height: '30px',
        padding: '10px',
        backgroundColor: color ?? 'black',
        zIndex: '30',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      });

      // Style the text inside the snack bar
      Vanilla(textItem, {
        color: 'white',
      });
      // Apply additional styles and animations (if necessary)
      Style(bar, 'slideUp');

      // Set the text inside the snack bar
      Text(textItem, text ?? 'Static text');

      // Add the text item as a child of the snack bar
      SetChild(bar, textItem);

      // Append the snack bar to the provided page element
      page.appendChild(bar);

      // Automatically remove the snack bar after the set duration
      setTimeout(() => {
        // Trigger slide-out animation
        RemoveClass(bar, 'slide-in');
        Style(bar, 'slide-out-bottom');

        // Once the slide-out animation ends, remove the snack bar
        bar.addEventListener('animationend', () => {
          bar.remove();
        });
      }, duration ?? 3000);

    };

    // Call the Snackbar function with the provided arguments
    Snackbar(innerSnackbar);
  },
};

/** 
 * Creates a Nite Button
 * @param {String} variant
 * @param {String} text
 */
 
export const Button = ({ variant = 'default', text = 'Click Me', icon, color } = {}) => {
  const button = document.createElement('button');
  
  // Create and append icon if provided
  if (icon) {
    const iconElement = document.createElement('i');
    iconElement.className = `fa-solid fa-${icon}`;
    button.appendChild(iconElement);

    if (text) {
      const spacer = document.createTextNode(' ');
      button.appendChild(spacer);
    }
  }

  // Append text
  if (text) {
    button.appendChild(document.createTextNode(text));
  }

  // Base button styles
  Object.assign(button.style, {
    borderRadius: '5px',
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
  });

  // Variant-based styles
  if (variant === 'contained') {
    color = color ?? '#1976d2';
    Object.assign(button.style, {
      backgroundColor: color,
      color: 'white',
    });

    button.addEventListener('mouseover', () => {
      button.style.backgroundColor = '#1565c0';
    });

    button.addEventListener('mouseout', () => {
      button.style.backgroundColor = color;
    });

  } else if (variant === 'outlined') {
    color = color ?? 'transparent';
    Object.assign(button.style, {
      backgroundColor: color,
      border: '2px solid #1976d2',
      color: '#1976d2',
    });

    button.addEventListener('mouseover', () => {
      button.style.backgroundColor = '#e3f2fd';
    });

    button.addEventListener('mouseout', () => {
      button.style.backgroundColor = color;
    });

  } else {
    // Default variant
    Object.assign(button.style, {
      backgroundColor: '#f5f5f5',
      color: '#333',
    });
  }

  return button;
};
/**
 * Creates and renders a spriteSheet
 * @param {Function} useSpriteSheet
 * 
 */
 
export const UseSpriteSheet = () => {
  // Create and add canvas dynamically
  const canvas = document.createElement("canvas");
  canvas.width = 400; // Set canvas size
  canvas.height = 400;
  

  const ctx = canvas.getContext("2d");

  const createSprite = ({ spriteSrc, placement = { width: 64, height: 64, columns: 6, rows: 5 }, time = 100 }) => {
    const { width, height, columns, rows } = placement; // Destructure placement

    const spriteSheet = new Image();
    spriteSheet.src = spriteSrc;

    const totalFrames = columns * rows; // Total frames in the sheet
    let currentFrame = 0;

    // Function to render a specific frame
    function renderSprite(x, y) {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

      const column = currentFrame % columns; // Get column index
      const row = Math.floor(currentFrame / columns); // Get row index

      ctx.drawImage(
        spriteSheet,
        column * width, row * height, // Source X, Y
        width, height, // Source width & height
        x, y, // Destination X, Y
        width, height // Destination width & height
      );

      // Update frame
      currentFrame = (currentFrame + 1) % totalFrames;
    }

    // Animation loop
    function animate() {
      renderSprite(50, 50); // Draw sprite at (50, 50)
      setTimeout(animate, time); // Adjust speed
    }

    // Start animation when image loads
    spriteSheet.onload = () => {
      animate();
    };
  };

  return {canvas, createSprite };
};



/**
 * Creates a reactive state with observer support.
 * 
 * @template T The type of the reactive state.
 * @param initialValue - The initial value of the state.
 * @returns A tuple:
 * - A getter function to access the current value.
 * - A setter function to update the value.
 * - An observer function to register callbacks when the value changes.
 */
export const Watch = (initialValue) => {
  let value = initialValue;
  const observers = [];

  const get = () => value;

  const set = (newValueOrUpdater) => {
    const newValue = typeof newValueOrUpdater === 'function'
      ? newValueOrUpdater(value) // functional update
      : newValueOrUpdater;

    if (newValue !== value) {
      value = newValue;
      notify();
    }
  };

  const notify = () => {
    observers.forEach(observer => observer());
  };

  const observe = (observer) => {
    observers.push(observer);
  };

  return [get, set, observe];
};
/**
   * Creates a switch toggler
   * @param {String} activeColor 
   * 
   */

export const SwitchBar = ({activeColor, inactiveColor, activeTrackColor, inActiveTrackColor, isClicked}) => {
  const Switch1 = CreateNode('div');
  const switchTrack  = CreateNode('div');
  const [value, setValue] = Watch(false);
  const [condition, setCondition, observer] = Watch(false);

  Vanilla(Switch1,{
    width:'40px',
    backgroundColor: inactiveColor ?? 'white'
    
  });
  CreateClass('rounded-sm',['border-radius:8px;']);
  Style(Switch1,'shadowXl rounded relative right-5 h-auto');
  Style(switchTrack,'circle w-60 cursor-pointer hover transition');
  Vanilla(switchTrack,{
    height:'25px',
    backgroundColor: inActiveTrackColor ?? 'plum'
  });

  observer(()=>{
    Vanilla(switchTrack,{
      height:'25px',
      backgroundColor: condition() ? activeTrackColor : inActiveTrackColor,
      marginLeft: condition() ? '20px' : ''
    });
    Vanilla(Switch1,{
      width:'40px',
      backgroundColor: condition() ? activeColor : inactiveColor
    });
  });

  switchTrack.addEventListener('click',()=>{
    setCondition(!condition());
    setValue(!value());
    isClicked(value());
  });
  SetChild(Switch1,switchTrack);
    
  return Switch1;
};


/**
   * @param {Animate} Animate
   * Animates target component
   */
class Animate {
  animate(item) {
    return item;
  }
}
  
class Animation extends Animate {
  animateWithDuration(node, animationClass, duration = 1, infinite = false) {
    node.classList.add(animationClass);
    node.style.animationDuration = `${duration}s`;
    node.style.animationIterationCount = infinite ? "infinite" : "1"; // Handle infinite animations
      
    if (!infinite) {
      // Auto-remove class after animation ends
      node.addEventListener("animationend", function removeAnimation() {
        node.classList.remove(animationClass);
        node.style.animationDuration = ""; // Reset duration
        node.style.animationIterationCount = ""; // Reset iteration count
        node.removeEventListener("animationend", removeAnimation); // Clean up event listener
      });
    }
  }
    
  fadeIn(node, duration = 1, infinite = false) {
    this.animateWithDuration(node, "fade-in", duration, infinite);
  }
  fadeOut(node, duration = 1, infinite = false) {
    this.animateWithDuration(node, "fade-out", duration, infinite);
  }
    
  slideIn(node, duration = 1, infinite = false) {
    this.animateWithDuration(node, "slide-in", duration, infinite);
  }
    
  slideInLeft(node, duration = 1, infinite = false) {
    this.animateWithDuration(node, "slide-in-left", duration, infinite);
  }
  slideInRight(node, duration = 1, infinite = false) {
    this.animateWithDuration(node, "slide-in-right", duration, infinite);
  }
  slideInTop(node, duration = 1, infinite = false) {
    this.animateWithDuration(node, "slide-in-top", duration, infinite);
  }
  slideInBottom(node, duration = 1, infinite = false) {
    this.animateWithDuration(node, "slide-in-bottom", duration, infinite);
  }
    
    
  bounce(node, duration = 1, infinite = false) {
    this.animateWithDuration(node, "bounce", duration, infinite);
  }
    
  shake(node, duration = 1, infinite = false) {
    this.animateWithDuration(node, "shake", duration, infinite);
  }
    
  pulse(node, duration = 1, infinite = false) {
    this.animateWithDuration(node, "pulse", duration, infinite);
  }
}
  
export const animate = new Animation();

export const Loader = ({position}) => {
  const div = CreateNode('div');
  if(position === 'center'){
    Style(div,'loader-spinner centered z-20');
  }else{
    Style(div,'loader-spinner z-20');
  }
   
  return div;
};

/**
 * 
 * @param {Function} FutureCreator - Handles asynchronous operations
 */
export const FutureCreator = async ({ future, suspense, output, target }) => {
  if (!(target instanceof Node)) throw new Error('Must be a valid Page');

  const suspenseNode = (typeof suspense === 'function' ? suspense() : suspense) ?? Loader({ position: 'center' });

  if (!(suspenseNode instanceof Node)) {
    throw new Error('Suspense must return a valid Node');
  }

  SetChild(target, suspenseNode);

  try {
    const result = typeof future === 'function' ? await future() : await future;
    target.removeChild(suspenseNode);
    output(result);
  } catch (err) {
    print(err.message);
  }
};


export const AlertDialog = ({icon, message, page}) => {
  if(!(page instanceof Node)) throw new Error('Alert needs a page to display on');
  const overlay = CreateNode('div');
  Style(overlay,'w-100 h-screen-full bg-grey fixed top-0 bottom-0 left-0 right-0 z-20');
  animate.fadeIn(overlay,0.5,false);
  SetChild(page,overlay);

  const bar = CreateNode('div');
  animate.bounce(bar,1,false);
  Style(bar,'centered bg-white justify-evenly rounded shadowXl p-1 z-20 relative');
  const mediaQuery = window.matchMedia('(min-width:1024px)');
  Vanilla(bar,{
    width: mediaQuery.matches ? '30%' : '50%',
    height: mediaQuery.matches ? '30vh' : '30vh',
  });

  const iconHolder = CreateNode('div');
  Style(iconHolder,'flex justify-center');
  const fallbackIcon = CreateNode('h1');
  Text(fallbackIcon,'!');
  Vanilla(fallbackIcon,{fontWeight:'bold',color:'green'});
  const iconBar = icon ?? fallbackIcon;
  SetChild(iconHolder, iconBar);
  SetChild(bar,iconHolder);

  const messageHolder = CreateNode('div');
  Style(messageHolder,'flex justify-center');
  const messageBar = CreateNode('h3');
  Vanilla(messageBar,{
    position:'absolute',
    top:'50%',
    left:'50%',
    transform:'translate(-50%,-50%)',
    whiteSpace:'pre-line'
  });
  Text(messageBar, message ?? 'This is just a test');
  SetChild(messageHolder,messageBar);
  SetChild(bar,messageHolder);

  const actionHolder = CreateNode('div');
  Style(actionHolder,'flex justify-between');
  Vanilla(actionHolder,{
    paddingLeft:'10px',
    paddingRight:'10px',
  });
  
  const button = Button({
    variant:'contained',
    text:'Ok'
  });
  SetChild(actionHolder,button);
  Vanilla(button,{
    position:'absolute',
    bottom:'10px',
    right:'10px'
  });
  button.addEventListener('click',() => {
    bar.remove();
    animate.fadeOut(overlay,0.5,false);
    setTimeout(()=>{
      page.removeChild(overlay);
    },500);
  });
  SetChild(bar,actionHolder);
  SetChild(page,bar);
};

/**Sets runtime media query 
 * @param {String} output - returns a String containing the current media query.  */
export const MediaQuery = ({output}) => {
  const desktop = window.matchMedia('(min-width:1024px)');
  const tablet = window.matchMedia('(min-width:542px) and (max-width:1024px)');
  const mobile = window.matchMedia('(max-width:600px)');

  window.onload = () => {
    checkMedia();
  };
  function checkMedia(){
    if(desktop.matches){
      output('desktop');
    }else if(tablet.matches){
      output('tablet');
    }else if(mobile.matches){
      output('mobile');
    }
  }
  window.addEventListener('resize',() => {
    if(desktop.matches){
      output('desktop');
    }else if(tablet.matches){
      output('tablet');
    }else if(mobile.matches){
      output('mobile');
    }
  });

};
/** 
 * Used to set font awesome icons 
 * @param {String} iconStyle - Specify the icon name and style
 * */
export const UseFontAwesomeIcon = ({iconStyle}) => {
  const icon = CreateNode('i');
  Style(icon,iconStyle ?? 'fa fa-user');
  return icon;
};

/**
 * Gets the document
 * @param {String} type
 * @param {String} value
 */

export const GetDocument = ({type,value}) => {
  let doc;
  if (typeof value !== String) throw new Error('value must be a string');
  if(type === 'class'){
    doc = document.querySelector(`.${value}`);
  }else if(type === 'id'){
    doc = document.getElementById(value);
  }
  return doc;
};


/**
 * @param {AnimatedText} AnimatedText- Creates a typing effect 
 */


// Optional: Blinking cursor effect
const styler = document.createElement("style");
style.textContent = `
.typing-text::after {
  content: '|';
  animation: blink 0.7s step-end infinite;
}
@keyframes blink {
  50% { opacity: 0; }
}
`;
document.head.appendChild(styler);

class AnimatedText {
  constructor() {
    this._textValue = "Static";
    this._node = "p";
    this._textItem = CreateNode(this._node);
    this._targetNode = document.body;
  }
  
  animateText() {
    return this._textItem;
  }
  
  setText(node, text, targetNode) {
    this._node = node;
    this._textValue = text;
    this._targetNode = targetNode;
    this._textItem = CreateNode(this._node); // recreate node
  }
  styles = {
    color: 'red',
    textShadow: '1px 1px 1px black',
    fontWeight: 'bold',
    fontFamily: 'Orbitron, serif',
    fontSize: '2rem',
    letterSpacing: '1.5px',
  };
  
  setStyle() {
    Vanilla(this._textItem, this.styles);
  }
}

class TypingText extends AnimatedText {
  animation() {
    this.setStyle();
    this._textItem.innerHTML = ""; // clear previous
    this._textItem.classList.add("typing-text");
    let i = 0;
    const interval = setInterval(() => {
      if (i < this._textValue.length) {
        this._textItem.innerHTML += this._textValue[i];
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);
  }
  
  Style(style = {}) {
    this.styles = style;
    Vanilla(this._textItem, this.styles);
  }
  
  animate() {
    this._targetNode?.appendChild(this._textItem);
    this.animation();
   
  }
  remove(){
    this._textItem.remove();
  }
}

export const _Text = new TypingText();
