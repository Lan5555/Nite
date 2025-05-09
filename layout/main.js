import {App} from "../app.js";
import {render} from "../lib/state.js";
import '../lib/style.css';
import '../global.css';

const rootElement = document.getElementById('app');

render(App,rootElement);

