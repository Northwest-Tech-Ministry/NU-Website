import { createApp } from 'vue';
import App from './App.vue'; // Your main App component
import router from './router'; // Your Vue Router setup file

// Import global styles and any libraries you want to use
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './assets/labs.css'; // Import lab CSS here
import './assets/global.css'; // Import global CSS here

const app = createApp(App);

// Use the router
app.use(router);

// Mount the app
app.mount('#app');
