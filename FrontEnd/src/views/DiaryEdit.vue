<template>
    <div v-if="contact" class="page" style="margin-top: 10px;">
        <h4>Hiệu chỉnh Nhật ký</h4>
        <DiaryForm :contact="contact"  @submit:contact="updateContact" />
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
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            contact: null, message: "",
        };
    },
    methods: {
        async getContact(id) {
            try {
                this.contact = await DiaryService.get(this.$store.getters.getPhone,id);
            } catch (error) {
                console.log(error);
                // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
                this.$router.push({
                    name: "notfound", params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query, hash: this.$route.hash,
                });
            }
        },

        async updateContact(data) {
            try {
                await DiaryService.update(this.$store.getters.getPhone,this.contact._id, data); 
                alert("Nhật ký được cập nhật thành công.")
                this.$router.push({ name: "Home" });
            } catch (error) {
                console.log(error);
            }
        },
        
    },
    created() {
        this.getContact(this.id);
        this.message = "";
    },
};
</script>
    