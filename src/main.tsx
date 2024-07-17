import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App.tsx'
import { Provider } from 'react-redux';
import store from './redux/store.tsx';

const container = document.getElementById('root');
const root = createRoot(container! as HTMLElement); // createRoot(container!) if you use TypeScript
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);