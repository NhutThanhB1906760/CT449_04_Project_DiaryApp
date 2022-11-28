<template>
    <Form @submit="submitContact" :validation-schema="contactFormSchema">
        <div class="form-group">
            <label for="name">Chủ đề</label>
            <Field name="name" type="text" class="form-control"  v-model="contactLocal.title" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="content">Nội dung</label>
            <textarea minlength="3" rows="10" class="form-control" style="width: 100%;" name="content"  v-model="contactLocal.content">
            </textarea>
            <!-- <ErrorMessage name="content" class="error-feedback" /> -->
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
    emits: ["submit:contact", "delete:contact"],
    props: {
        contact: { type: Object, required: true },
    },
    data() {
        const contactFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Nhập chủ đề nhật ký.")
                .min(2, "Chủ đề phải ít nhất 2 ký tự.")
                .max(50, "Chủ đề có nhiều nhất 50 ký tự."),

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
        },
    },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>

     
     
    