import React from 'react';
import PropTypes from 'prop-types';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

// Value label component to show values in dollars
function ValueLabelComponent(props) {
  const { children, value } = props;
  return (
    <Tooltip enterTouchDelay={0} placement="top" title={`$${value}`}>
      <div>{children}</div>
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  value: PropTypes.number.isRequired,
};

const AirbnbSlider = styled(Slider)(({ theme }) => ({
  color: '#3a8589',
  height: 3,
  padding: '13px 0',
  '& .MuiSlider-thumb': {
    height: 27,
    width: 27,
    backgroundColor: '#fff',
    border: '1px solid currentColor',
    '&:hover': {
      boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
    },
    '& .airbnb-bar': {
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  '& .MuiSlider-track': {
    height: 3,
  },
  '& .MuiSlider-rail': {
    color: '#d8d8d8',
    opacity: 1,
    height: 3,
    ...theme.applyStyles('dark', {
      color: '#bfbfbf',
      opacity: undefined,
    }),
  },
}));

const AirbnbThumbComponent = (props) => {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
    </SliderThumb>
  );
};

AirbnbThumbComponent.propTypes = {
  children: PropTypes.node,
};

export default function CustomizedSlider({ value, onChange }) {
  return (
    <Box sx={{ width: 320, display: 'flex', justifyContent: 'center' }}>
      <AirbnbSlider
        value={value}
        onChange={onChange}
        valueLabelDisplay="auto"
        min={0}
        max={1000}
        aria-label="budget slider"
        getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
        slots={{ thumb: AirbnbThumbComponent }}
        components={{ ValueLabel: ValueLabelComponent }}
      />
    </Box>
  );
}