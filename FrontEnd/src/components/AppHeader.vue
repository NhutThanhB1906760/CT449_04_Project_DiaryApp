<template>
    <nav class="navbar navbar-expand navbar-dark " style="background: #345457;">
        <router-link :to="{ name: 'Home' }" class="nav-link"> 
            <img src="../assets/diary.png" h  width="80" alt="">
        </router-link>
        
        <div class="mr-auto navbar-nav">
            <li class="nav-item">
                <router-link :to="{ name: 'Home' }" class="nav-link"> Trang chủ
                    <i class="fas fa-solid fa-house-user"></i>
                </router-link>
            </li>
            <li class="nav-item" v-if="this.$store.state.isAuthenticated">
                <router-link :to="{ name: 'changeName' }" class="nav-link"> 
                    Đổi tên người dùng
                    <i class="fas fa-solid fa-signature"></i>
                </router-link>
            </li>
            <li class="nav-item" v-if="this.$store.state.isAuthenticated">
                <router-link :to="{ name: 'changePass' }" class="nav-link"> 
                    Đổi mật khẩu
                    <i class="fas fa-solid fa-key"></i>
                </router-link>
            </li>
            <li class="nav-item" v-if="this.$store.state.isAuthenticated">
                <router-link :to="{ name: 'deleteAcc' }" class="nav-link"> 
                    Xóa tài khoản
                    <i class="fas fa-solid fa-user-xmark"></i>
                </router-link>
            </li>
        </div>
        <div class="flex navbar-brand">
            <p>{{ getName }}</p>
            <i class="fas fa-regular fa-user"></i>
            <p style="margin-left: 20px;" v-if="!this.$store.state.isAuthenticated">
                <router-link :to="{ name: 'Register' }" class="nav-link"> Đăng ký
                </router-link>
            </p>
            <p style="margin-left: 20px;" v-else>
                <router-link :to="{ name: 'Login' }" @click="logOut" class="nav-link"> Đăng xuất
                </router-link>
            </p>
        </div>

    </nav>
</template>

<script>
export default {
    computed: {
        getName() {
            return this.$store.getters.getName
        }
    },
    methods: {
        logOut() {
            this.$store.commit("updateisAuthenticated")
            this.$store.commit("updateName","")
        }
    }
}
</script>

<style>
.flex {
    display: flex !important;
    flex-direction: row;
    align-items: baseline;
    flex-wrap: nowrap;
    justify-content: space-evenly;
    align-content: center;
    margin-top: 7px;
}
</style>