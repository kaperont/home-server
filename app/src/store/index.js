import {User} from '../controllers/data';
import { createStore } from 'vuex';
import { useStorage } from "vue3-storage";

// Create local Storage
const storage = useStorage();

// Create and return the Application's Store
export default createStore({

  // Define the contents of the Store
  state: {
    users: [],
    activeUser: User,
    loggedIn: false
  },

  // Store/Storage Mutators
  mutations: {
    CREATE_USER(state, user) {
      state.users.push(user)
    },
    SET_USER(state, user) {
      storage.setStorageSync("user", user);
    },
    LOGIN(state, login) {
      storage.setStorageSync("login", true, 900000);
      storage.setStorageSync("username", login.login)
      storage.setStorageSync("password", login.pass)
    },
    LOGOUT(state) {
      storage.clearStorageSync();
    }
  },

  // Store/Storage Getters
  getters: {
    getUsers: state => {
      return state.users
    },
    getActiveUser: state => {
      return storage.getStorageSync("user");
    },
    getUserByID: (user) => (findUser) => {
      let userArray = state.users;
      for (let i = 0; i < userArray.length; i++) {
        if (findUser.userID ===state.users.userID[i]){
          return state.users[i];
        }
      }
    }
  }
    
});