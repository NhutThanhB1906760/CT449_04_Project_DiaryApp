<script>
export default {
    props: {
        contact: { type: Object, required: true },
    },
};
</script>


<template>
    <div>
        <div class="p-1">
            <strong>Chủ đề:</strong>
            {{ contact.title}}
        </div>
        <div class="p-1">
            <strong>Thời gian:</strong>
            {{ contact.time }}
        </div>
        <div class="p-1">
            <strong>Nội dung:</strong>
            {{ contact.content }}
        </div>
    </div>
</template>
