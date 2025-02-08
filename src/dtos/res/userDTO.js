export class UserDTO {
  constructor(user) {
    this.name = user.name;
    this.email = user.email;
    this.current_balance = user.current_balance;
    this.transactions = user.transactions;
  }
}
