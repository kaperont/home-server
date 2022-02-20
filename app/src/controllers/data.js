import UserService from '../controllers/UserService'
import { useStorage } from "vue3-storage";

const storage = useStorage();

class User {
    constructor(userID, firstName, lastName, username, password, role, email, phone) {
        this.userID = userID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.role = role;
        this.email = email;
        this.phone = phone;
    }

    static UserFromObject(user) {
        return new User(user._id, user.firstName, user.lastName, user.username, user.password, user.role, user.email, user.phone);
    }

    static async UserFromID(userID) {
        // Create a user from a userID; otherwise, return an empty user
        try {
            const users = await UserService.getUserByID(userID);
            if(users.length) {
                return User.UserFromObject(user[0]);
            }
        } catch(err) {
            console.log(err);
            return new User();
        }
    }

    // Getters
    getUserID() {
        return this.userID;
    }
}

export {User}