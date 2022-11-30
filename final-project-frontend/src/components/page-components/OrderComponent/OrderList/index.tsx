import { IOrder } from 'interfaces/Order'
import React from 'react'
import OrderCard from '../OrderCard'
import OrderListWrapper from './style'

interface OrderListProp {
    orders: IOrder[]
}

const OrderList = ({orders}:OrderListProp) => {
  return (
    <OrderListWrapper>
        <div className="container py-3">
            {orders.map((order) => (
                <OrderCard order={order} />
            ))}
        </div>
    </OrderListWrapper>
  )
}

export default OrderList