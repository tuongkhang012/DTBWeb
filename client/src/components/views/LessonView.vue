<template>
    <div v-if="currentUser" class="container text-start pt-4">
      <div class="row ps-2">
        <h2 class="text-primary">Available Class</h2>
      </div>
      <hr/>
      <div v-if="currentRole === 'ROLE_STUDENT'" class="row ps-2">
        <div v-for="(subject, index) in currentUser.StudentInfo.SUBJECTs" :key="index">
            <p class="ps-3">Semester {{ subject.ASSIGNED_TO.Semester }} - {{ subject.EMPLOYEEs[0].Lname }} {{ subject.EMPLOYEEs[0].Name }} - {{ subject.Name }}</p>
        </div>
        <hr />
      </div>
      <div v-else>
        <div v-for="(subject, index) in currentUser.LecturerInfo.SUBJECTs" :key="index">
            <p class="ps-3">Semester {{ subject.ASSIGNED_TO.Semester }} - {{ subject.Name }}</p>
        </div>
        <hr />
      </div>
    </div>

    <div class="modal fade" id="inputDependent" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog d-flex justify-content-center">
        <div class="modal-content w-75">
          <div class="modal-header">
            <h5 class="modal-title">Add dependent</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body p-4">
            <form>
              <div class="text-start form-group mb-4">
                <label>Name:</label>
                <input v-model="DependentInfo.Name" type="text" placeholder="Name" 
                class="form-control" required />
              </div>
              <div class="text-start form-group mb-4">
                <label>Relationship:</label>
                <input v-model="DependentInfo.Relationship" type="text" placeholder="Relationship" 
                class="form-control" required />
              </div>
              <div class="text-start form-group mb-4">
                <label>Profession:</label>
                <input v-model="DependentInfo.Profession" type="text" placeholder="Profession" 
                class="form-control"/>
              </div>
              <div class="text-start form-group mb-4">
                <label>Phonenumber:</label>
                <input v-model="DependentInfo.Phonenumber" type="text" placeholder="Phonenumber" 
                class="form-control" required />
              </div>
                <!-- Submit button -->
              <button type="submit" class="btn btn-primary btn-block" @click="Submit">Submit</button>
          </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "../../api/api.js"

  export default {
    name: 'ProfileView',
    data() {
      return {
        DependentInfo: {
          StuID: "",
          Name: "",
          Relationship: "",
          Profession: "",
          Phonenumber: "",
        }
      }
    },
    computed: {
      currentUser() {
        return this.$store.state.user;
      },
      currentRole() {
        return this.$store.state.user.Role;
      }
    },
    mounted() {
      if (!this.currentUser) {
        this.$router.push('/login');
      }
    },
    methods: {
      async Submit() {
        this.DependentInfo.StuID = this.currentUser.StudentID;
        await axios.post("/dependent", this.DependentInfo)
      },
      async Delete(index) {
        await axios.delete(`/dependent/${this.currentUser.StudentID}/${this.currentUser.StudentDependents[index].Name}`)
      }
    }
  };
  </script>