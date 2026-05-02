import { 
  CreateClass, CreateNode, MediaQuery, SetChild, Style, Vanilla, Watch,
  SetInner, HandleEvent, Validator, Print, Err, AlertDialog, Text,
  ApplyState, _Text, RemoveClass, RenderInner, Row, Column, SizedBox,
  SwitchBar, SnackBar, SpriteSheet, SwitchState, FutureCreator, 
  Button,Timer,
  UpdateState,
  UseSpriteSheet,
  UseFontAwesomeIcon,
  animate,
  GetDocument
} from "../lib/state";

export class Layout {
  constructor() {
    // Core DOM / UI
    this.CreateNode = CreateNode;
    this.SetChild = SetChild;
    this.SetInner = SetInner;
    this.RenderInner = RenderInner;

    // Styling
    this.Style = Style;
    this.CreateClass = CreateClass;
    this.RemoveClass = RemoveClass;

    // Layout helpers
    this.Row = Row;
    this.Column = Column;
    this.SizedBox = SizedBox;

    // Utilities
    this.Vanilla = Vanilla;
    this.MediaQuery = MediaQuery;
    this.Timer = Timer;

    // State & reactivity
    this.Watch = Watch;
    this.ApplyState = ApplyState;
    this.SwitchState = SwitchState;
    this.FutureCreator = FutureCreator;
    this.UpdateState = UpdateState;

    // Events & validation
    this.HandleEvent = HandleEvent;
    this.Validator = Validator;

    // UI feedback
    this.SnackBar = SnackBar;
    this.AlertDialog = AlertDialog;

    // Text helpers
    this.Text = Text;
    this._Text = _Text;
    
    //Document
    this.GetDocument = GetDocument;

    // Debugging
    this.Print = Print;
    this.Err = Err;


    // Advanced / misc
    this.SwitchBar = SwitchBar;
    this.SpriteSheet = SpriteSheet;
    this.Button = Button;
    this.UseSpriteSheet = UseSpriteSheet;
    this.UseFontAwesomeIcon = UseFontAwesomeIcon;
    this.animate = animate;
  }

  routes = [];

  initializeRoute(route = []) {
    this.routes.push(...route);
  }

  onMount() {}
  onDestroy() {}
}