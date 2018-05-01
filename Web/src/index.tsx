//import 'bulma/css/bulma.css'
import App from './components/app';
import { h, render } from 'preact';
import { Provider } from 'redux-zero/preact'

let root;
import store from "./store";

function init() {
    root = render(
         <Provider store={store}>
            <App />
         </Provider>
        , document.body, root);
}

init();





