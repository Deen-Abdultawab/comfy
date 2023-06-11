

function formatPrice(price) {
  let formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format((price / 100).toFixed(2));


  return formattedPrice;
}

function getFormatPrice(){
    return {formatPrice}
}


export default getFormatPrice