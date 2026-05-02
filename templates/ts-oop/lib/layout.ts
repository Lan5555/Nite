import {
  CreateClass,
  CreateNode,
  MediaQuery,
  SetChild,
  Style,
  Vanilla,
  Watch,
  SetInner,
  HandleEvent,
  validate,
  Print,
  Err,
  AlertDialog,
  Text,
  ApplyState,
  _Text,
  RemoveClass,
  RenderInner,
  Row,
  Column,
  SizedBox,
  SwitchBar,
  SnackBar,
  SpriteSheet,
  StateWithEffect,
  FutureCreator,
  Button,
  Timer,
  UpdateState,
  UseSpriteSheet,
  UseFontAwesomeIcon,
  animate,
  GetDocument,
} from "../lib/state";
import { NITEStyle } from "./types";

export type Axis = "horizontal" | "vertical";

export type MediaQueryProps = {
  query?: string;
  output: () => void;
};

export type TimerOptions = {
  Duration: number;
  type?: "once" | "loop";
  callback: () => void;
};

export type AlertDialogProps = {
  icon?: string;
  message: string;
  page?: string;
};

export type TypingText = {
  start: (text: string, speed?: number) => void;
  stop: () => void;
};

export type GetDocumentProps = {
  type: keyof HTMLElementTagNameMap;
  value?: string;
};

export type Props = {
  variant?: "primary" | "contained" | "outlined";
  text: string;
  icon?: string;
};


export class Layout {
  CreateNode!: (name: string) => HTMLElement;
  SetChild!: (prev: Node, ...nodes: Node[]) => void;
  SetInner!: (node: { innerHTML: any }, content: any) => void;
  RenderInner!: (node: HTMLElement, initialValue: any, axis: string) => any[];
  Style!: (node: HTMLElement, className: string) => void;
  CreateClass!: (resourceName: string, resources?: string[]) => void;
  RemoveClass!: (node: HTMLElement, className: string) => void;

  Row!: (axis: string, opts: { children: HTMLElement[]; callback?: Array<(() => void) | null> }) => HTMLDivElement;
  Column!: (axis: string, opts: { children: HTMLElement[]; callback?: Array<(() => void) | null> }) => HTMLDivElement;

  SizedBox!: (axis: Axis, value: number) => HTMLDivElement;
  Vanilla!: (node: HTMLElement, styles: NITEStyle) => void;
  MediaQuery!: (opts: MediaQueryProps) => void;
  Timer!: (opts: TimerOptions) => (() => void) | void;

  Watch!: <T>(
    initialValue: T
  ) => [() => T, (v: T | ((p: T) => T)) => void, (obs: () => void) => void];

  ApplyState!: (initialValue: any) => any[];
  SwitchState!: any;

  FutureCreator!: (opts: {
    future: (() => Promise<any>) | Promise<any>;
    suspense?: (() => Node) | Node;
    output: (result: any) => void;
    target: Node;
  }) => Promise<void>;

  UpdateState!: (node: HTMLElement, initialValue: string) => [() => string, (v: string) => void];

  HandleEvent!: (node: { addEventListener: (e: any, cb: () => void) => void }, type: any, run?: () => void) => void;

  Validator!: any;

  SnackBar!: { ShowNiteSnackBar: (opts: Record<any, any>) => void };

  AlertDialog!: (opts: AlertDialogProps) => void;

  Text!: (node: HTMLElement, text: string) => void;

  _Text!: TypingText;

  GetDocument!: (opts: GetDocumentProps) => Element | null;

  Print!: (value: any) => void;
  Err!: (error: any) => void;

  SwitchBar!: (opts: {
    activeColor?: string;
    inactiveColor?: string;
    activeTrackColor?: string;
    inActiveTrackColor?: string;
    isClicked: (v: boolean) => void;
  }) => HTMLDivElement;

  SpriteSheet!: (items?: string[], design?: Record<string, string>, position?: [number, number]) => HTMLImageElement;

  Button!: (opts: Props) => HTMLButtonElement;

  UseSpriteSheet!: () => {
    canvas: HTMLCanvasElement;
    createSprite: (opts: {
      spriteSrc: string;
      placement?: { width: number; height: number; columns: number; rows: number };
      time?: number;
    }) => void;
  };

  UseFontAwesomeIcon!: (opts: { iconStyle: string }) => HTMLElement;

  animate!: Animation;

  routes: any[] = [];

  constructor() {
    Object.assign(this, {
      CreateNode,
      SetChild,
      SetInner,
      RenderInner,
      Style,
      CreateClass,
      RemoveClass,
      Row,
      Column,
      SizedBox,
      Vanilla,
      MediaQuery,
      Timer,
      Watch,
      ApplyState,
      FutureCreator,
      UpdateState,
      HandleEvent,
      SnackBar,
      AlertDialog,
      Text,
      _Text,
      GetDocument,
      Print,
      Err,
      SwitchBar,
      SpriteSheet,
      Button,
      UseSpriteSheet,
      UseFontAwesomeIcon,
      animate
    });
  }

  initializeRoute(route: any[] = []) {
    this.routes.push(...route);
  }

  onMount() {}
  onDestroy() {}
}