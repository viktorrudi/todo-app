import PropTypes from 'prop-types'

// Proptypes for Todo items
export const propTypeForItems = {
  _id: PropTypes.string.isRequired,
  ownerID: PropTypes.string.isRequired,
  text: PropTypes.string,
  folder: PropTypes.string,
  completed: PropTypes.bool.isRequired,
  important: PropTypes.bool.isRequired,
  creationStamp: PropTypes.string.isRequired,
}

export const propTypeForFolders = {
  _id: PropTypes.string.isRequired,
  ownerID: PropTypes.string.isRequired,
  name: PropTypes.string,
  color: PropTypes.string
}
