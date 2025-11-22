<template>
    <b-container fluid class="py-4">
        <h3>به پنل پشتیبانی خوش آمدید</h3>
    </b-container>
</template>

<script setup>

</script>

<style scoped>
h5 {
    font-size: 1rem;
    font-weight: 600;
}

.small {
    font-size: 0.85rem;
    border-bottom: 1px solid #1213;
    padding-bottom: 8px;
}

.dashboardItem strong {
    width: 100%;
    min-height: 40px;
}

.dashboardItem .small {
    background-color: var(--theme-color);
    color: white !important;
    width: 100%;
    padding: 8px 0;
}

.dashboardItem {
    border: 1px solid #1213;
    border-radius: 8px;
    min-height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 0 5px #1213;
    padding: 0;
    overflow: hidden;
}
</style>