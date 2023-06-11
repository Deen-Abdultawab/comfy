<template>
    <Navbar :logo="logoUrl" :page="page"/>
    <PageHero :text="heroText"/>

    <section class="products-container">
        <aside class="search-filter">
            <form class="input-form" @input="handleSearchFilter">
                <input 
                type="text" 
                class="search-input" 
                placeholder="search..."
                ref="searchFilter"
                v-model="searchInput"
                 />
            </form>
            <div class="company-filter">
                <h4>Company</h4>
                <ul class="company-btns" ref="companyBtns">
                    <li @click="handleCompanyFilter" class="company-btn" v-for="company in companyList" :key="company">{{ company }}</li>
                </ul>
            </div>
            <div class="price-range-filter">
                <h4>Price</h4>
                <form class="price-form" @input="priceFilter" :class="{ active: priceFormActive}">
                    <input
                      type="range"
                      class="price-filter"
                      v-model="priceInput"
                      min="0"
                      max="100"
                    />
                </form>
                <p class="price-value">Value: ${{ priceInput }}</p>
            </div>
        </aside>
        <div class="product-container">
            <div v-if="error">{{ error }}</div>
            <div class="spin-container" v-if="isLoading">
                <Spinner />
            </div>
            <div class="products" v-if="!isLoading ">
                <div class="error" v-if="newStore.length < 1">Sorry there is no result for this search</div>
                <SingleProduct :products="newStore" v-else />
            </div>
        </div>
    </section>
</template>

<script>
import getCollection from '@/functions/getCollection';
import Navbar from '@/components/NavBars/Navbar.vue';
import PageHero from '@/components/PageHero.vue';
import fetchData from '@/functions/fetchData';
import SingleProduct from '@/components/SingleProduct.vue';
import { computed, ref } from 'vue';
import Spinner from '@/components/Spinner.vue';

  export default {
    components: { Navbar, PageHero, SingleProduct, Spinner },
    setup(){
        const { documents } = getCollection('store')
        const { error, store, getData, isLoading} = fetchData()
        const logoUrl = "logo-black.svg"
        const page = true
        const heroText = 'Home / Products'
        const url = 'https://course-api.com/javascript-store-products'
        const listSet = ref(new Set())
        const list = ref([])
        const newStore = ref(store);
        const priceInput = ref(100)
        const searchInput = ref('')
        const priceFormActive = ref(false)
        const companyFilterActive = ref(false)
        const companyName = ref('')
        const companyBtns = ref(null)

      console.log(documents)
      console.log(newStore)
      
      getData(url)
      const companyList = computed(()=>{
         store.value.filter((product)=> {
            listSet.value.add(product.fields.company)
            list.value = [ 'all', ...listSet.value]
         })

         return list.value
      })

   

    function priceFilter(){
        newStore.value = [...documents.value]
        filterByPrice()
        checkFilter()
        if(newStore.value.length < 1){
            checkStore();
            filterByPrice()
        } else {
            newStore.value = [...newStore.value]
        }
    }

   

    function handleSearchFilter(){
        newStore.value = [...documents.value]
        filterBySearch()
        checkFilter()
        if(newStore.value.length < 1){
            checkStore()
            filterBySearch()
        }
    }

    function checkStore(){
        if(newStore.value.length < 1){
            newStore.value = [...documents.value];
        } else {
            newStore.value = [...newStore.value];
        }
    }

    

    function handleCompanyFilter(e){
        const btnList = [...companyBtns.value.children]
        newStore.value = [...documents.value]
        let target = e.target
        companyName.value = target.textContent
        btnList.forEach((btn)=>{
            if(btn.classList.contains('active')){
                btn.classList.remove('active')
            }
        })
        target.classList.add('active')

        if(!companyFilterActive.value){
            companyFilterActive.value = true
        }

        if(companyName.value === 'all'){
            priceInput.value = 100
            searchInput.value = ''
            newStore.value = [...documents.value]
        } else {
            filterByCompany()
            checkFilter()
        }
    }

    function checkFilter(){
        if(searchInput.value){
            filterBySearch()
        };
        if(companyFilterActive.value){
            filterByCompany()
        };

        if(priceInput){
            filterByPrice()
        }
        
    }

     function filterByPrice(){
         newStore.value = newStore.value.filter((product)=> {
            return product.fields.price/100 <= priceInput.value
        })
    }

     function filterBySearch(){
        const inputValue = searchInput.value.toLowerCase();
         newStore.value = newStore.value.filter((storeItem)=> {
            let {name} = storeItem.fields;
            name = name.toLowerCase();
            if(name.includes(inputValue)){
                return storeItem;
            }
        });
    }

    function filterByCompany(){
        newStore.value = newStore.value.filter((storeItem)=> storeItem.fields.company === companyName.value);
    }






      return { logoUrl, page, heroText, store, error, isLoading, companyList, priceInput, priceFilter, priceFormActive, newStore, handleCompanyFilter, handleSearchFilter,searchInput, companyBtns}
    }
    
  }
</script>

<style scoped>
    .products-container {
        display: grid;
        grid-template-columns: 270px 1fr;
        gap: 1rem;
        width: 90vw;
        margin: 5rem auto;
    }

    .products {
        flex: 1;
    }
    .search-input {
        width: 100%;
        padding: 0.5rem;
        background: var(--clr-grey-10);
        border-radius: var(--radius);
        border-color: transparent;
        letter-spacing: var(--spacing);
        transition: var(--transition);
    }

    .search-input:focus{
        transform: scale(1.05);
        outline: none;
    }

    .search-input::placeholder {
        font-size: 1rem;
        text-transform: capitalize;
        font-weight: lighter;
    }

    .search-filter h4 {
        font-size: 1rem;
        font-weight: 500;
        margin: 1.5rem 0 0.5rem;
    }

    .company-btns {
        display: flex;
        flex-direction: column;
        gap: 0.7rem;
    }

    .company-btn {
        display: block;
        padding: 0.25rem;
        text-transform: capitalize;
        letter-spacing: var(--spacing);
        color: var(--clr-grey-5);
        cursor: pointer;
        transition: var(--transition);
    }

    .company-btn:hover {
        color: var(--clr-grey-3);
        transform: scale(1.01);
    }

    .price-filter {
        background: var(--clr-grey-5) !important;
        color: var(--clr-grey-5);
        cursor: pointer;
    }

    .products {
        display: grid;
        text-align: center;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1rem;
    }

    .products h3 {
        font-size: 1rem;
    }

    .products p {
        font-size: 0.8rem;
    }

    @media only screen and (max-width: 1005px){
        .products-container {
            grid-template-columns: 1fr;
        }

        .search-input {
            max-width: 300px;
        }
    }

    @media only screen and (max-width: 900px){
        
            .products-container {
                grid-template-columns: 1fr;
            
            }
    }
</style>