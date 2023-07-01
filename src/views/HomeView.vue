<template>
    <div class="spin-container" v-if="!pageLoaded">
        <Spinner />
    </div>
  <div class="header" v-else>
      <Navbar :logo="logoUrl" :home="home"/>
      <section class="hero-container" >
          <div class="hero-center">
              <h1 class="slanted-text">Rest, Relax, Unwind</h1>
              <h3>Embrace your choices - we do</h3>
              <a href="products.html" class="hero-btn">shop now</a>
          </div>
      </section>
  </div>
  <div class="featured-products page" v-if="pageLoaded">
        <h1 class="title"><span>/</span>Featured</h1>
        <div class="featured-product-center">
            <div v-if="error">{{ error }}</div>
            <div class="single-product-container" v-if="featuredProducts && !isLoading">
                
              <SingleProduct :products="featuredProducts" />
            </div>
            <div v-if="isLoading">Loading...</div>
        </div>

        <a href="products.html" class="btn featured-btn">all products</a>
    </div>
</template>

<script>
import getCollection from '@/functions/getCollection'
import Spinner from '@/components/Spinner.vue'
import { computed, onMounted, ref } from 'vue'
import Navbar from '../components/NavBars/Navbar.vue'
import fetchData from '../functions/fetchData'
import SingleProduct from '@/components/SingleProduct.vue'
import { timestamp } from '@/firebase/config'
import { projectFirestore } from '@/firebase/config'


export default {
  name: 'HomeView',
  components: { Navbar, SingleProduct, Spinner },
  setup(){
    const logoUrl = "logo-white.svg"
    const home = true
    const url = 'https://course-api.com/javascript-store-products'

    const { error, store, getData, isLoading } = fetchData()
    const { documents } = getCollection('store')
    const pageLoaded = ref(false)
    
    

    getData(url)
    async function setUpStore() {
        store.value.forEach(async (product)=> {
        const {id, fields:{ company, name, price, image:img},} = product;
        const imageSrc = img[0].thumbnails.large.url;
        
        try {
            const res = await projectFirestore.collection('store').doc(id).set({
                  id,
                fields: {
                    company, 
                    name, 
                    price,
                    image: [{
                        thumbnails: {
                            large: {
                                url: imageSrc
                            }
                        }
                    }]
                },
                createdAt: timestamp()
            })

            return res
        } catch (err) {
            console.log(err.message)
            
        }

           
        });
    }

    onMounted(() => {
        setTimeout(()=>{
            pageLoaded.value = true
            console.log(documents.value)
            if(documents.value.length < 1){
                console.log('store is empty')
                setUpStore()
            } else {
                console.log('store is filled')
            }
        },3000)
    })
       

    
     const featuredProducts = computed(()=>{
       return store.value.filter((product) => product.fields.featured === true);
     }) 

    
     function handleEvent(){
        console.log(documents)
     }

    return { logoUrl, home, featuredProducts, error, isLoading, handleEvent, pageLoaded }
  }
  
}
</script>

<style scoped>

  .header {
      background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url('../assets/images/main-bcg.jpeg') center/cover;
      position: relative;
      width: 100%;
      min-height: 100vh;
  }

  .hero-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: grid;
      place-items: center;
  }

  .hero-center {
      width: 90vw;
      max-width: var(--max-width);
  }

  .hero-center h1 {
      font-size: 5rem;
      letter-spacing: 4px;
      line-height: 1;
      font-weight: bold;
      color: var(--clr-white);
  }

  .slanted-text {
      font-family: 'Kaushan Script', cursive;
  }

  .hero-center h3 {
      color: var(--clr-white);
      font-size: 2rem;
      margin-top: 1.5rem;
      font-weight: bold;
  }

  .hero-btn {
      text-transform: uppercase;
      border: 1px solid var(--clr-white);
      padding: 0.5rem 0.7rem;
      border-radius: var(--radius);
      font-size: 1rem;
      letter-spacing: var(--spacing);
      transition: var(--transition);
      display: inline-block;
      margin-top: 1.7rem;
  }

  .hero-btn:hover {
      background: var(--clr-white);
      color: var(--clr-primary-5);
  }

  .featured-products {
    text-align: center;
    position: relative;
    display: grid;
    row-gap: 3rem;
    /* top: 38rem; */
    margin: 5rem 0;
  }

  .featured-btn {
    width: 11rem;
    display: block;
    margin: 0 auto;
    font-size: 1rem;
    
}




  .featured-products .title span {
      color: var(--clr-primary-5);
      padding-right: 1rem;
  }

  .featured-products h1 {
      font-weight: bold;
  }


  .featured-products .title span {
      color: var(--clr-primary-5);
      padding-right: 1rem;
  }

  .featured-products h1 {
      font-weight: bold;
  }

   @media only screen and (max-width: 900px) {
      .hero-center h1{
        font-size: 3rem;
    }

    .hero-center h3 {
        font-size: 1.75rem;
    }

  }

    @media only screen and (max-width: 700px) {
      .hero-center h3 {
          font-size: 1.2rem;
      }

  }
</style>
