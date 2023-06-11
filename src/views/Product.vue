<template>
    <Navbar :logo="logoUrl" :page="page"/>
    <PageHero :text=" `Home / ${store.fields.name}` " />

    <div v-if="error">{{ error }}</div>
    <section class="single-product-container product-container" v-if="store && !isLoading">
        <div>
            <img :src="store.fields.image[0].thumbnails.large.url" alt="image title" class="single-product-img">
        </div>
        <div class="product-info">
            <h1 class="title ">{{store.fields.name}}</h1>
            <h2 class="slanted-text product-company">By {{ store.fields.company }}</h2>
            <h3 class="product-price">{{ `${formatPrice(store.fields.price)}` }}</h3>

            <div class="product-color-container">
                <span class="product-color" v-for="color in store.fields.colors" :id="color" :style="{ background: `${color}`}">
                </span>
            </div>

            <p class="product-desc">
                {{store.fields.description}}
            </p>

            <button class="btn addToCartBtn">
                add to cart
            </button>
        </div>
    </section>
    <div class="spin-container" v-if="isLoading">
        <Spinner />
    </div>
</template>

<script>
import Navbar from '@/components/NavBars/Navbar.vue';
import Spinner from '@/components/Spinner.vue';
import PageHero from '@/components/PageHero.vue';
import fetchData from '@/functions/fetchData';
import getFormatPrice from '@/functions/getFormatPrice';
  export default {
    components: { Navbar, PageHero, Spinner },
    props: ['id'],
    setup(props){
      const logoUrl = "logo-black.svg"
      const page = true
      const singleUrl = `https://course-api.com/javascript-store-single-product?id=${props.id}`

      const { error, store, getData, isLoading } = fetchData()
      const { formatPrice } = getFormatPrice()
      getData(singleUrl)
      console.log(store.value)

      

    
      return { logoUrl, page, store, error, formatPrice, isLoading }
    }
    
  }
</script>

<style scoped>
    .product-container {
        width: 90vw;
        padding: 2rem;
        align-items: center;
        margin: 5rem auto;
        gap: 3rem;
    }

    .single-product-img {
        height: 25rem;
        border-radius: var(--radius);
    }

    .product-company {
        color: var(--clr-grey-3);
        font-size: 1.25rem;
        font-weight: 500;
        margin-top: 0.7rem;
    }

    .product-info {
        text-transform: capitalize;
    }

    .product-info .title {
        font-size: 2.5rem;
    }

    .product-info .product-price {
        margin: 1.5rem 0;
    }

    .product-info .product-desc {
        font-size: 1.1rem;
        line-height: 1.7;
        margin-bottom: 1.5rem;
    }

    .product-color {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background: #222;
        margin: 0 0.5rem 0.5rem 0;
    }

    @media only screen and (max-width: 900px) {
         .product-container {
            grid-template-columns: 1fr;
            width: 95vw;
            padding: 0.7rem;
            
        }
    }
</style>