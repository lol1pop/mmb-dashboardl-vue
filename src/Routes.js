import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/Layout/Layout';

// Pages
import Dashboard from '@/pages/Dashboard/Dashboard';
import Tables from '@/pages/Tables/Basic'
import Notifications from '@/pages/Notifications/Notifications'
import Error from "@/pages/Error/Error";
import Login from "@/pages/Login/Login";
import AllUsers from "@/pages/users/AllUsers";
import InfoUser from "@/pages/users/InfoUser";
import Request from  "@/pages/request/request"

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
    path: '/',
    redirect: 'login',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
      },
      {
        path: 'tables',
        name: 'Tables',
        component: Tables
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications
      },
      {
        path: 'allusers',
        name: 'All users',
        component: AllUsers
      },
      {
        path: 'infousers',
        name: 'Info users',
        component: InfoUser,
        props: true
      },
      {
        path: 'request',
        name: 'Request',
        component: Request,
        props: true
      }
    ],
  },
    {
      path: '*',
      name: 'Error',
      component: Error
    }
  ],
});
