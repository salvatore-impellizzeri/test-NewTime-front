import { createRouter, createWebHistory } from 'vue-router';
import UsersPage from './views/UsersPage.vue';

const routes = [
  {
    path: '/',
    name: 'users',
    component: UsersPage,
  },
  // {
  //   path: '/user-edit/:id',
  //   name: 'edit-user',
  //   component: EditUser,
  // },
  // {
  //   path: '/user/:id',
  //   name: 'show-user',
  //   component: ShowUser,
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
