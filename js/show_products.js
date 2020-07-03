const showProducts = (data) => {
  const item = document.querySelector('.Main__products');
  data.forEach(element => {
    item.innerHTML += `<a class="Main__products--item" id=${element.id} href="#miModal">
                        <img src=${element.image} alt="item">
                        <div class="Main__products--info">
                        <p class="name">${element.name}</p>
                        </div>
                      </a>`
  });
  const itemProduct = document.querySelectorAll('.Main__products--item');
  itemProduct.forEach(item => item.addEventListener('click', getDataModal));
}

const showProductModal = (dataProduct) => {
  const modal = document.querySelector('.Main__modal--container .description');
  const price = formatter(dataProduct.price);
  modal.innerHTML =
    `<img src=${dataProduct.image} alt="item">
    <div class="Main__products--info">
      <p>Name: <span>${dataProduct.name}</span></p>
      <p>Description: <span>${dataProduct.description}</span></p>
      <p>Price: <span>${price}</span></p>
      <button id="btn-${dataProduct.id}" class="btn btn-add">Agregar al carrito</button>
    </div>`;
}

