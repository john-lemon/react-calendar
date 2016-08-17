import React from 'react';
import ReactDOM from 'react-dom';


import './Dropdown.styl';

class Dropdown extends React.Component {

  render () {
    return <div className={`dropdown-menu ${this.state.opened === true ? 'dropdown-menu_opened' : ''} ${this.mix}`}>
      <span className="dropdown-menu__close"onClick={this._onCloseMenu}>X</span>
        <ul className="dropdown-menu__list">
          {this.props.options.map(item => {
            return <li className="dropdown-menu__item" onClick={this._onItemClick.bind(this, item.action)} key={item.name}>
              {item.name}
            </li>
          })}
        </ul>
    </div>
  }

  componentWillMount () {
    this.state = {}
    this.state.opened = false;
  }

  _onCloseMenu () {
    this.setState({
      opened: false
    })
  }

  _onItemClick (action) {
    this._onCloseMenu();
    action();
  }
}

Dropdown.defaultProps = {
    options: []
}

export default Dropdown
