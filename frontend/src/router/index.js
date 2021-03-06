import Vue from 'vue';
import Router from 'vue-router';

// import your views here
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import RouteFormView from '../views/RouteFormView.vue';
import RoutesView from '../views/RoutesView.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login/',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/route/',
      name: 'Route',
      component: RouteFormView,
    },
    {
      path: '/routes/',
      name: 'Routes',
      component: RoutesView,
    },
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
  ],
});
