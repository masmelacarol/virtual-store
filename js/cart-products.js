let cartProducts = JSON.parse(localStorage.getItem('cart'));

const showCartProducts = () => {
  console.log("cartProducts", cartProducts)
  const containerProducts = document.querySelector('.Cart__product--info');
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
      </div>`;

    });
    const btnDelete = document.querySelectorAll('.btn-delete');
    btnDelete.forEach(item => item.addEventListener('click', deleteProductCart))

  } else {
    containerProducts.innerHTML =
      `<div style="margin:auto">
        <p>No hay productos en el carrito</p>
        <a class="btn btn-home" href="./index.html">Volver al Home</a>
      </div>
      `
  }
}

const showCartAmountTotal = (total) => {
  const totalAmount = document.querySelector('.Cart__totals--price #amount');
  if (cartProducts) {
    totalAmount.innerHTML = total;
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

const deleteElementCart = (arr, id) => {
  if (arr) {
    arr.splice(id, 1);
  }
}


const deleteProductCart = (e) => {
  const id = (e.target.id).slice(5, 7);
  const cartContainer = document.querySelector('.Cart__product--info');
  const productToEliminate = e.target.parentNode.parentNode.parentNode;
  const productCart = cartProducts.find(item => item.id == id);
  console.log("deleteProductCart -> cartContainer.children", cartContainer.children.length)

  if (cartContainer.children.length) {
    if (productCart) {
      let item = productCart.count;
      if (item > 1) {
        productCart.count -= 1;
      } else {
        productToEliminate.remove();
        deleteElementCart(cartProducts, productCart)
        showCartAmountTotal(formatter(getCartTotal()));
      }
    } else {
      productToEliminate.remove();
      deleteElementCart(cartProducts, productCart)
      showCartAmountTotal(formatter(getCartTotal()));
      localStorage.removeItem('cart');
    }

  }
  if (cartProducts.length === 0) {
    showCartProducts();
  }
}


const formatter = (dataFormat) => {
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return format.format(Number(dataFormat));
}

showCartAmountTotal(formatter(getCartTotal()));

showCartProducts();