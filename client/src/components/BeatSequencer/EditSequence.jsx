import React, { Component } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class EditSequence extends Component {
  renderKeys(setName) {
    const soundSet = this.props.soundSets[setName];

    return soundSet.map((set, index) => (
      <MenuItem
        value={set}
        primaryText={set}
        key={`${set}-${index}`}
      />
    ));
  }

  render() {
    const styles = {
      dropDownMenu: {
        width: '55%'
      },
      icon: {
        display: 'none'
      },
      menu: {
        width: '150px'
      }
    };

    return (
      <DropDownMenu
        className='editSequence pickSound'
        value={this.props.soundDef}
        onChange={this.props.handleSelect}
        autoWidth={false}
        maxHeight={300}
        style={styles.dropDownMenu}
        iconStyle={styles.icon}
        menuStyle={styles.menu}
      >
        {this.renderKeys('TR808')}
      </DropDownMenu>
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
