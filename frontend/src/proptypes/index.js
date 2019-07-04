import PropTypes from 'prop-types'

// Proptypes for Todo items
export const propTypeForItems = {
  _id: PropTypes.string.isRequired,
  text: PropTypes.string,
  folder: PropTypes.string,
  completed: PropTypes.bool.isRequired,
  creationStamp: PropTypes.string.isRequired,
  timeCreated: PropTypes.string
}

export const propTypeForFolders = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string,
  color: PropTypes.string
}
