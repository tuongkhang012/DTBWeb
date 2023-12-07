import { createRouter, createWebHistory } from 'vue-router'

// import Webpages
// import HomeView from '../views/Home.vue'
import LoginView from '../components/views/LoginView.vue'
import RegisterView from '../components/views/RegisterView.vue'
import StudentHome from '../components/views/StudentHome.vue'
import AdminHome from '../components/views/AdminHome.vue'
// import FormView from '../views/StudentView/FormView'
// import FormResultView from '../views/StudentView/FormResultView'
// import StudentResultView from '../views/StudentView/StudentResult'
import LecturerHome from '../components/views/LecturerHome.vue'
// import OISPResultView from '../views/OISPView/OISPResult'
// import PR2152250 from '../views/OISPView/PR2152250'
// import OISPMatchingView from '../views/OISPView/OISPMatching'
import ProfileView from '../components/views/ProfileView.vue'
import LessonView from '../components/views/LessonView.vue'

//setting up addresses with their associated webpages
const routes = [
    { 
        path: '/lesson',
        component: LessonView,
        meta: {
            title: 'My lesson',
        }
    },
    // { 
    //     path: '/',
    //     component: HomeView,
    //     meta: {
    //         title: 'Homepage',
    //     }
    // },
    {
        path: '/login',
        component: LoginView,
        meta: {
            title: 'Login',
        }
    },
    {
        path: '/register',
        component: RegisterView,
        meta: {
            title: 'Register',
        }
    },
    { 
        path: '/lesson',
        component: LessonView,
        meta: {
            title: 'My lesson',
        }
    },
    {
        path: '/studenthome',
        component: StudentHome,
        meta: {
            title: 'Homepage',
        }
    },
    {
        path: '/lecturerhome',
        component: LecturerHome,
        meta: {
            title: 'Homepage',
        }
    },
    { 
        path: '/adminhome',
        component: AdminHome,
        meta: {
            title: 'Homepage',
        }
    },
    {
        path: '/profile',
        component: ProfileView,
        meta: {
            title: 'Profile',
        }
    },
]

// create the router object with active class to highlight link that are currently visiting (client side)
const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: "active",
    linkExactActiveClass: "active",
})

// this is for loading the title of each page before routing to the actual page itself, we load it via the meta tag
router.beforeEach((to, from, next) => {
    document.title = to.meta?.title ?? 'Blank'
    const publicPages = ['/login', '/register', '/home'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');
  
    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
      next('/login');
    } else {
      next();
    }
})

export default router;