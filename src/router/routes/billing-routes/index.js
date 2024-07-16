import * as BillingServices from '@/services/billing-services'
import * as ContractServices from '@/services/contract-services'

import * as Helpers from '@/helpers'

/** @type {import('vue-router').RouteRecordRaw} */
export const billingRoutes = {
  path: '/billing',
  name: 'billing',
  children: [
    {
      path: ':tab?',
      name: 'billing-tabs',
      component: () => import('@views/Billing/TabsView.vue'),
      props: {
        loadPaymentMethodDefaultService: BillingServices.loadPaymentMethodDefaultService,
        addCreditService: BillingServices.addCreditService,
        createPaymentMethodService: BillingServices.createPaymentMethodService,
        paymentServices: {
          listPaymentMethodsService: BillingServices.listPaymentMethodsService,
          deletePaymentService: BillingServices.deletePaymentService,
          setAsDefaultPaymentService: BillingServices.setAsDefaultPaymentService,
          documentPaymentMethodService: Helpers.documentationGuideProducts.paymentMethods
        },
        billsServices: {
          listPaymentHistoryService: BillingServices.listPaymentHistoryService,
          clipboardWrite: Helpers.clipboardWrite,
          documentPaymentHistoryService: Helpers.documentationGuideProducts.paymentHistory,
          loadYourServicePlanService: BillingServices.loadYourServicePlanService,
          openPlans: Helpers.openShowMorePlan,
          loadContractServicePlan: ContractServices.loadContractServicePlan
        }
      },
      meta: {
        breadCrumbs: [
          {
            label: 'Billing',
            to: '/billing'
          }
        ]
      }
    },
    {
      path: 'invoice-details',
      name: 'billing-invoice-details',
      component: () => import('@/views/Billing/InvoiceDetailsView.vue')
    }
  ]
}
