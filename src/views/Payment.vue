<template>
     <Navbar :logo="logoUrl" :page="page"/>
    <PageHero :text="heroText"/>

    <section class="payment-page">
        <form id="paymentForm">
            <div class="form-group">
              <label for="first-name">First Name</label>
              <input type="text" id="first-name" placeholder="Yemi"/>
            </div>
            <div class="form-group">
              <label for="last-name">Last Name</label>
              <input type="text" id="last-name" placeholder="Ola" />
            </div>
            <div class="form-group">
              <label for="email">Email Address</label>
              <input type="email" id="email-address" required placeholder="something@gmail.com"/>
            </div>
            <div class="form-group">
              <label for="amount">Amount</label>
              <span class="price formPrice" id="amount" value="60000">$300</span>
            </div>
            <div class="form-group">
                <label for="refno">Refrence No.</label>
                <span  id="refno" value="b1b1b1b" class="refNumber">$300</span>
              </div>
            <div class="form-submit">
              <button type="submit" onclick="payWithPaystack()" class="btn payment-btn"> Pay </button>
            </div>
          </form>
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
      const heroText = 'Home / Product Title'


      return { logoUrl, page, heroText }
    }
    
  }
</script>

<style scoped>
    
</style>