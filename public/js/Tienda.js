const addToShoppingCart = document.querySelectorAll('.addToCart')
// console.log(addToShoppingCart);
const shoppingCartItemsContainer = document.querySelector('.shoppingCartItemsContainer')

addToShoppingCart.forEach(addToCartButton =>{
    addToCartButton.addEventListener('click',addToCartClicked)
})
function addToCartClicked(event){

    const button = event.target;
    console.log(button)
    const item = button.closest('.item')
    console.log( item)
    const itemTitle = item.querySelector('a .item-title').textContent
    console.log(itemTitle)
    const itemPrice = item.querySelector('.container-img-barrita .container-img .item-price').textContent
    console.log(itemPrice)
    const itemImage = item.querySelector('.container-img-barrita .container-img a .item-image').src
    console.log( itemImage)
    addItemToShoppingCart(itemTitle,itemPrice,itemImage)
}
function addItemToShoppingCart(itemTitle,itemPrice,itemImage){
    const shoppingCartRow = document.createElement('tr')
    const shoppingCartContent = `

                
                                <td class ="item-image-title"">
                                <img src ="${itemImage}" class = "td-img" >
                                ${itemTitle}</td><td>${itemPrice}</td><td>1 </td>
                           
    `;
    shoppingCartRow.innerHTML = shoppingCartContent;
    shoppingCartItemsContainer.append(shoppingCartRow)
}
