<template>
    <Form @submit="submitContact" :validation-schema="contactFormSchema">
        <h6>Tên người dùng hiện tại: {{this.$store.getters.getName}}</h6>
        <div class="form-group">
            <label for="name">Nhập tên người dùng muốn thay đổi</label>
            <Field name="name" type="text" class="form-control" v-model="contactLocal"/>
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary">Lưu</button>
        </div>
    </Form>
</template>
    
    
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    components: {
        Form, Field,
        ErrorMessage,
    },
    emits: ["submit:contact"],
    props: {
        contact: { type: Object, required: true },
    },
    data() {
        const contactFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Nhập tên cần thay đổi.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),

        });
        return {
            // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
            //	contactLocal để liên kết với các input trên form 
            contactLocal: this.contact,
            contactFormSchema,
        };
    },
    methods: {
        submitContact() {
            this.$emit("submit:contact", this.contactLocal);
            // this.contactLocal=""
        },
    },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>

     
     
    