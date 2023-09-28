import * as EdgeNodeService from '@/services/edge-node-services'
import * as Service from '@/services/edge-node-service-services'

/** @type {import('vue-router').RouteRecordRaw} */
export const edgeNodeRoutes = {
  path: '/edge-node',
  name: 'edge-node',
  children: [
    {
      path: '',
      name: 'list-edge-node',
      component: () => import('@views/EdgeNode/ListView.vue'),
      props: {
        listEdgeNodeService: EdgeNodeService.listEdgeNodeService,
        deleteEdgeNodeService: EdgeNodeService.deleteEdgeNodeService,
        authorizeEdgeNodeService: EdgeNodeService.authorizeEdgeNodeService
      },
      meta: {
        breadCrumbs: [
          {
            label: 'Edge Node',
            to: '/edge-node'
          }
        ]
      }
    },
    {
      path: 'edit/:id',
      name: 'edit-edge-node',
      component: () => import('@views/EdgeNode/EditView.vue'),
      props: {
        loadEdgeNodeService: EdgeNodeService.loadEdgeNodeService,
        editEdgeNodeService: EdgeNodeService.editEdgeNodeService,
        listService: Service.listService
      },
      meta: {
        breadCrumbs: [
          {
            label: 'Edge Nodes',
            to: '/edge-node'
          },
          {
            label: 'Edit Edge Node'
          }
        ]
      }
    },
    {
      path: 'edit/:id/service',
      name: 'edit-edge-node-service',
      component: () => import('@views/EdgeNode/EditView.vue'),
      props: {
        loadEdgeNodeService: EdgeNodeService.loadEdgeNodeService,
        editEdgeNodeService: EdgeNodeService.editEdgeNodeService,
        listService: Service.listService,
        deleteService: Service.deleteService
      },
      meta: {
        breadCrumbs: [
          {
            label: 'Edge Nodes',
            to: '/edge-node'
          },
          {
            label: 'Edit Edge Node'
          }
        ]
      }
    },
    {
      path: 'edit/:id/service/add',
      name: 'add-service-edge-node',
      component: () => import('@views/EdgeNode/AddServiceEdgeNode.vue'),
      props: {
        listService: Service.listService,
        addService: Service.addService
      },
      meta: {
        breadCrumbs: [
          {
            label: 'Edge Nodes',
            to: '/edge-node'
          },
          {
            label: 'Edit Edge Node'
          }
        ]
      }
    }
  ]
}
