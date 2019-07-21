export function findItemInState (id, items) {
  const [found] = items.filter(item => id === item._id)
  return found
}

export function findOpenItem (allItems, openItemID) {
  const [found] = allItems.filter(folder => openItemID === folder._id)
  return found
}

export const findFromID = {
  folder: (id, folders) => {
    const [value] = folders.filter(folder => folder._id === id)
    return value || {}
  },
  item: (id, items) => {
    const [value] = items.filter(item => item._id === id)
    return value || {}
  }
}

export function findItemCount (allItems, folder) {
  let count = 0
  allItems.map(item => {
    if (item.folder === folder._id) {
      count++
    }
    return false
  })
  return count
}

export function randomColor () {
  const colors = ['red', 'blue', 'gray', 'orange', 'pink', 'green', 'yellow']
  const randomColor = Math.floor(Math.floor(Math.random() * colors.length))
  return colors[randomColor]
}
