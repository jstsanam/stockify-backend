export class UserProfileDTO {
  constructor(user) {
    this.name = user.name;
    this.email = user.email;
    this.gender = user.gender;
  }
}

export class UserWatchlistDTO {
  constructor(user) {
    this.watchlist = user.watchlist;
  }
}