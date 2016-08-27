import React from 'react';
import Popover from 'material-ui/Popover';
import IconButton from 'material-ui/IconButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

// TODO: pass in MenuItems from parent component
const EditSequence = ({ anchorEl, showPopover, handleOpen, handleClose, handleSelect }) => (
  <div className="editSequence">
    <IconButton
      iconClassName="material-icons"
      onTouchTap={handleOpen}
    >
      create
    </IconButton>
    <Popover
      className="pickSound"
      open={showPopover}
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      targetOrigin={{ horizontal: 'left', vertical: 'center' }}
      onRequestClose={handleClose}
      canAutoPosition={false}
    >
      <SelectField
        className="pickSound"
        floatingLabelText="Pick a sound"
        floatingLabelFixed
        onChange={handleSelect}
      >
        <MenuItem value="bell" primaryText="Bell" />
        <MenuItem value="conga" primaryText="Conga" />
        <MenuItem value="membrane" primaryText="Membrane" />
        <MenuItem value="metal" primaryText="Metal" />
      </SelectField>
    </Popover>
  </div>
);

EditSequence.propTypes = {
  handleOpen: React.PropTypes.func.isRequired,
  showPopover: React.PropTypes.bool.isRequired,
  anchorEl: React.PropTypes.object,
  handleClose: React.PropTypes.func.isRequired,
  handleSelect: React.PropTypes.func.isRequired
};

export default EditSequence;
