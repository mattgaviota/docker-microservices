export function addItem (item) {
  let cart = window.localStorage.getItem('cart')

  if (!cart) {
    return window.localStorage.setItem('cart', JSON.stringify([item]))
  }

  cart = JSON.parse(cart)
  const existingItem = cart.find(i => i.id === item.id)
  if (existingItem) {
    existingItem.quantity += item.quantity
  } else {
    cart.push(item)
  }

  window.localStorage.setItem('cart', JSON.stringify(cart))
}
