export default class Marketing {
  update({ id, userName }) {
    /* important to remember that update is responsible  for managing your errors/exception
    you shouldn't have await in notify because notify's responsibility is just to emit events"
      */
    console.log(`[${id}]: [marketing] will send an welcome email to [${userName}]`)
  }
}
