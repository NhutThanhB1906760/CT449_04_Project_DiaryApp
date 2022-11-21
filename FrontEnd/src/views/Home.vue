<template>
    <div class="page">
        <div class="">
            <InputSearch v-model="searchText" />
        </div>
        <div class="row gx-5">
            <div class="col top">
                <h4>
                    Nhật Ký
                    <i class="fas fa-solid fa-book-journal-whills"></i>
                </h4>
                <button class="btn btn-sm btn-danger" style="margin-bottom: 10px;" @click="removeAllContacts">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
                <ContactList v-if="filteredContactsCount > 0" :contacts="filteredContacts"
                    v-model:activeIndex="activeIndex" />
                <p v-else>Không có nhật ký nào.</p>
                <!-- <div class=" justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>

                <button class="btn btn-sm btn-success" @click="goToAddContact">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>


                <button class="btn btn-sm btn-danger" @click="removeAllContacts">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div> -->

            </div>
            <div class="col">
                <div class="p-3 border bg-light top" v-if="activeContact">
                    <h4>
                        Chi tiết Nhật ký
                        <!-- <i class="fas fa-address-card"></i> -->
                    </h4>
                    <ContactCard :contact="activeContact" />
                    <router-link :to="{
                        name: 'diary.edit',
                        params: { id: activeContact._id },
                    }">
                        <span class="mt-2 badge badge-warning">
                            <i class="fas fa-edit"></i> Hiệu chỉnh</span>
                    </router-link>
                </div>
            </div>
        </div>

    </div>
</template>


<script>
import ContactCard from "@/components/DiaryCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import ContactList from "@/components/DiaryList.vue";
import DiaryService from "@/services/diary.service";

export default {
    components: {
        ContactCard,
        InputSearch,
        ContactList,
    },
    // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
    data() {
        return {
            contacts: {},
            activeIndex: -1,
            searchText: "",
        };
    },
    watch: {
        // Giám sát các thay đổi của biến searchText.
        //	Bỏ chọn phần tử đang được chọn trong danh sách. 
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        // Chuyển các đối tượng contact thành chuỗi để tiện cho tìm kiếm. 
        contactStrings() {
            return this.contacts.map((contact) => {
                const { title, time, content} = contact;
                return [title, time, content].join("");
            });
        },
        // Trả về các contact có chứa thông tin cần tìm kiếm. 
        filteredContacts() {
            if (!this.searchText) {
                return this.contacts
            };
            return this.contacts.filter((_contact, index) => this.contactStrings[index].includes(this.searchText));
        },
        activeContact() {
            if (this.activeIndex < 0) return null;
            return this.filteredContacts[this.activeIndex];
        },
        filteredContactsCount() {
            return this.filteredContacts.length;
        },
    },
    methods: {
        async retrieveContacts() {
            try {
                this.contacts = await DiaryService.getAll(this.$store.getters.getPhone);
            } catch (error) {
                console.log(error);
            }
        },

        refreshList() {
            this.retrieveContacts();
            this.activeIndex = -1;
        },


        async removeAllContacts() {
            if (confirm("Bạn muốn xóa tất cả Nhật ký?")) {
                try {
                    await DiaryService.deleteAll(this.$store.getters.getPhone);
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>



<style scoped>
.page {
    text-align: left;
    max-width: 100%;
    margin-top: 20px;
}

.top {
    margin-top: 20px;
}
</style>
