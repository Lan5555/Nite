export {};

declare global {
  interface Window {
    theme?: string;
  }
}

declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.png" {
  const value: string;
  export default value;
}