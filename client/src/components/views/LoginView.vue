<template>
    <div class="container">
        <div class="row">
            <div class="offset-lg-3 col-lg-6 offset-lg-3">
                <form  
                id="formBox"
                class="text-center px-5 bg-white rounded border border-primary"
                @submit.prevent="handleLogin"
                >
                <h1> Login </h1>
                <div id="formContent">
                    <!-- Username -->
                    <div class="row">
                        <div class="col text-start">
                            <label>Username:</label>
                            <input
                            type="text"
                            id="username"
                            class="form-control mb-2"
                            placeholder="Enter username"
                            v-model="loginUser.Username"
                            required
                            />
                        </div>
                    </div>
                    <!-- Password -->
                    <div class="row">
                        <div class="col text-start">
                            <label>Password:</label>
                            <input
                            type="password"
                            id="password"
                            class="form-control mb-2"
                            placeholder="Enter password"
                            v-model="loginUser.Password"
                            required
                            />
                        </div>
                    </div>
                </div>
                <p>
                    Forgot password? <router-link to="#">Click here!</router-link>
                </p>
                <p>
                    Don't have an account? <router-link to="/register">Sign up here!</router-link>
                </p>
                <!-- Login button -->
                <button class="btn btn-primary btn-block mb-4" type="submit">
                    Login
                </button>
                </form>
            </div>
        </div>
        <div v-if="message" class="alert alert-danger">
            {{ message }}
        </div>
    </div>
</template>

<script>
//import axios from "../api/api.js";
//import swal from "sweetalert";
export default {
    name: "LoginView",
    data() {
        return {
            message: "",
            loginUser: {
                Username: "",
                Password: ""
            }
        };
    },
    computed: {
        loggedIn() {
            return this.$store.state.status.loggedIn;
        }
    },
    created() {
        if(this.loggedIn){
            this.$router.push("/profile")
        }
    },
    methods: {
        async handleLogin() {
            try {
                await this.$store.dispatch("login", this.loginUser);
                this.$router.push("/profile");
            } catch (error) {
                this.message =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
            }
        }
    },
};
</script>

<style scoped>
#formBox {
    margin-top:120px;
    height:auto;
    padding-top:30px;
}
h1 {
    font-size: 64px;
    font-weight: 700px;
}
</style>