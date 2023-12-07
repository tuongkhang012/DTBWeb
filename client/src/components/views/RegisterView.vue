<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
                <form  
                id="formBox"
                class="text-center px-5 bg-white rounded border border-primary"
                @submit.prevent="handleRegister"
                >
                    <h1> Register </h1>
                    <div id="formContent">
                        <!-- Name -->
                        <div class="row">
                            <div class="col text-start">
                                <label>Name:</label>
                                <input
                                type="text"
                                id="name"
                                class="form-control mb-2"
                                placeholder="Enter name"
                                v-model="register.Name"
                                required
                                />
                            </div>
                            <div class="col text-start">
                                <label>Last name:</label>
                                <input
                                type="text"
                                id="Lname"
                                class="form-control mb-2"
                                placeholder="Enter last name"
                                v-model="register.Lname"
                                required
                                />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col text-start">
                                <label>Gender:</label>
                                <br/>
                                <label class="m-2">
                                <input class="form-check-input me-1" v-model="register.Sex"
                                type="radio" value="M" required>Male</label>
                                <label class="m-2">
                                <input class="form-check-input me-1" v-model="register.Sex"
                                type="radio" value="F">Female</label>
                            </div>
                            <div class="col text-start">
                                <label>Are you a Student?</label>
                                <br/>
                                <label class="m-2">
                                <input class="form-check-input me-1" v-model="register.Role"
                                type="radio" value="student" required>Yes</label>
                                <label class="m-2">
                                <input class="form-check-input me-1" v-model="register.Role"
                                type="radio" value="lecturer">No</label>
                            </div>
                        </div>
                        <div class="row" v-if="renderStudent === 'student' ">
                            <div class="col text-start">
                                <label>Student code:</label>
                                <input
                                type="text"
                                id="Stucode"
                                class="form-control mb-2"
                                placeholder="Enter student code"
                                v-model="register.StudentID"
                                required
                                />
                            </div>
                            <div class="col text-start">
                                <label>Class code:</label>
                                <input
                                type="text"
                                id="Clcode"
                                class="form-control mb-2"
                                placeholder="Enter class code"
                                v-model="register.Class"
                                required
                                />
                            </div>
                        </div>
                        <div class="row" v-if="renderStudent === 'lecturer' ">
                            <div class="col text-start">
                                <label>Lecturer code:</label>
                                <input
                                type="text"
                                id="Leccode"
                                class="form-control mb-2"
                                placeholder="Enter lecturer code"
                                v-model="register.EmployeeID"
                                required
                                />
                            </div>
                        </div>
                        <!-- Username -->
                        <div class="row">
                            <div class="col text-start">
                                <label>Username:</label>
                                <input
                                type="text"
                                id="username"
                                class="form-control mb-2"
                                placeholder="Enter username"
                                v-model="register.Username"
                                required
                                />
                            </div>
                        </div>
                        <!-- Address -->
                        <div class="row">
                            <div class="col text-start">
                                <label>Address:</label>
                                <input
                                type="text"
                                id="address"
                                class="form-control mb-2"
                                placeholder="Enter address"
                                v-model="register.Address"
                                required
                                />
                            </div>
                        </div>
                        <!-- Birthdate -->
                        <div class="row">
                            <div class="col text-start">
                                <label>Birthdate:</label>
                                <input
                                type="date"
                                id="birthdate"
                                class="form-control mb-2"
                                placeholder="Enter birthdate"
                                v-model="register.BirthDate"
                                required
                                />
                            </div>
                        </div>
                        <!-- Email -->
                        <div class="row">
                            <div class="col text-start">
                                <label>Email:</label>
                                <input
                                type="email"
                                id="email"
                                class="form-control mb-2"
                                placeholder="Enter email"
                                v-model="register.Email"
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
                                placeholder="Password"
                                v-model="register.Password"
                                required
                                />
                            </div>
                        </div>
                    </div>
                    <p>
                    Have an account already? <router-link to="/login">Login instead!</router-link>
                    <!-- Sign up button -->
                    </p>
                    <div>
                        <button class="btn btn-primary btn-block mt-2 mb-3 mx-auto" type="submit">
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
            <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">
                {{ message }}
            </div>
        </div>
    </div>
</template>

<script>
//   import axios from "../api/api.js";
//   import swal from "sweetalert";
    export default {
        name: "RegisterView",
        data() {
            return {
                successful: false,
                retypepassword: "",
                message: "",
                register: {
                    Role: "",
                    Username: "",
                    Name: "",
                    Lname: "",
                    Sex: "",
                    Address: "",
                    BirthDate: "",
                    Email: "",
                    Password: "",
                    Class: "",
                    StudentID: "",
                    EmployeeID: "",
                },
            };
        },
        computed: {
            renderStudent() {
                return this.register.Role
            },
            loggedIn() {
                return this.$store.state.status.loggedIn;
            },
        },
        mounted() {
            if (this.loggedIn) {
                this.$router.push("/profile");
            }
        },
        methods: {
            handleRegister() {
                console.log(this.register)
                this.$store.dispatch("register", this.register).then(
                    (data) => {
                        this.message = data.message;
                        this.successful = true;
                    },
                    (error) => {
                        this.message =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                        this.successful = false;
                    }
                );
            }
        }
    };
</script>

<style scoped>
#formBox {
    margin-top:40px;
    height:auto;
    padding-top:30px;
}
#formContent {
    width: auto;
    height: 360px;
    padding-left:15px;
    padding-right:15px;
    overflow-x: hidden;
    overflow-y: auto;
}
h1 {
    font-size: 64px;
    font-weight: 700px;
}
</style>