import Payment from './events/payment.js'
import Marketing from './observers/marketing.js'
import Shipment from './observers/shipment.js'
import PaymentSubject from './subjects/paymentSubject.js'

const subject = new PaymentSubject()
const marketing = new Marketing()

subject.subscribe(marketing)

const shipment = new Shipment()
subject.subscribe(shipment)

const payment = new Payment(subject)
const user1 = { id: Date.now(), userName: 'bruno fay' }
payment.creditCard(user1)

subject.unsubscribe(marketing)

/*will fire only for the shipment observer!  */
const user2 = { id: Date.now(), userName: 'alessandra latorre' }
payment.creditCard(user2)

