export default class Shipment {
  update({ id, userName }) {
    /* important to remember that update is responsible  for managing your errors/exception
    you shouldn't have await in notify because notify's responsibility is just to emit events"
      */
    console.log(`[${id}]: [shipment] will pack the user's order to [${userName}]`)
  }
}
