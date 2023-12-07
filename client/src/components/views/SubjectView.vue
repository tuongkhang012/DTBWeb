<template>
    <div>
        <h2 class="mt-4">Subjects</h2>
        <div class="float-end me-4 mb-2 p-2">
            <button type="button" class="btn btn-primary"
            data-bs-toggle="modal" data-bs-target="#inputSubject" @click="Create">Add subject</button>
        </div>
        <div>
            <table class="table table-striped table-hover table-bordered border-secondary" >
                <thead>
                    <tr>
                    <th scope="col">SubjectID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Credit</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(subject, index) in subjects" :key="index">
                        <td>{{ subject.SubjectID }}</td>
                        <td>{{ subject.Name }}</td>
                        <td>{{ subject.Credit }}</td>
                        <td>
                            <button type="button" class="btn me-2 btn-info" data-bs-toggle="modal"
                            data-bs-target="#inputSubject" @click="Update(subject)">Edit</button>
                            <button type="button" class="btn btn-danger" 
                            @click="Delete(subject.SubjectID)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <!-- Modal -->
        <div class="modal fade" id="inputSubject" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-lg d-flex justify-content-center">
                <div class="modal-content w-75">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ subjectModal.txtTitle }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body p-4">
                        <form>
                            <div class="row mb-4">
                                <div class="col">
                                    <label>SubjectID:</label>
                                    <input v-model="subjectModal.dataSubject.SubjectID" type="text" placeholder="SubjectID" 
                                        class="form-control" required />
                                </div>
                            </div>

                            <div class="row">
                                <div class="col mb-4">
                                    <label>Name:</label>
                                    <input v-model="subjectModal.dataSubject.Name" type="text" placeholder="Name" 
                                        class="form-control" required />
                                </div>
                            </div>
                                
                            <div class="row mb-4">
                                <div class="col">
                                    <label>Credit:</label>
                                    <input v-model="subjectModal.dataSubject.Credit" type="text" 
                                        placeholder="Address" class="form-control" required/>
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
        this.getSubjects()
    },
    data() {
        return {
            subjects: [],
            subjectModal: {
                txtTitle: "",
                submitType: null,
                dataSubject: {
                    SubjectID: "",
                    Name: "",
                    Credit: "",
                },
            },
        };
    },
    methods: {
        async getSubjects() {
            const res = await axios.get("/subjects")
            this.subjects = res.data;
        },
        async Create(){
            this.subjectModal = {
                txtTitle: "Creating new subject",
                submitType: "create",
                dataSubject: {
                    SubjectID: "",
                    Name: "",
                    Credit: "",
                },
            }
        },
        async Update(subject) {
            this.subjectModal = {
                txtTitle: "Updating existing subject",
                submitType: "update",
                dataSubject: {
                    SubjectID: subject.SubjectID,
                    Name: subject.Name,
                    Credit: subject.Credit,
                },
            }
        },
        async Submit() {
            const submitType = this.subjectModal.submitType;
            const data = this.subjectModal.dataSubject;

            if (submitType === "create") {
                await axios.post("/subject", data);
            } else {
                const { SubjectID, ...rest } = data;
                await axios.put(`/subject/${SubjectID}`, rest);
            }
            await this.getSubjects();
        },
        async Delete(SubjectID) {
            await axios.delete(`/subject/${SubjectID}`);
            await this.getSubjects();
        },
    },
};
</script>