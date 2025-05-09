import {AlertDialog, applyState, Column, createClass, FutureCreator, print, removeClass, Row, Watch} from "./lib/state.js";
import {renderBody} from "./lib/state.js";
import {setChild} from "./lib/state.js";
import {Style} from "./lib/state.js";
import {createNode,route,vanilla,setInner} from "./lib/state.js";
import {listenForEvent} from "./lib/state.js";
import {nJFloatingActionButton as FAB} from "./lib/main.js";
import {Text} from "./lib/state.js";
import { SwitchBar } from "./lib/state.js";
import myImage from './public/dark.jpg'



export const App = () => {
  //Page 1
  const page = createNode('div');
  // Center text
  const text = createNode('h1');
  //Header
  const navbar = createNode('div');
  // Header title
  const title = createNode('h2');
  const mode = createNode('small');

  
  //Body style
  Style(page,"flex-container w-100 h-screen-full space flex-col transition bg-image");
  // Center text style
  Style(text,`font-bold`);
  // Header style
  Style(navbar, "navbar shadowXl");
  // Header title style
  Style(title,"ml-3");
  Style(mode,'relative right-8');
  
  //Rendered state of count
  const [count, setCount, observeCount] = Watch(0);

  //Toggle view Mode
  const [isDark, setDark, observe] = Watch(false);

  const handleValue = (value) => {
    setDark(!isDark());
  }
  
  const switchBar = SwitchBar({
    activeColor:'grey',
    activeTrackColor:'white',
    inactiveColor:'white',
    inActiveTrackColor:'plum',
    isClicked:(value)=> handleValue(value)
  });
  

  Text(mode,'Light mode');

  observe(() => {
    vanilla(page,{
      backgroundColor: isDark() ? 'black' : 'white'
    });
    vanilla(text,{
      color:isDark() ? 'white' : 'black'
    });
    vanilla(title,{
      color:isDark() ? 'white' : 'black'
    });
    vanilla(navbar,{
      boxShadow: isDark() ? '2px 4px 8px rgba(222, 214, 214, 0.1)' : ''
    });
    vanilla(mode,{
      color: isDark() ? 'white':'black'
    });
    Text(mode, isDark() ? 'Dark mode' : 'Light mode');
    if(isDark()){
      removeClass(page,'bg-image');
      page.classList.add('bg-image2');
      vanilla(navbar,{
        backdropFilter:'blur(5px)'
      })
    }else{
      removeClass(page,'bg-image2');
      page.classList.add('bg-image');
    }
  });


  //State controlling dropbar
 
  const [dropBarState, setDropBarState, observeDropbarState] = Watch(false);
  //Sets Text to the respective nodes
  Text(text,`${count()}`);
  Text(title, "My App");
  

  const row = Row('space-evenly',{
    children:[
      mode,
     switchBar
    ]
  });
  
  // Appends child to the respective nodes
  setChild(page,text);
  setChild(page,navbar);
  setChild(navbar,title);
  setChild(navbar,row);
  

  
  //Drop down
  const dropDown = createNode('div');
  const dropDownHead = createNode('a');
  Style(dropDownHead,'text-center, font-bold');
  Text(dropDownHead,'Toolkit');
  setChild(dropDown,dropDownHead);
  
  
  Style(dropDown,`w-auto h-auto rounded absolute bottom-10 right-10 shadowXl p-1 flex flex-col space`);
  observe(()=>{
    vanilla(dropDown,{
      border:isDark() ? '0.5px solid white' : '',
      backdropFilter:'blur(3px)',
      boxShadow:isDark() ? '2px 4px 8px rgba(0,0,0,0.1)' :''
    });
    vanilla(dropDownHead,{
      color: isDark() ? 'white' : ''
    });
  });
  
    observeCount(()=>{
    Text(text,`${count()}`);
    });
   //Drop down Toolkit
   const handleClick = (index) => {
     index === 0 ? setCount(count() + 1) :
       route.move(page, page2);
   }
  
  ['Increment count','Next page'].map((element,index) => {
    const container = createNode('div');
    Style(container,'border-bottom');
    
    const text = createNode('a');
    Style(text,'font-xs text-grey shadow-dynamic cursor-pointer')
    Text(text,element);
    setChild(container,text);
    setChild(dropDown, container);
    
    
    
     //Drop down handler
     listenForEvent(text,'click',() => handleClick(index));
  });
  setChild(page,dropDown);
 
 
  /**

   * Rendered page, this displays the initial page created.
   */
  renderBody(page); //Call only once
  
  //Floating action button
  
  vanilla(document.body,{
    margin:0,
    padding:0
  });

  vanilla(dropDown,{
    display: dropBarState() ? 'flex' : 'none',
  });
  
  observeDropbarState(() =>{
    vanilla(dropDown,{
      display: dropBarState() ? 'flex' : 'none',
    });
  });
  FAB.FloatingActionButton({
    onclick: () => {
      setDropBarState(!dropBarState());
      
    }
  });
  
  /**
   * Nite makes routing to pages quite easy. All you have to do is to use the route function
   * Example usage below
   */
  //Page 2
  
  
  //New page
  const page2 = createNode('div');
  
  //Styling
  Style(page2, 'fixed top-0 bottom-0 left-0 right-0 w-100 h-screen-full bg-black flex-container flex-col space');
  
  //Sample Text
  const h4 = createNode('h4');
  Text(h4,"Routing between pages is easy");
  Style(h4, "text-white");
  
  //back button
  const back = createNode('button');
  Style(back,'p-1 absolute bottom-8 right-3 rounded pulse text-black bg-white border-none cursor-pointer hover');
  Text(back, 'Back');
  setChild(page2,back);
  listenForEvent(back,'click',() => {
    route.move(page2, page);
  })
  
  
  //Append Text to page
  setChild(page2,h4);
}