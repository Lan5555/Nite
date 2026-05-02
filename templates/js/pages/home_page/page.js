import {  
  RemoveClass, 
  Row,SetChild,
  Style,
  Vanilla,
  HandleEvent,
  Text,
  CreateNode,
  SwitchBar,
  Watch
} from "../../lib/state";
import {nJFloatingActionButton as FAB} from "../../lib/main";
import { routeToPage } from "../routes";


export const HomePage = () => {
  //Page 1
  const page = CreateNode('div');
  // Center text
  const text = CreateNode('h1');
  //Header
  const navbar = CreateNode('div');
  // Header title
  const title = CreateNode('h2');
  const mode = CreateNode('small');

  
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

  const handleValue = () => {
    setDark(!isDark());
  };
  
  const switchBar = SwitchBar({
    activeColor:'grey',
    activeTrackColor:'white',
    inactiveColor:'white',
    inActiveTrackColor:'plum',
    isClicked:(value)=> handleValue(value)
  });
  

  Text(mode,'Light mode');

  observe(() => {
    Vanilla(page,{
      backgroundColor: isDark() ? 'black' : 'white'
    });
    Vanilla(text,{
      color:isDark() ? 'white' : 'black'
    });
    Vanilla(title,{
      color:isDark() ? 'white' : 'black'
    });
    Vanilla(navbar,{
      boxShadow: isDark() ? '2px 4px 8px rgba(222, 214, 214, 0.1)' : ''
    });
    Vanilla(mode,{
      color: isDark() ? 'white':'black'
    });
    Text(mode, isDark() ? 'Dark mode' : 'Light mode');
    if(isDark()){
      RemoveClass(page,'bg-image');
      page.classList.add('bg-image2');
      Vanilla(navbar,{
        backdropFilter:'blur(5px)'
      });
    }else{
      RemoveClass(page,'bg-image2');
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
  SetChild(page,text);
  SetChild(page,navbar);
  SetChild(navbar,title);
  SetChild(navbar,row);
  

  
  //Drop down
  const dropDown = CreateNode('div');
  const dropDownHead = CreateNode('a');
  Style(dropDownHead,'text-center, font-bold');
  Text(dropDownHead,'Toolkit');
  SetChild(dropDown,dropDownHead);
  
  
  Style(dropDown,`w-auto h-auto rounded absolute bottom-10 right-10 shadowXl p-1 flex flex-col space`);
  observe(()=>{
    Vanilla(dropDown,{
      border:isDark() ? '0.5px solid white' : '',
      backdropFilter:'blur(3px)',
      boxShadow:isDark() ? '2px 4px 8px rgba(0,0,0,0.1)' :''
    });
    Vanilla(dropDownHead,{
      color: isDark() ? 'white' : ''
    });
  });
  
  observeCount(()=>{
    Text(text,`${count()}`);
  });
  //Drop down Toolkit
  const handleClick = (index) => {
    index === 0 ? setCount(prev => prev + 1) :
      routeToPage(1);
  };
  
  ['Increment count','Next page'].map((element,index) => {
    const container = CreateNode('div');
    Style(container,'border-bottom');
    
    const text = CreateNode('a');
    Style(text,'font-xs text-grey shadow-dynamic cursor-pointer');
    Text(text,element);
    SetChild(container,text);
    SetChild(dropDown, container);
    
    
    
    //Drop down handler
    HandleEvent(text,'click',() => handleClick(index));
  });
  SetChild(page,dropDown);
 
 
  /**

   * Rendered page, this displays the initial page created.
   */
  
  
  //Floating action button
  
  Vanilla(document.body,{
    margin:0,
    padding:0
  });

  Vanilla(dropDown,{
    display: dropBarState() ? 'flex' : 'none',
  });
  
  observeDropbarState(() =>{
    Vanilla(dropDown,{
      display: dropBarState() ? 'flex' : 'none',
    });
  });
  FAB.FloatingActionButton({
    onclick: () => {
      setDropBarState(!dropBarState());
      
    }
  },page);
  
  return page;
};