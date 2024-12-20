import { createRouter, createWebHistory } from 'vue-router';
import UsersPage from './views/UsersPage.vue';
import EditUserPage from './views/EditUserPage.vue';
import CreateUserPage from './views/CreateUserPage.vue';

const routes = [
  {
    path: '/',
    name: 'users',
    component: UsersPage,
  },
  {
    path: '/user-edit/:id',
    name: 'edit-user',
    component: EditUserPage,
  },
  {
    path: '/user-create',
    name: 'create-user',
    component: CreateUserPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
