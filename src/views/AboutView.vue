<template>
  <Navbar :logo="logoUrl" :page="page"/>
  <PageHero :text="heroText"/>
  
  <section class=" about-page page-text">
        <h2 class="title"><span>/</span>our history</h2>
        <p class="about-desc">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat accusantium sapiente tempora sed dolore esse deserunt eaque excepturi, delectus error accusamus vel eligendi, omnis beatae. Quisquam, dicta. Eos quod quisquam esse recusandae vitae neque dolore, obcaecati incidunt sequi blanditiis est exercitationem molestiae delectus saepe odio eligendi modi porro eaque in libero minus unde sapiente consectetur architecto. Ullam rerum, nemo iste ex, eaque perspiciatis nisi, eum totam velit saepe sed quos similique amet. Ex, voluptate accusamus nesciunt totam vitae esse iste
        </p>
    </section>
  
</template>

<script>
import Navbar from '@/components/NavBars/Navbar.vue';
import PageHero from '@/components/PageHero.vue';
  export default {
    components: { Navbar, PageHero },
    setup(){
      const logoUrl = "logo-black.svg"
      const page = true
      const heroText = 'Home / About'


      return { logoUrl, page, heroText }
    }
    
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

  .about-page, .payment-page {
      width: 90vw;
      max-width: var(--max-width);
      margin: 0 auto;
      padding: 5rem 0;
  }

  .page-text .title {
      text-align: center;
      margin-bottom: 1.5rem;
      text-transform: capitalize;
      font-weight: 500;
  }

  .page-text span {
      color: var(--clr-primary-5);
      margin-right: 1rem;
  }

  .about-desc {
      line-height: 2;
      max-width: 45em;
      margin: 0 auto;
      margin-top: 2rem;
      font-size: 1rem;
  }

</style>
