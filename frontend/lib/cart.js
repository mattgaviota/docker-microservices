export function getCart () {
  const localCart = window.localStorage.getItem('cart')
  const cart = localCart ? JSON.parse(localCart) : []
  return cart
}

export function addItem (item) {
  const cart = getCart()

  const existingItem = cart.find(i => i.id === item.id)
  if (existingItem) {
    existingItem.quantity += item.quantity
  } else {
    cart.push(item)
  }

  window.localStorage.setItem('cart', JSON.stringify(cart))
  return cart
}

export const removeItems = (items) => {
  const cart = getCart()

  const cartFiltered = cart.filter(i => !items.includes(i.id))

  window.localStorage.setItem('cart', JSON.stringify(cartFiltered))
  return cartFiltered
}
