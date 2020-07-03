
const productArr = [];

//Local storage
// localStorage.setItem('cart', JSON.stringify(data))

const addProduct = (e) => {
  const btnId = e.target.id;
  const id = btnId.slice(4, 6);
  if (!data[id - 1].cantidad) {
    data[id - 1].cantidad = 1;
    productArr.push(data[id - 1]);
  } else {
    data[id - 1].cantidad += 1;
  }

  localStorage.setItem('cart', JSON.stringify(productArr))
}