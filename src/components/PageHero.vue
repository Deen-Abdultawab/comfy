<template>
     <section class="page-hero-container">
        <div class="page-header">
            <h1>{{ text }}</h1>
        </div>
    </section>
</template>

<script>
    export default {
        props: ['text']
    }
</script>

<style scoped>
    .page-hero-container{
        min-height: 20vh;
        background: var(--clr-grey-10);
        color: var(--clr-grey-5);
        display: grid;
        align-items: center; 
    }

    .page-header {
        width: 90%;
        margin: 0 auto;
    }

    .page-header h1 {
        font-size: 1.7rem;
        font-weight: 500;
    }
</style>