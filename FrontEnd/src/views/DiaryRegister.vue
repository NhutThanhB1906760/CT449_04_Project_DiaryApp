<template>
    <div class="page">
        <h4 style="text-align: center; margin-top: 20px;">ĐĂNG KÝ</h4>
        <RegisterForm :contact="contact" @submit:contact="createUser" />
        <p>{{ message }}</p>

    </div>
</template>
    
<script>

import  AccountService from "@/services/account.service";
import RegisterForm from "@/components/RegisterForm.vue";

export default {
    components: {
        RegisterForm,
    },

    data() {
        return {
            contact: {},
            message: "",
        };
    },

    methods: {
        async createUser(data) {
            try {

                const payload = await  AccountService.Register(data);
                if(payload===false){
                    alert("Đăng ký thất bại. Có thể số điện thoại đã được đăng ký!!") 
                }
                else{
                    alert("Đăng ký thành công")
                    this.$router.push({ name: "Login" });
                }
                    


            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
    