import axios from '../api/api.js';

class AuthService {

    login(user){
        return axios
                .post('auth/signin', {
                    Username: user.Username,
                    Password: user.Password,
                })
                .then(response => {
                    let user = JSON.stringify(response.data);
                    if(response.data.accessToken) {
                        localStorage.setItem('user', user);
                    }
                    return JSON.parse(user);
                })
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user){
        return axios.post('auth/signup', {
            Username: user.Username,
            Role: user.Role,
            Password: user.Password,
            StudentID: user.StudentID,
            EmployeeID: user.EmployeeID,
            Name: user.Name,
            Lname: user.Lname,
            Sex: user.Sex,
            BirthDate: user.BirthDate,
            Address: user.Address,
            Email: user.Email,
            Class: user.Class,
        });
    }
}

export default new AuthService();