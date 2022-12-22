class User {
  constructor({name,id,birthday,profession}){
    this.name = name
    this.id = parseInt(id)
    this.birthday = parseInt(birthday)
    this.profession = profession
  }
}

module.exports = User