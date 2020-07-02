let data;
const getData = async () => {
  data = await fetchData();
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

const getDataModal = (e) => {
  const id = e.target.parentNode.id;
  const info = data[id - 1];
  const modal = document.querySelector('.Main__modal--container .description');

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  const price = formatter.format(Number(info.price));

  modal.innerHTML = `<img src=${info.image} alt="item">
                      <div class="Main__products--info">
                        <p class="name">Name: 
                          <span>${info.name}</span>
                        </p>
                        <p class="name">Description: 
                          <span>${info.description}</span>
                        </p>
                        <p class="name">Price: 
                          <span>${price}</span>
                        </p>
                        <button class="btn-add">Agregar al carrito</button>
                      </div>`

}
getData();