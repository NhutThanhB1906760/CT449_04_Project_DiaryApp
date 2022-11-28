<template>
    <div  class="page" style="margin-top: 20px; margin-bottom: 20px;">
        <h4 style="text-align: center;">ĐỔI TÊN NGƯỜI DÙNG</h4>
        <ChangeNameForm :contact="contact"  @submit:contact="updateContact" />
        <p>{{ message }}</p>
    </div>
</template>
    
<script>
import ChangeNameForm from "@/components/ChangeNameForm.vue";
import AccountService from "@/services/account.service";

export default {
    components: {
        ChangeNameForm
    },
    data() {
        return {
            contact: null, message: "",
        };
    },
    methods: {
        async updateContact(data) {
            try {
                await AccountService.updateUser(this.$store.getters.getIdUser, {name:data}); 
                alert("Tên người dùng được cập nhật thành công.")
                this.$store.commit("updateName",data)
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
    