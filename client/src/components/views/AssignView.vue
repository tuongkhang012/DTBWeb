<template>
    <div>
        <h2 class="mt-4">Assigned List</h2>
        <div class="float-end me-4 mb-2 p-2">
            <button type="button" class="btn btn-primary"
            data-bs-toggle="modal" data-bs-target="#inputAssignedTo" @click="Create">Add new assignment</button>
        </div>
        <div>
            <table class="table table-striped table-hover table-bordered border-secondary" >
                <thead>
                    <tr>
                    <th scope="col">Semester</th>
                    <th scope="col">StudentID</th>
                    <th scope="col">LecturerID</th>
                    <th scope="col">SubjectID</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(assignedTo, index) in assignedTos" :key="index">
                        <td>{{ assignedTo.Semester }}</td>
                        <td>{{ assignedTo.StuID }}</td>
                        <td>{{ assignedTo.LecID }}</td>
                        <td>{{ assignedTo.SubjID }}</td>
                        <td>
                            <button type="button" class="btn me-2 btn-info" data-bs-toggle="modal"
                            data-bs-target="#inputAssignedTo" @click="Update(assignedTo)">Edit</button>
                            <button type="button" class="btn btn-danger" 
                            @click="Delete(assignedTo)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <!-- Modal -->
        <div class="modal fade" id="inputAssignedTo" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-lg d-flex justify-content-center">
                <div class="modal-content w-75">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ assignedToModal.txtTitle }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body p-4">
                        <form>
                            <div class="row mb-4">
                                <div class="col">
                                    <label>Semester:</label>
                                    <input v-model="assignedToModal.dataAssignedTo.Semester" type="text" placeholder="Semester" 
                                        class="form-control" required />
                                </div>
                            </div>

                            <div class="row mb-4">
                                <div class="col">
                                    <label>StudentID:</label>
                                    <input v-model="assignedToModal.dataAssignedTo.StuID" type="text" placeholder="StudentID" 
                                        class="form-control" required />
                                </div>
                            </div>
                                
                            <div class="row mb-4">
                                <div class="col">
                                    <label>LecturerID:</label>
                                    <input v-model="assignedToModal.dataAssignedTo.LecID" type="text" placeholder="LecturerID" 
                                        class="form-control" required />
                                </div>
                            </div>

                            <div class="row mb-4">
                                <div class="col">
                                    <label>SubjectID:</label>
                                    <input v-model="assignedToModal.dataAssignedTo.SubjID" type="text" placeholder="SubjectID" 
                                        class="form-control" required />
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
        this.getAssignedTos()
    },
    data() {
        return {
            assignedTos: [],
            assignedToModal: {
                txtTitle: "",
                submitType: null,
                dataAssignedTo: {
                    Semester: "",
                    StuID: "",
                    LecID: "",
                    SubjID: "",
                },
            },
        };
    },
    methods: {
        async getAssignedTos() {
            const res = await axios.get("/assignedTos")
            this.assignedTos = res.data;
        },
        async Create(){
            this.assignedToModal = {
                txtTitle: "Creating new assignedTo",
                submitType: "create",
                dataAssignedTo: {
                    StuID: "",
                    LecID: "",
                    SubjID: "",
                    Semester: "",
                },
            }
        },
        async Update(assignedTo) {
            this.assignedToModal = {
                txtTitle: "Updating existing assignedTo",
                submitType: "update",
                dataAssignedTo: {
                    StuID: assignedTo.StuID,
                    LecID: assignedTo.LecID,
                    SubjID: assignedTo.SubjID,
                    Semester: assignedTo.Semester,
                },
            }
        },
        async Submit() {
            const submitType = this.assignedToModal.submitType;
            const data = this.assignedToModal.dataAssignedTo;

            if (submitType === "create") {
                await axios.post("/assignedTo", data);
            } else {
                await axios.put(`/assignedTo/${data.StuID}/${data.LecID}/${data.SubjID}/${data.Semester}`, data);
            }
            await this.getAssignedTos();
        },
        async Delete(data) {
            await axios.delete(`/assignedTo/${data.StuID}/${data.LecID}/${data.SubjID}/${data.Semester}`);
            await this.getAssignedTos();
        },
    },
};
</script>