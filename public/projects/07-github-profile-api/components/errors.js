export class UserNameNotFound extends Error{
  constructor(message){
    super(message)
    this.name = "UserNameNotFound"
  }
}

export class FailedFetch extends Error{
  constructor(message){
    super(message)
    this.name = "FailedFetch"
  }
}