export class UserProfileDTO {
  constructor(user) {
    this.name = user.name;
    this.email = user.email;
    this.gender = user.gender;
  }
}

export class UserWatchlistDTO {
  constructor(user) {
    return user.watchlist;
  }
}

export class UserTransactionsDTO {
  constructor(user) {
    return user.transactions;
  }
}
