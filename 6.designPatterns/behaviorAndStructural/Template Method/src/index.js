import OrderBusiness from "./business/orderBusiness.js";
import Order from "./entities/order.js";


const order = new Order({
  customerId: '2',
  amount: 777,
  products: [{ description: 'banheiro' }]
})

const orderBusiness = new OrderBusiness()

console.log('Order create', orderBusiness.create(order))
