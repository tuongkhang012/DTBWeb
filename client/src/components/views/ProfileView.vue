<template>
    <div v-if="currentUser" class="container text-start pt-4">
      <div class="row ps-2">
        <h2 class="text-primary">Personal Information</h2>
      </div>
      <div v-if="currentRole === 'ROLE_STUDENT'" class="row ps-2">
        <p><strong>Student ID:</strong> {{ currentUser.StudentInfo.StudentID }}</p>
        <hr />
        <p><strong>Student Name:</strong> {{ currentUser.StudentInfo.Lname }} {{ currentUser.StudentInfo.Name }}</p>
        <hr />
        <p><strong>Student Gender:</strong> {{ currentUser.StudentInfo.Sex }}</p>
        <hr />
        <p><strong>Student Birthday:</strong> {{ currentUser.StudentInfo.BirthDate }}</p>
        <hr />
        <p><strong>Student Address:</strong> {{ currentUser.StudentInfo.Address }}</p>
        <hr />
        <p><strong>Phone numbers:</strong></p>
        <div v-for="(phoneNum, index) in currentUser.StudentInfo.STUDENT_PHONE_NUMBERs" :key="index">
          <p>{{ phoneNum.APhoneNumber }}</p>
        </div>
        <hr/>
        <div class="row ps-2">
          <h2 class="text-primary">Dependent Information <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#inputDependent">Add</button></h2> 
        </div>
        <div v-for="(dependent, index) in currentUser.StudentInfo.DEPENDENTs" :key="index">
          <p><strong class="text-primary">Dependent No.{{ index+1 }}</strong> 
            <button class="btn btn-danger ms-2" @click="Delete(index)">Delete</button></p>
          <p class="ps-3"><strong>Dependent Name:</strong> {{ dependent.Name }}</p>
          <p class="ps-3"><strong>Dependent Relationship:</strong> {{ dependent.Relationship }}</p>
          <p class="ps-3"><strong>Dependent Profession:</strong> {{ dependent.Profession }}</p>
          <p class="ps-3"><strong>Dependent Phonenumber:</strong> {{ dependent.PhoneNumber }}</p>
        </div>
        <div class="row ps-2">
          <h2 class="text-primary">School Information</h2> 
        </div>
        <p><strong>Student Email:</strong> {{ currentUser.StudentInfo.Email }}</p>
        <hr />
        <p><strong>Student Class:</strong> {{ currentUser.StudentInfo.Class }}</p>
        <hr />
        <p><strong>Student Major:</strong> {{ currentUser.StudentInfo.MAJORs[0].MajorName }}</p>
        <hr />
        <p><strong>Student Faculty:</strong> {{ currentUser.StudentInfo.MAJORs[0].FACULTY.Name }}</p>
        <hr />
        <p><strong>Student GPA:</strong> {{ currentUser.StudentInfo.GPA }}</p>
        <hr />
        <p><strong>Student Total Credits:</strong> {{ currentUser.StudentInfo.TotalCredit }}</p>
        <hr />
      </div>
      <div v-else-if="currentRole === 'ROLE_LECTURER'">
        <p><strong>Lecturer ID:</strong> {{ currentUser.LecturerInfo.EmployeeID }}</p>
        <hr/>
        <p><strong>Lecturer Name:</strong> {{ currentUser.LecturerInfo.Lname }} {{ currentUser.LecturerInfo.Name }}</p>
        <hr/>
        <p><strong>Lecturer Gender:</strong> {{ currentUser.LecturerInfo.Sex }}</p>
        <hr/>
        <p><strong>Lecturer Birthday:</strong> {{ currentUser.LecturerInfo.BirthDate }}</p>
        <hr/>
        <p><strong>Lecturer Address:</strong> {{ currentUser.LecturerInfo.Address }}</p>
        <hr/>
        <div class="row ps-2">
          <h2 class="text-primary">School Information</h2> 
        </div>
        <p><strong>Lecturer Email:</strong> {{ currentUser.LecturerInfo.Email }}</p>
        <hr/>
        <p><strong>Lecturer Salary:</strong> {{ currentUser.LecturerInfo.Salary }}</p>
        <hr/>
        <p><strong>Lecturer Work years:</strong> {{ currentUser.LecturerInfo.YearsOfService }}</p>
        <hr/>
        <p><strong>Phone numbers:</strong></p>
        <div v-for="(phoneNum, index) in currentUser.LecturerInfo.EMPLOYEE_PHONE_NUMBERs" :key="index">
          <p>{{ phoneNum.APhoneNumber }}</p>
        </div>
        <hr/>
      </div>
      <div v-else>
        <p><strong>Authorities:</strong> {{currentUser.Role}}</p>
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