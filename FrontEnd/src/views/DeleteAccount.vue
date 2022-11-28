<template>
    <h4 style="text-align: center; margin-top: 20px;">XÓA TÀI KHOẢN</h4>
    <Form v-if="!pass" @submit="submitPass">
        <div class="form-group">
            <label for="password">Nhập mật khẩu</label>
            <Field name="password" type="password" class="form-control" v-model="contactLocal" />
            <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary">Xác nhận</button>
        </div>
    </Form>
    <div v-if="pass">
        <h5>Nếu bạn xóa tài khoản thì bạn sẽ không thể tiếp tục sử dụng ứng dụng và toàn bộ nhật ký cũng sẽ bị xóa!.</h5>
        <button type="button" @click="deleteAccount" class="btn btn-outline-danger">Xác nhận xóa</button>
    </div>
</template>
    
    
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import AccountService from "@/services/account.service";
import DiaryService from "@//services/diary.service"
export default {
    components: {
        Form, Field,
        ErrorMessage,
    },
    data() {
        return {
            // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
            //	contactLocal để liên kết với các input trên form 
            contactLocal: null,
            pass: false
        };
    },
    methods: {
        submitPass() {
            if (this.contactLocal === this.$store.getters.getPass) {
                this.pass = true
            }
            else {
                alert("Mật khẩu không đúng")
            }
        },
        async deleteAccount(){
            if (confirm("Bạn thật sự muốn xóa tài khoản?")) {
                try {
                    await AccountService.delete(this.$store.getters.getIdUser)
                    await DiaryService.dropCollection(this.$store.getters.getPhone);
                    await this.$store.commit("updateisAuthenticated")
                    this.$router.go()
                } catch (error) {
                    console.log(error);
                }
            }
        }
    },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>

     
     
    