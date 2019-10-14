// @flow
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';

export type CastDevice = {
  host: string;
  name: string;
};

interface CastDevicesProps {
  devices: CastDevice[];
  handleChosen: (host?: string, url?: string) => void;
}

function CastDevices(props: CastDevicesProps) {
  const [url, setUrl] = React.useState(window.location.href);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUrl(event.target.value);
  }

  const handleChosen = (device: CastDevice) => (_event: any) => {
    props.handleChosen(device.host, url);
  };

  function handleClose() {
    props.handleChosen();
  }

  return (
    <Dialog open onClose={handleClose}>
      <DialogTitle>Select device</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="URL"
          placeholder="https://timmo.dev/home-panel"
          value={url}
          onChange={handleChange}
        />
      </DialogContent>
      <List>
        {props.devices.map((device: CastDevice, key: number) => (
          <ListItem key={key} button onClick={handleChosen(device)}>
            <ListItemText primary={`${device.name} (${device.host})`} />
          </ListItem>
        ))}
        {props.devices.length < 1 && (
          <ListItem button>
            <ListItemText primary="No devices found" />
          </ListItem>
        )}
      </List>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

CastDevices.propTypes = {
  devices: PropTypes.any.isRequired,
  handleChosen: PropTypes.func.isRequired
};

export default CastDevices;