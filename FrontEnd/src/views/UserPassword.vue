<template>
    <h4 style="text-align: center; margin-top: 20px;">ĐỔI MẬT KHẨU</h4>
    <Form v-if="!pass" @submit="submitPass">
        <div class="form-group">
            <label for="password">Mật khẩu hiện tại</label>
            <Field name="password" type="password" class="form-control" v-model="contactLocal" />
            <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary">Xác nhận</button>
        </div>
    </Form>
    <Form v-if="pass" @submit="submitPassNew" :validation-schema="contactFormSchema">
        <div class="form-group">
            <label for="passwordNew">Mật khẩu mới</label>
            <Field name="passwordNew" type="password" class="form-control" v-model="contactLocalNew" />
            <ErrorMessage name="passwordNew" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary">Xác nhận</button>
        </div>
    </Form>
</template>
    
    
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import AccountService from "@/services/account.service";
export default {
    components: {
        Form, Field,
        ErrorMessage,
    },
    emits: ["submit:contact"],
    props: {
        contact: { type: Object, required: true }
    },
    data() {
        const contactFormSchema = yup.object().shape({
            passwordNew: yup.string().required("Mật khẩu phải có giá trị.").min(3, "Có ít nhất 3 ký tự")
        });
        return {
            // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
            //	contactLocal để liên kết với các input trên form 
            contactLocal: null,
            contactLocalNew: null,
            contactFormSchema,
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
        async submitPassNew() {
            try {
                if (this.contactLocalNew === this.$store.getters.getPass) {
                    alert("Nhập mật khẩu mới")
                }
                else {
                    await AccountService.updateUser(this.$store.getters.getIdUser, { password: this.contactLocalNew });
                    alert("Mật khẩu được cập nhật thành công.")
                    this.$store.commit("updatePass", this.contactLocalNew)
                    this.pass = false
                    this.contactLocal=""
                }

            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>

     
     
    