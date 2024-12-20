import { createRouter, createWebHistory } from 'vue-router';
import UsersPage from './views/UsersPage.vue';
import EditUserPage from './views/EditUserPage.vue';
import CreateUserPage from './views/CreateUserPage.vue';
import NotFoundPage from './views/NotFoundPage.vue';

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
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
