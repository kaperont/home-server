import axios from 'axios';

const url = 'http://peront.ddns.net:3223/api/users/';

class UserService {
    // Get Users
    static getUsers() {
        return new Promise ((resolve,reject) => {
            axios.get(url).then((res) => {
                const data = res.data;
                resolve(
                    data.map(user => ({
                        ...user
                    }))
                );
            })
            .catch((err)=> {
                reject(err);
            })
        });
    }

    static getUserByID(userID) {
        const queryURL = url + '?_id=' + userID;

        return new Promise ((resolve,reject) => {
            axios.get(queryURL).then((res) => {
                const data = res.data;
                resolve(
                    data.map(user => ({
                        ...user
                    }))
                );
            })
            .catch((err)=> {
                reject(err);
            })
        });
    }

    static getUserByUsername(username) {
        const queryURL = url + '?username=' + username;

        return new Promise ((resolve,reject) => {
            axios.get(queryURL).then((res) => {
                const data = res.data;
                resolve(
                    data.map(user => ({
                        ...user
                    }))
                );
            })
            .catch((err)=> {
                reject(err);
            })
        });
    }

    static getUserByUsernamePassword(username, password) {
        const queryURL = url + '?username=' + username + '&password=' + password;

        return new Promise ((resolve,reject) => {
            axios.get(queryURL).then((res) => {
                const data = res.data;
                resolve(
                    data.map(user => ({
                        ...user
                    }))
                );
            })
            .catch((err)=> {
                reject(err);
            })
        });
    }
}

export default UserService;
