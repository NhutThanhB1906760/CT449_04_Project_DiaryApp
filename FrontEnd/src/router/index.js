import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import store from "../store/store"

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        // props: true
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
    {
        path: "/Diary/:id",
        name: "diary.edit",
        component: () => import("@/views/DiaryEdit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/Diary/new",
        name: "diary.create",
        component: () => import("@/views/DiaryCreate.vue"),
    },
    {
        path: "/Diary/Login",
        name: "Login",
        component: () => import("@/views/DiaryLogin.vue"),
    },
    {
        path: "/Diary/Register",
        name: "Register",
        component: () => import("@/views/DiaryRegister.vue"),
    },
    {
        path: "/UserName",
        name: "changeName",
        component: () => import("@/views/UserName.vue"),
    },
    {
        path: "/UserPass",
        name: "changePass",
        component: () => import("@/views/UserPassword.vue"),
    },
    {
        path: "/deleteAccount",
        name: "deleteAcc",
        component: () => import("@/views/DeleteAccount.vue"),
    },
];


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
router.beforeEach((to, from) => {
    const authenticated=store.state.isAuthenticated
    if ((to.name === 'Home' || to.name === 'diary.edit' || to.name === 'diary.create' || to.name === 'changeName' || to.name === 'changePass' || to.name === 'deleteAcc' )&& authenticated===false) {
        router.push('/Diary/Login')
    }
})
export default router;
