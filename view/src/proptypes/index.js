import PropTypes from 'prop-types'

// Proptypes for Todo items
export const propTypeForItems = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string,
  folder: PropTypes.number,
  completed: PropTypes.bool.isRequired,
  creationStamp: PropTypes.string.isRequired,
  timeCreated: PropTypes.string
}

export const propTypeForFolders = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string,
  color: PropTypes.string
}
