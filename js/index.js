let data;

const fetchData = async () => {
  const response = await fetch('js/API.json');
  const data = await response.json();
  return localStorage.setItem('data', JSON.stringify(data));
}

const getData = async () => {
  let store = localStorage.getItem('data');
  if (!store) {
    await fetchData();
    store = localStorage.getItem('data');
  }
  data = JSON.parse(store);
  showProducts(data);
}


const getDataModal = (e) => {
  const id = e.target.parentNode.id;
  const dataProduct = data[id - 1];
  showProductModal(dataProduct);
  const btnShop = document.querySelectorAll('.btn-add');
  btnShop.forEach(item => item.addEventListener('click', addProduct));
}

const formatter = (dataFormat) => {
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return format.format(Number(dataFormat));
}

const findOrCreateCart = () => {
  if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
  }
  return JSON.parse(localStorage.getItem('cart'));
}

let productArr = findOrCreateCart();

const addProduct = (e) => {
  const btnId = e.target.id;
  const id = btnId.slice(4, 6);
  let itExist = productArr.find(item => item.id == id);

  if (!itExist) {
    productArr.push({ ...data[id - 1], count: 1 });
  } else {
    itExist.count += 1;
  }
  localStorage.setItem('cart', JSON.stringify(productArr));
  getTotalCount();
}

const getTotalCount = () => {
  const countElement = document.querySelector('#products-count');
  let count = productArr
    .map(item => item.count)
    .reduce((count, value) => count + value, 0);
  localStorage.setItem('totalCount', JSON.stringify(count));
  countElement.innerHTML = JSON.parse(localStorage.getItem('totalCount'));

}
getTotalCount();
getData();