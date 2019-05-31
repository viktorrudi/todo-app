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

export function findItemsInFolder(propsItems, folderID) {
  const filteredItems = propsItems.filter(propItem => propItem.folder === folderID)
  return filteredItems
}

export function randomColor() {
  const colors = [
    'red',
    'blue',
    'orange',
    'purple',
    'pink',
    'yellow',
    'brown',
    'black',
    'gray',
    'lightblue',
    'magenta',
  ]
  const randomColor = Math.floor(Math.floor(Math.random() * colors.length) + 0)
  return colors[randomColor]
}
