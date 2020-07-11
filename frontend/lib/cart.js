export function addItem (item) {
  const localCart = window.localStorage.getItem('cart')
  const cart = localCart ? JSON.parse(localCart) : []

  const existingItem = cart.find(i => i.id === item.id)
  if (existingItem) {
    existingItem.quantity += item.quantity
  } else {
    cart.push(item)
  }

  window.localStorage.setItem('cart', JSON.stringify(cart))
  return cart
}

export function getCart () {
  const localCart = window.localStorage.getItem('cart')
  const cart = localCart ? JSON.parse(localCart) : []
  return cart
}
