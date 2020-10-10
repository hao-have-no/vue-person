import { RouteConfig } from 'vue-router';
import Layout from '@/layout/index.vue'

export const playerRoutes: RouteConfig={
    path:'/players',
    component: Layout,
    meta:{
        title:'playerMgt',//il8n信息需要额外处理
        icon:'peoples'
    },
    children: [
        {
            path: 'list',
            component: ()=> import('@/views/player/list.vue'),
            meta:{
                title:'playerList',
                icon:'list'
            }
        },
      {
        path: 'create',
        component: ()=> import('@/views/player/create.vue'),
        meta:{
          title:'createPlayer',
          icon:'edit'
        }
      },
    ]
}
