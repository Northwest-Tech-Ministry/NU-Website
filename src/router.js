import { createRouter, createWebHistory } from 'vue-router';
import News from './pages/News.vue';
import Overview from './pages/Overview.vue';
import General from './pages/General.vue';
import Guidance from './pages/Guidance.vue';
import Honesty from './pages/Honesty.vue';
import Reference from './pages/Reference.vue';
import Tools from './pages/Tools.vue';
import Xv6 from './pages/Xv6.vue';

import Labutil from './labs/util.vue';

const routes = [
  { path: '/', name: 'News', component: News },
  { path: '/overview', name: 'Overview', component: Overview },
  { path: '/general', name: 'General', component: General },
  { path: '/guidance', name: 'Guidance', component: Guidance },
  { path: '/honesty', name: 'Honesty', component: Honesty },
  { path: '/reference', name: 'Reference', component: Reference },
  { path: '/tools', name: 'Tools', component: Tools },
  { path: '/xv6', name: 'Xv6', component: Xv6 },
  { path: '/xv6-book', name: 'Xv6 Book', component: () => window.location.href = '/xv6/book-riscv-rev4.pdf' },

  // labs
  { path: '/labs/util', name: 'Lab Util', component: Labutil },
];

const router = createRouter({
   history: createWebHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
       return $('html,body').stop().animate({scrollTop: $(to.hash).offset().top - 80 }, 5);
    } else {
       return $('html,body').stop().animate({scrollTop: -80 }, 5);
    }
 }

});

export default router;