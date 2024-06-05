import ReactDOM from 'react-dom/client';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import App from '@/router/App.jsx';
import '@/global.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
// import './firebase-messaging-sw.js/index.js';
// import * as serviceWorker from './firebase-messaging-sw.js/index.js';

// serviceWorker.register();

ReactDOM.createRoot(document.getElementById('root')).render(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <App />
    </LocalizationProvider>
);
