import LocalStorageService from "./LocalStorageService";

const USERS_LS_NAME = "users";

class UserService {
  static getAllUsers() {
    let users = LocalStorageService.get(USERS_LS_NAME);
    if (!users) {
      users = [];
    }
    return users;
  }

  static addUser(userName) {
    const user = {
      id: crypto.randomUUID(),
      name: userName,
    };
    const oldList = this.getAllUsers();
    LocalStorageService.set(USERS_LS_NAME, [...oldList, user]);
    return [...oldList, user];
  }

  static removeUser(userId) {
    const finalList = this.getAllUsers().filter(u => u.id !== userId);
    LocalStorageService.set(USERS_LS_NAME, finalList);
    return finalList;
  }
}

export default UserService;
