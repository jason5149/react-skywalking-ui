import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Button extends Component {
  render() {
    return (
      <button>按钮</button>
    )
  }
}

Button.propTypes = {
  type: PropTypes.string,
}

Button.defaultProps = {
  type: 'primary',
}

export default Button