import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

class EditSequence extends Component {
  renderKeys(setName) {
    const soundSet = this.props.soundSets[setName];
    const innerDivStyle = {
      width: '150px'
    };

    return soundSet.map((set, index) => (
      <MenuItem
        value={set}
        primaryText={set}
        key={`${set}-${index}`}
        onTouchTap={() => this.props.handleSelect(set)}
        innerDivStyle={innerDivStyle}
      />
    ));
  }

  renderMainIcon() {
    return (
      <IconButton iconClassName='material-icons'>
        create
      </IconButton>
    );
  }

  arrowDropRight() {
    const style = {
      right: '0'
    };

    return (
      <ArrowDropRight
        style={style}
      />
    );
  }

  render() {
    return (
      <IconMenu
        iconButtonElement={this.renderMainIcon()}
        className='editSequence pickSound'
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'center'}}
      >
        <MenuItem
          primaryText='TR808'
          rightIcon={this.arrowDropRight()}
          menuItems={this.renderKeys('TR808')}
        />
      </IconMenu>
    );
  }
}

EditSequence.propTypes = {
  handleOpen: React.PropTypes.func.isRequired,
  showPopover: React.PropTypes.bool.isRequired,
  anchorEl: React.PropTypes.object,
  handleClose: React.PropTypes.func.isRequired,
  handleSelect: React.PropTypes.func.isRequired
};

export default EditSequence;
