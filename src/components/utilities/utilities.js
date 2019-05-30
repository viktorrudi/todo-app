export function findItemInState(id, items) {
  for (var i = 0; i < items.length; i++) {
    if (items[i].id === id) {
      return items[i]
    }
  }
}

export function currentTime(dateObject) {
  const date = dateObject
  return `${date.getHours()}:${date.getMinutes()}`
}

export function currentDate(dateObject) {
  const date = dateObject
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
}
