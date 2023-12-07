<template>
    <div>
        <h2 class="mt-4">Students</h2>
        <div class="float-end me-4 mb-2 p-2">
            <button type="button" class="btn btn-primary"
            data-bs-toggle="modal" data-bs-target="#inputStudent" @click="Create">Add student</button>
        </div>
        <div>
            <table class="table table-striped table-hover table-bordered border-secondary" >
                <thead>
                    <tr>
                    <th scope="col">StudentID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Last name</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Birthdate</th>
                    <th scope="col">Address</th>
                    <th scope="col">Email</th>
                    <th scope="col">Class</th>
                    <th scope="col">GPA</th>
                    <th scope="col">Total credits</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(student, index) in students" :key="index">
                        <td>{{ student.StudentID }}</td>
                        <td>{{ student.Name }}</td>
                        <td>{{ student.Lname }}</td>
                        <td>{{ student.Sex }}</td>
                        <td>{{ student.BirthDate }}</td>
                        <td>{{ student.Address }}</td>
                        <td>{{ student.Email }}</td>
                        <td>{{ student.Class }}</td>
                        <td>{{ student.GPA }}</td>
                        <td>{{ student.TotalCredit }}</td>
                        <td>
                            <button type="button" class="btn me-2 btn-info" data-bs-toggle="modal"
                            data-bs-target="#inputStudent" @click="Update(student)">Edit</button>
                            <button type="button" class="btn btn-danger" 
                            @click="Delete(student.StudentID)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <!-- Modal -->
        <div class="modal fade" id="inputStudent" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-lg d-flex justify-content-center">
                <div class="modal-content w-75">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ studentModal.txtTitle }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body p-4">
                        <form>
                            <div class="row mb-4">
                                <div class="col">
                                    <label>StudentID:</label>
                                    <input v-model="studentModal.dataStudent.StudentID" type="text" placeholder="StudentID" 
                                        class="form-control" required />
                                </div>
                            </div>

                            <div class="row">
                                <div class="col mb-4">
                                    <label>Name:</label>
                                    <input v-model="studentModal.dataStudent.Name" type="text" placeholder="Name" 
                                        class="form-control" required />
                                </div>
                                <div class="col mb-4">
                                    <label>Last name:</label>
                                    <input v-model="studentModal.dataStudent.Lname" type="text" placeholder="Name" 
                                        class="form-control" required />
                                </div>
                            </div>
                                
                            <div class="row">
                                <div class="col">
                                    <label>Sex:</label>
                                    <br>
                                    <label class="m-1">
                                        <input class="form-check-input me-1" v-model="studentModal.dataStudent.Sex" 
                                            type="radio" value="F" name="optradio" required>Female</label>
                                    <label class="m-1">
                                        <input class="form-check-input me-1" v-model="studentModal.dataStudent.Sex" 
                                            type="radio" value="M" name="optradio">Male</label>
                                </div>

                                <div class="col mb-4">
                                    <label>Birthday:</label>
                                    <input v-model="studentModal.dataStudent.BirthDate" type="date" placeholder="Birthday"
                                        class="form-control" required/>
                                </div>

                                <div class="col mb-4">
                                    <label>Class:</label>
                                    <input v-model="studentModal.dataStudent.Class" type="text" placeholder="Class"
                                        class="form-control" required/>
                                </div>
                            </div>
                                
                            <div class="row mb-4">
                                <div class="col">
                                    <label>Address:</label>
                                    <input v-model="studentModal.dataStudent.Address" type="text" 
                                        placeholder="Address" class="form-control" required/>
                                </div>
                            </div>
                            
                            <div class="row mb-4">
                                <div class="col">
                                    <label>Email:</label>
                                    <input v-model="studentModal.dataStudent.Email" type="email" placeholder="Email" 
                                        class="form-control" required/>
                                </div>
                            </div>

                            <div class="row mb-4">
                                <div class="col">
                                    <label>GPA:</label>
                                    <input v-model="studentModal.dataStudent.GPA" type="text" placeholder="GPA" 
                                        class="form-control" required/>
                                </div>

                                <div class="col">
                                    <label>Total Credit:</label>
                                    <input v-model="studentModal.dataStudent.TotalCredit" type="text" placeholder="Total Credit" 
                                        class="form-control" required/>
                                </div>
                            </div>
                            <!-- Submit button -->
                            <button type="submit" class="btn btn-primary btn-block" @click="Submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "../../api/api.js";

export default {
    name: "SchoolView",
    async mounted(){
        this.getStudents()
    },
    data() {
        return {
            students: [],
            studentModal: {
                txtTitle: "",
                submitType: null,
                dataStudent: {
                    StudentID: "",
                    Name: "",
                    Lname: "",
                    Sex: "",
                    BirthDate: "",
                    Address: "",
                    Email: "",
                    Class: "",
                    GPA: "",
                    TotalCredit: ""
                },
            },
        };
    },
    methods: {
        async getStudents() {
            const res = await axios.get("/students")
            this.students = res.data;
        },
        async Create(){
            this.studentModal = {
                txtTitle: "Creating new student",
                submitType: "create",
                dataStudent: {
                    StudentID: "",
                    Name: "",
                    Lname: "",
                    Sex: "",
                    BirthDate: "",
                    Address: "",
                    Email: "",
                    Class: "",
                    GPA: "",
                    TotalCredit: ""
                },
            }
        },
        async Update(student) {
            this.studentModal = {
                txtTitle: "Updating existing student",
                submitType: "update",
                dataStudent: {
                    StudentID: student.StudentID,
                    Name: student.Name,
                    Lname: student.Lname,
                    Sex: student.Sex,
                    BirthDate: student.BirthDate,
                    Address: student.Address,
                    Email: student.Email,
                    Class: student.Class,
                    GPA: student.GPA,
                    TotalCredit: student.TotalCredit
                },
            }
        },
        async Submit() {
            const submitType = this.studentModal.submitType;
            const data = this.studentModal.dataStudent;

            if (submitType === "create") {
                await axios.post("/student", data);
            } else {
                const { StudentID, ...rest } = data;
                await axios.put(`/student/${StudentID}`, rest);
            }
            await this.getStudents();
        },
        async Delete(StudentID) {
            await axios.delete(`/student/${StudentID}`);
            await this.getStudents();
        },
    },
};
</script>