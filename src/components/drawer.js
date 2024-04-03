import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { RxCross2 } from "react-icons/rx";

export default function DrawerRight({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    rfq: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    
    e.preventDefault();
    if(formData.name === "" || formData.rfq === "" || formData.startDate === "" || formData.endDate === "") {
        alert("Please fill all the fields")
    }
    else {
        console.log('Form Data:', formData);
        setFormData({
            name: '',
            startDate: '',
            endDate: '',
            rfq: ''
          })
        onClose();
    }
  };

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
    >
      <Box
        sx={{ width: 250, padding: '20px' }}
        role="presentation"
      >
        <div>
        <RxCross2 onClick={()=> onClose()}/>
        </div>
        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            name="startDate"
            label="Start Date"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            name="endDate"
            label="End Date"
            type="date"
            value={formData.endDate}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            name="rfq"
            label="RFQ Code"
            value={formData.rfq}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </form>
      </Box>
    </Drawer>
  );
}
