import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
const login = (resolve) => { require(['@/components/login'], resolve) }
const home = (resolve) => { require(['@/components/home'], resolve) }
const commentList = (resolve) => { require(['@/components/content/commentList'], resolve) }
const commentDetail = (resolve) => { require(['@/components/content/commentDetail'], resolve) }
const ArticleList = (resolve) => { require(['@/components/content/articleList'], resolve) }
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: login,
      meta: {
        other: {
          open: [],
          active: ''
        }
      }
    },
    {
      path: '/',
      name: 'Main',
      component: Main,
      meta: {
        other: {
          open: []
        }
      },
      children: [
        {
          path: '/home',
          name: 'Home',
          title: '首页',
          component: home,
          meta: {
            other: {
              open: ['']
            }
          }
        }
      ]
    },
    {
      path: '/content',
      name: 'content',
      title: '内容管理',
      component: Main,
      children: [
        {
          path: '/commentList',
          name: 'CommentList',
          title: '评论管理',
          component: commentList,
          meta: {
            list: {
              grouping: '内容管理',
              page: '评论管理'
            },
            other: {
              open: ['1']
            }
          }
        },
        {
          path: '/commentDetail',
          name: 'CommentList',
          title: '评论管理添加&修改',
          component: commentDetail,
          meta: {
            list: {
              grouping: '内容管理',
              page: '评论管理添加&修改'
            },
            other: {
              open: ['1']
            }
          }
        },
        {
          path: '/ArticleList',
          name: 'ArticleList',
          title: '文章管理',
          component: ArticleList,
          meta: {
            list: {
              grouping: '内容管理',
              page: '文章管理'
            },
            other: {
              open: ['1']
            }
          }
        }
      ]
    }
  ]
})
