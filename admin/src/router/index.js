import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoriesEdit from '../views/CategoriesEdit.vue'
import CategoriesList from '../views/CategoriesList.vue'
import ItemsEdit from '../views/ItemsEdit.vue'
import ItemsList from '../views/ItemsList.vue'
import HeroesEdit from '../views/HeroesEdit.vue'
import HeroesList from '../views/HeroesList.vue'

Vue.use(VueRouter)

const routes = [
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
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
