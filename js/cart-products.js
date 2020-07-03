const cartProducts = JSON.parse(localStorage.getItem('cart'));

const showCartProducts = () => {
  const containerProducts = document.querySelector('.Cart__product--info');
  console.log("showCartProducts -> cartProducts.length", cartProducts.length)
  if (cartProducts.length !== 0) {
    cartProducts.forEach(element => {
      const price = formatter(element.price);
      containerProducts.innerHTML +=
        `<div class="product">
          <img src=${element.image} alt=${element.description}>
          <div class="Cart__product--description">
            <div class="product-item">
              <p>${element.name}</p>
              <small>${element.description}</small>
            </div>
            <div class="product-price">
              <div>
                <p class="quantify"><span>${element.count}</span></p>
                <p>${price}</p>
              </div>
              <button id=item-${element.id} class="btn btn-delete">-</button>
            </div>
        </div>`
    });
    const btnDelete = document.querySelectorAll('.btn-delete');
    btnDelete.forEach(item => item.addEventListener('click', deleteProduct))
  } else {
    containerProducts.innerHTML =
      `<div style="margin:auto">
        <p>No hay productos en el carrito</p>
        <a class="btn btn-home" href="./index.html">Volver al Home</a>
      </div>
      `
  }
}


const showCartTotal = (total) => {
  if (cartProducts) {
    const totalAmount = document.querySelector('.Cart__totals--price #amount');
    totalAmount.innerHTML = total;
  }
}

const deleteProduct = (e) => {
  const itemId = e.target.id;
  const id = itemId.slice(5, 7);
  const deleteElement = cartProducts.find(item => item.id == id);
  console.log("deleteProduct -> deleteElement.count > 0", deleteElement.count > 0)
  if (deleteElement.count > 0) {
    deleteElement.count -= 1;
  } else {

  }

}

const getCartTotal = () => {
  if (cartProducts) {
    const totalAmount = cartProducts
      .map(item => item.price * item.count)
      .reduce((value, count) => count + value, 0)
    return totalAmount;
  } else {
    return 0;
  }
}
const formatter = (dataFormat) => {
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return format.format(Number(dataFormat));
}

showCartTotal(formatter(getCartTotal()));

showCartProducts();