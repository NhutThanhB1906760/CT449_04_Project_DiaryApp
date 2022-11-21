<script>
export default {
    props: {
        contacts: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        }
    }
};
</script>

<template>
    <ul class="list-group div_list" >
        <li class="list-group-item d-flex justify-content-between align-items-center li" v-for="(contact, index) in contacts" :key="contact._id"
            :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
            {{ contact.title }}
            <span class="badge bg-primary rounded-pill">{{ contact.time }}</span>
        </li>
    </ul>
</template>

<style>
.div_list {
    width: 100%;
    height: 70%;
    overflow: auto;
}
.li{
    max-width: 100%;
}

</style>