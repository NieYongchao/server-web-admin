import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoriesEdit from '../views/CategoriesEdit.vue'
import CategoriesList from '../views/CategoriesList.vue'
import ItemsEdit from '../views/ItemsEdit.vue'
import ItemsList from '../views/ItemsList.vue'
import HeroesEdit from '../views/HeroesEdit.vue'
import HeroesList from '../views/HeroesList.vue'
import ArticlesEdit from '../views/ArticlesEdit.vue'
import ArticlesList from '../views/ArticlesList.vue'
import AdsEdit from '../views/AdsEdit.vue'
import AdsList from '../views/AdsList.vue'
import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login', component: Login, meta: { isPublic: true }
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      { path: '/categories/create', component: CategoriesEdit },
      { path: '/categories/edit/:id', component: CategoriesEdit, props: true },
      { path: '/categories/list', component: CategoriesList },

      { path: '/items/create', component: ItemsEdit },
      { path: '/items/edit/:id', component: ItemsEdit, props: true },
      { path: '/items/list', component: ItemsList },

      { path: '/heroes/create', component: HeroesEdit },
      { path: '/heroes/edit/:id', component: HeroesEdit, props: true },
      { path: '/heroes/list', component: HeroesList },

      { path: '/articles/create', component: ArticlesEdit },
      { path: '/articles/edit/:id', component: ArticlesEdit, props: true },
      { path: '/articles/list', component: ArticlesList },

      { path: '/ads/create', component: AdsEdit },
      { path: '/ads/edit/:id', component: AdsEdit, props: true },
      { path: '/ads/list', component: AdsList },

      { path: '/admin_users/create', component: AdminUserEdit },
      { path: '/admin_users/edit/:id', component: AdminUserEdit, props: true },
      { path: '/admin_users/list', component: AdminUserList },
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if(!to.meta.isPublic && !localStorage.getItem('token')) {
    return next('/login')
  }
  next()
})

export default router
