export class UserProfileDTO {
  constructor(user) {
    this.name = user.name;
    this.email = user.email;
    this.gender = user.gender;
    this.current_balance = user.current_balance;
  }
}

export class UserWatchlistDTO {
  constructor(user) {
    return user.watchlist;
  }
}

export class UserTransactionsDTO {
  constructor(user) {
    this.transactions = user.transactions;
    this.stockHoldings = user.stockHoldings;
  }
}
