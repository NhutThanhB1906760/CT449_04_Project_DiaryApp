<template>
    <div  class="page" style="margin-top: 10px;">
        <h4>Thêm Nhật ký</h4>
        <DiaryForm :contact="contact"  @submit:contact="createContact" />
        <p>{{ message }}</p>
    </div>
</template>
    
<script>
import DiaryForm from "@/components/DiaryForm.vue";
import DiaryService from "@/services/diary.service";

export default {
    components: {
        DiaryForm
    },
    
    data() {
        return {
            contact: {},
            message: "",
        };
    },
    methods: {
        async createContact(data) {
            try {
                await DiaryService.create(this.$store.getters.getPhone,data); 
                // this.message = "Nhật ký được thêm thành công.";
                alert("Nhật ký được thêm thành công.")
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
    