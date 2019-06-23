export function findItemInState (id, items) {
  for (var i = 0; i < items.length; i++) {
    if (items[i].id === id) {
      return items[i]
    }
  }
}

export function currentTime (dateObject) {
  const date = dateObject
  return `${date.getHours()}:${date.getMinutes()}`
}

export function currentDate (dateObject) {
  const date = dateObject
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
}

export function findItemsInFolder (propsItems, folderID) {
  const filteredItems = propsItems.filter(
    propItem => propItem.folder === folderID
  )
  return filteredItems
}

export function findParentTag (search, parentClass) {
  while (search.parentNode) {
    search = search.parentNode
    if (search.className === parentClass) return Boolean(search)
  }
  return null
}

export function randomColor () {
  const colors = [
    '#D84343',
    '#0F9D58',
    '#F4B400',
    '#4285F4',
    '#4D4D4D',
    '#43459D',
    '#4DBFD9'
  ]
  const randomColor = Math.floor(Math.floor(Math.random() * colors.length) + 0)
  return colors[randomColor]
}
