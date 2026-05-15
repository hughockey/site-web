const routes = [
  { path: '/', component: () => import('./components/Content.vue') },
  { path: '/projects', component: () => import('./components/Projects.vue') },
  { path: '/politique-de-confidentialite', component: () => import('./components/Politique.vue') },
]

export default routes
