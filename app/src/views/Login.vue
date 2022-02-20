<template>
    <div class="wrapper fadeInDown">
        <div id="formContent">
            <!-- Icon -->
            <div class="fadeIn first">
                <img src="../assets/logos/airforce-blue.png" id="icon" alt="User Icon" />
                <h2 style="font-family: Orbitron">Peront Home Server</h2>
            </div>
        
            <!-- Login Form -->
            <div v-if="failedLogin" class="failed-login">Invalid login or password</div>
            <input type="text" id="login" class="fadeIn second" name="login" placeholder="username" v-model="username" @keyup.enter="login" />
            <input type="password" id="password" class="fadeIn third" name="password" placeholder="password" v-model="password" @keyup.enter="login" />
            <input type="button" class="fadeIn fourth" value="Log In" @click="login" />
        
            <!-- Remind Password -->
            <div id="formFooter">
                <router-link to="/login" class="underlineHover">Forgot Password?</router-link>
            </div>
        </div>
    </div>
    <Loading v-show="showModal" />
</template>


<script>
import Loading from '../components/Loading.vue'

import UserService from '../controllers/UserService'
import {User} from '../controllers/data'

import store from '../store/store'

export default {
    store: store,
    data() {
        return {
            error: '',
            username: '',
            password: '',
            failedLogin: false,
            showModal: false
        }
    },
    components: {
        Loading
    },
    methods: {
        async login() {            
            try {
                this.checkStorage();
            } catch (error) {
                console.log(error);
                this.checkDatabase();
            }
        },
        async checkStorage() {
            if (this.$storage.getStorageSync("username") && this.$storage.getStorageSync("password")) {
                var uname = this.$storage.getStorageSync("username");
                var pword = this.$storage.getStorageSync("password");

                if(this.username === uname && this.password === pword) {
                    this.$store.commit('LOGIN', { uname, pword });
                    this.$router.push('/');
                }
                else {
                    this.failedLogin = true;
                    this.password = '';
                    throw new Error("User not in storage.");
                }
            }
            else {
                throw new Error("User not in storage.");
            }
        },
        async checkDatabase() {
            // Grab the user associated with the input username
            var users = [];
            try {
                // Verify the user by username/password
                users = await UserService.getUserByUsernamePassword(this.username, this.password);
            } catch(err) {
                console.log("Something went wrong when verifying your account.")
                this.error = err.message;
                console.log(this.error);

                this.failedLogin = true;
                this.password = '';
                return;
            }
            
            // If the login was successful, initialize the user's profile
            if(users.length > 0) {
                // Commit the login status to the store/local storage
                const user = User.UserFromObject(users[0]);
                var uname = this.username;
                var pword = this.password;
                this.$store.commit('LOGIN', { uname, pword });

                // Display loading modal
                this.showModal = true;

                this.$store.commit('SET_USER', user);
                
                return;
            }

            // If login was not successful, notify and return
            this.failedLogin = true;
            this.password = '';
            return;
        }        
    }
}
</script>

<style scoped>
@import '~bootstrap/dist/css/bootstrap.css';

/* STRUCTURE */

html, body {
    overflow: none;
}

.wrapper {
    position: absolute;
    display: flex;
    align-items: center;
    flex-direction: column; 
    justify-content: center;
    width: 100%;
    padding: 20px;
    padding-top: 15vh;
}

#formContent {
    -webkit-border-radius: 10px 10px 10px 10px;
    border-radius: 10px 10px 10px 10px;
    background: #fff;
    padding: 30px;
    width: 100%;
    max-width: 550px;
    position: relative;
    padding: 0px;
    -webkit-box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
    box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
    text-align: center;
}

#formFooter {
    background-color: #f6f6f6;
    border-top: 1px solid #dce8f1;
    padding: 25px;
    text-align: center;
    -webkit-border-radius: 0 0 10px 10px;
    border-radius: 0 0 10px 10px;
}

.failed-login {
    width: fit-content;
    margin: auto;
    padding: 5px 7px;
    border: 2px solid red;
    border-radius: 5px;
    background-color: #f6f6f6;
    color: red;
}

/* FORM TYPOGRAPHY*/

input[type=button], input[type=submit]  {
    background-color: #56baed;
    border: none;
    color: white;
    padding: 15px 80px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    text-transform: uppercase;
    font-size: 13px;
    -webkit-box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
    box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
    -webkit-border-radius: 5px 5px 5px 5px;
    border-radius: 5px 5px 5px 5px;
    margin: 5px 20px 40px 20px;
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -ms-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
}

input[type=button]:hover, input[type=submit]:hover  {
    background-color: #39ace7;
    cursor: pointer;
}

/*input[type=button]:active, input[type=submit]:active, input[type=reset]:active  {
    -moz-transform: scale(0.95);
    -webkit-transform: scale(0.95);
    -o-transform: scale(0.95);
    -ms-transform: scale(0.95);
    transform: scale(0.95);
}*/

input[type=text], input[type=password] {
    background-color: #f6f6f6;
    border: none;
    color: #0d0d0d;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 5px;
    width: 65%;
    border: 2px solid #f6f6f6;
    -webkit-transition: all 0.5s ease-in-out;
    -moz-transition: all 0.5s ease-in-out;
    -ms-transition: all 0.5s ease-in-out;
    -o-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
    -webkit-border-radius: 5px 5px 5px 5px;
    border-radius: 5px 5px 5px 5px;
}

input[type=text]:focus {
    background-color: #fff;
    border-bottom: 2px solid #5fbae9;
}

input[type=text]:placeholder {
    color: #cccccc;
}

/* ANIMATIONS */

/* Simple CSS3 Fade-in-down Animation */
.fadeInDown {
    -webkit-animation-name: fadeInDown;
    animation-name: fadeInDown;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
}

/* 
@-webkit-keyframes fadeInDown {
    0% {
        opacity: 0;
        -webkit-transform: translate3d(0, -25%, 0);
        transform: translate3d(0, -25%, 0);
    }
    100% {
        opacity: 1;
        -webkit-transform: none;
        transform: none;
    }
} */

@keyframes fadeInDown {
    0% {
        opacity: 0;
        -webkit-transform: translate3d(0, -25%, 0);
        transform: translate3d(0, -25%, 0);
    }
    100% {
        opacity: 1;
        -webkit-transform: none;
        transform: none;
    }
}

/* Simple CSS3 Fade-in Animation */
@-webkit-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@-moz-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }

.fadeIn {
    opacity:0;
    -webkit-animation:fadeIn ease-in 1;
    -moz-animation:fadeIn ease-in 1;
    animation:fadeIn ease-in 1;

    -webkit-animation-fill-mode:forwards;
    -moz-animation-fill-mode:forwards;
    animation-fill-mode:forwards;

    -webkit-animation-duration:1s;
    -moz-animation-duration:1s;
    animation-duration:1s;
}

.fadeIn.first {
    -webkit-animation-delay: 0.4s;
    -moz-animation-delay: 0.4s;
    animation-delay: 0.4s;
}

.fadeIn.second {
    -webkit-animation-delay: 0.6s;
    -moz-animation-delay: 0.6s;
    animation-delay: 0.6s;
}

.fadeIn.third {
    -webkit-animation-delay: 0.8s;
    -moz-animation-delay: 0.8s;
    animation-delay: 0.8s;
}

.fadeIn.fourth {
    -webkit-animation-delay: 1s;
    -moz-animation-delay: 1s;
    animation-delay: 1s;
}

/* Simple CSS3 Fade-in Animation */
.underlineHover:after {
    display: block;
    left: 0;
    bottom: -10px;
    width: 0;
    height: 2px;
    background-color: #56baed;
    content: "";
    transition: width 0.2s;
}

.underlineHover:hover {
    color: #0d0d0d;
}

.underlineHover:hover:after{
    width: 100%;
}

/* OTHERS */

*:focus {
    outline: none;
} 

#icon {
    padding-top: 2%;
    margin: 2%;
    width: 20%;
}
</style>