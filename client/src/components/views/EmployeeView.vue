<template>
    <div>
        <h2 class="mt-4">Employees</h2>
        <div class="float-end me-4 mb-2 p-2">
            <button type="button" class="btn btn-primary"
            data-bs-toggle="modal" data-bs-target="#inputEmployee" @click="Create">Add employee</button>
        </div>
        <div>
            <table class="table table-striped table-hover table-bordered border-secondary" >
                <thead>
                    <tr>
                    <th scope="col">EmployeeID</th>
                    <th scope="col">Lecturer</th>
                    <th scope="col">Worker</th>
                    <th scope="col">Name</th>
                    <th scope="col">Last name</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Birthdate</th>
                    <th scope="col">Address</th>
                    <th scope="col">Email</th>
                    <th scope="col">Salary</th>
                    <th scope="col">Years of Service</th>
                    <th scope="col">Task</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(employee, index) in employees" :key="index">
                        <td>{{ employee.EmployeeID }}</td>
                        <td><p v-if="employee.LecturerType">✓</p></td>
                        <td><p v-if="employee.WorkerType">✓</p></td>
                        <td>{{ employee.Name }}</td>
                        <td>{{ employee.Lname }}</td>
                        <td>{{ employee.Sex }}</td>
                        <td>{{ employee.BirthDate }}</td>
                        <td>{{ employee.Address }}</td>
                        <td>{{ employee.Email }}</td>
                        <td>{{ employee.Salary }}</td>
                        <td>{{ employee.YearsOfService }}</td>
                        <td>{{ employee.AssignedTask }}</td>
                        <td>
                            <button type="button" class="btn me-2 btn-info" data-bs-toggle="modal"
                            data-bs-target="#inputEmployee" @click="Update(employee)">Edit</button>
                            <button type="button" class="btn btn-danger" 
                            @click="Delete(employee.EmployeeID)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <!-- Modal -->
        <div class="modal fade" id="inputEmployee" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-lg d-flex justify-content-center">
                <div class="modal-content w-75">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ employeeModal.txtTitle }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body p-4">
                        <form>
                            <div class="row mb-4">
                                <div class="col">
                                    <label>EmployeeID:</label>
                                    <input v-model="employeeModal.dataEmployee.EmployeeID" type="text" placeholder="EmployeeID" 
                                        class="form-control" required />
                                </div>
                            </div>

                            <div class="row">
                                <div class="col mb-4">
                                    <label>Name:</label>
                                    <input v-model="employeeModal.dataEmployee.Name" type="text" placeholder="Name" 
                                        class="form-control" required />
                                </div>
                                <div class="col mb-4">
                                    <label>Last name:</label>
                                    <input v-model="employeeModal.dataEmployee.Lname" type="text" placeholder="Name" 
                                        class="form-control" required />
                                </div>
                            </div>
                                
                            <div class="row">
                                <div class="col">
                                    <label>Sex:</label>
                                    <br>
                                    <label class="m-1">
                                        <input class="form-check-input me-1" v-model="employeeModal.dataEmployee.Sex" 
                                            type="radio" value="F" name="optradio" required>Female</label>
                                    <label class="m-1">
                                        <input class="form-check-input me-1" v-model="employeeModal.dataEmployee.Sex" 
                                            type="radio" value="M" name="optradio">Male</label>
                                </div>

                                <div class="col mb-4">
                                    <label>Birthday:</label>
                                    <input v-model="employeeModal.dataEmployee.BirthDate" type="date" placeholder="Birthday"
                                        class="form-control" required/>
                                </div>

                                <div class="col mb-4">
                                    <label>Class:</label>
                                    <input v-model="employeeModal.dataEmployee.Class" type="text" placeholder="Class"
                                        class="form-control" required/>
                                </div>
                            </div>

                            <div class="mb-4">
                                <label for="equipments">Type of worker:</label>
                                <div>
                                    <div class="form-group">
                                        <input class="form-check-input me-1" type="checkbox" :value=true
                                            :checked="employeeModal.dataEmployee.LecturerType"
                                            v-model="employeeModal.dataEmployee.LecturerType">
                                        <label class="form-check-label me-2">Lecturer</label>
                                        <input class="form-check-input me-1" type="checkbox" :value=true
                                            :checked="employeeModal.dataEmployee.WorkerType"
                                            v-model="employeeModal.dataEmployee.WorkerType">
                                        <label class="form-check-label me-2">Worker</label>
                                    </div>
                                </div>
                            </div>
                                
                            <div class="row mb-4">
                                <div class="col">
                                    <label>Address:</label>
                                    <input v-model="employeeModal.dataEmployee.Address" type="text" 
                                        placeholder="Address" class="form-control" required/>
                                </div>
                            </div>
                            
                            <div class="row mb-4">
                                <div class="col">
                                    <label>Email:</label>
                                    <input v-model="employeeModal.dataEmployee.Email" type="email" placeholder="Email" 
                                        class="form-control" required/>
                                </div>
                            </div>

                            <div class="row mb-4">
                                <div class="col">
                                    <label>Salary:</label>
                                    <input v-model="employeeModal.dataEmployee.Salary" type="text" placeholder="Salary" 
                                        class="form-control" required/>
                                </div>

                                <div class="col">
                                    <label>Years of Service:</label>
                                    <input v-model="employeeModal.dataEmployee.YearsOfService" type="text" placeholder="Years of Service" 
                                        class="form-control" required/>
                                </div>
                            </div>

                            <div v-if="getStatus" class="row mb-4">
                                <div class="col">
                                    <label>Assigned Task:</label>
                                    <input v-model="employeeModal.dataEmployee.AssignedTask" type="text" placeholder="Assigned Task" 
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
        this.getEmployees()
    },
    data() {
        return {
            employees: [],
            employeeModal: {
                txtTitle: "",
                submitType: null,
                dataEmployee: {
                    EmployeeID: "",
                    LecturerType: false,
                    WorkerType: false,
                    Name: "",
                    Lname: "",
                    Sex: "",
                    BirthDate: "",
                    Address: "",
                    Email: "",
                    Salary: "",
                    YearsOfService: "",
                    AssignedTask: ""
                },
            },
        };
    },
    computed: {
        getStatus() {
            return this.employeeModal.dataEmployee.WorkerType
        }
    },
    methods: {
        async getEmployees() {
            const res = await axios.get("/employees")
            this.employees = res.data;
        },
        async Create(){
            this.employeeModal = {
                txtTitle: "Creating new employee",
                submitType: "create",
                dataEmployee: {
                    EmployeeID: "",
                    Name: "",
                    Lname: "",
                    LecturerType: false,
                    WorkerType: false,
                    Sex: "",
                    BirthDate: "",
                    Address: "",
                    Email: "",
                    Salary: "",
                    YearsOfService: "",
                    AssignedTask: ""
                },
            }
        },
        async Update(employee) {
            this.employeeModal = {
                txtTitle: "Updating existing employee",
                submitType: "update",
                dataEmployee: {
                    EmployeeID: employee.EmployeeID,
                    Name: employee.Name,
                    Lname: employee.Lname,
                    LecturerType: employee.LecturerType,
                    WorkerType: employee.WorkerType,
                    Sex: employee.Sex,
                    BirthDate: employee.BirthDate,
                    Address: employee.Address,
                    Email: employee.Email,
                    Salary: employee.Salary,
                    YearsOfService: employee.YearsOfService,
                    AssignedTask: employee.AssignedTask
                },
            }
        },
        async Submit() {
            const submitType = this.employeeModal.submitType;
            const data = this.employeeModal.dataEmployee;

            if (submitType === "create") {
                await axios.post("/employee", data);
            } else {
                const { EmployeeID, ...rest } = data;
                await axios.put(`/employee/${EmployeeID}`, rest);
            }
            await this.getEmployees();
        },
        async Delete(EmployeeID) {
            await axios.delete(`/employee/${EmployeeID}`);
            await this.getEmployees();
        },
    },
};
</script>