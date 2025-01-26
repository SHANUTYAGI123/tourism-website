import React, { useState } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Button, TextField, Box, Typography, InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Alert, Snackbar, Select, MenuItem } from '@mui/material';
import { motion } from 'framer-motion';
import { Search, AccessTime, AttachMoney, Close, FlightTakeoff } from '@mui/icons-material';
import LocationOn from '@mui/icons-material/LocationOn';
import './Destinations.css';

const destinations = [
  {
    id: 1,
    title: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?ixlib=rb-4.0.3',
    description: 'Experience the magic of Santorini with its iconic white-washed buildings, stunning sunsets over the Aegean Sea, and charming villages perched on volcanic cliffs.',
    price: 1899,
    duration: '7 Days',
    location: 'Cyclades Islands, Greece',
    activities: ['Island Hopping', 'Wine Tasting', 'Sunset Cruise']
  },
  {
    id: 2,
    title: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3',
    description: 'Discover the tropical paradise of Bali with its pristine beaches, ancient temples, lush rice terraces, and vibrant cultural heritage that captivates every visitor.',
    price: 1499,
    duration: '8 Days',
    location: 'Bali, Indonesia',
    activities: ['Temple Tours', 'Beach Activities', 'Spa Retreats']
  },
  {
    id: 3,
    title: 'Swiss Alps',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3',
    description: 'Embark on an alpine adventure in the majestic Swiss Alps, featuring breathtaking mountain views, pristine lakes, and charming villages nestled in scenic valleys.',
    price: 2199,
    duration: '6 Days',
    location: 'Switzerland',
    activities: ['Skiing', 'Hiking', 'Cable Car Tours']
  },
  {
    id: 4,
    title: 'Machu Picchu, Peru',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-4.0.3',
    description: 'Journey to the ancient Incan citadel of Machu Picchu, where mystical ruins, cloud-touched peaks, and rich Andean culture create an unforgettable historical adventure.',
    price: 2499,
    duration: '9 Days',
    location: 'Cusco Region, Peru',
    activities: ['Archaeological Tours', 'Mountain Trekking', 'Cultural Experiences']
  },
  {
    id: 5,
    title: 'Maldives',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3',
    description: 'Escape to the pristine paradise of the Maldives, where crystal-clear waters, overwater bungalows, and vibrant coral reefs create the perfect tropical getaway.',
    price: 2899,
    duration: '5 Days',
    location: 'Maldives Islands',
    activities: ['Snorkeling', 'Water Villa Stay', 'Sunset Sailing']
  },
  {
    id: 6,
    title: 'Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3',
    description: 'Immerse yourself in the timeless beauty of Kyoto, where ancient temples, serene gardens, and traditional tea houses preserve Japan\'s rich cultural heritage.',
    price: 1999,
    duration: '7 Days',
    location: 'Kyoto, Japan',
    activities: ['Temple Visits', 'Tea Ceremonies', 'Garden Tours']
  }
];

const Destinations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [openBooking, setOpenBooking] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: 1
  });
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!bookingData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!bookingData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(bookingData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Phone validation
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!bookingData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(bookingData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    // Date validation
    const selectedDate = new Date(bookingData.date);
    const today = new Date();
    if (!bookingData.date) {
      newErrors.date = 'Date is required';
    } else if (selectedDate < today) {
      newErrors.date = 'Date cannot be in the past';
    }

    // Guests validation
    if (bookingData.guests < 1) {
      newErrors.guests = 'At least 1 guest is required';
    } else if (bookingData.guests > 10) {
      newErrors.guests = 'Maximum 10 guests allowed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Here you would typically send the booking data to your backend
      console.log('Booking submitted:', {
        destination: selectedDestination,
        ...bookingData
      });
      handleCloseBooking();
      setOpenSnackbar(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const filteredDestinations = destinations
    .filter(dest => 
      dest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'duration':
          return parseInt(a.duration) - parseInt(b.duration);
        default:
          return 0;
      }
    });

  const handleBookNow = (destination) => {
    setSelectedDestination(destination);
    setOpenBooking(true);
  };

  const handleCloseBooking = () => {
    setOpenBooking(false);
    setSelectedDestination(null);
    setBookingData({
      name: '',
      email: '',
      phone: '',
      date: '',
      guests: 1
    });
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)' }}>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box textAlign="center" mb={6}>
            <Typography 
              variant="h2" 
              component="h1" 
              sx={{ 
                fontWeight: 800,
                background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2
              }}
            >
              Discover Your Next Adventure
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
              Explore our handpicked destinations and create unforgettable memories
            </Typography>
          </Box>

          <Box className="search-section">
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder="Search destinations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search color="primary" />
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: '12px',
                      '&:hover': {
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'primary.main',
                        },
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ 
                  borderRadius: '12px',
                  backgroundColor: 'white',
                  p: 2,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}>
                  <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
                    <FlightTakeoff sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Sort Your Journey
                  </Typography>
                  <Select
                    fullWidth
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    sx={{ 
                      borderRadius: '8px',
                      '& .MuiSelect-select': {
                        py: 1.5
                      }
                    }}
                  >
                    <MenuItem value="recommended">Recommended</MenuItem>
                    <MenuItem value="price-low">Price: Low to High</MenuItem>
                    <MenuItem value="price-high">Price: High to Low</MenuItem>
                    <MenuItem value="rating">Highest Rated</MenuItem>
                    <MenuItem value="duration">Duration</MenuItem>
                  </Select>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </motion.div>

        <Grid container spacing={4} sx={{ mt: 4 }}>
          {filteredDestinations.map((destination, index) => (
            <Grid item xs={12} sm={6} md={4} key={destination.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="destination-card" elevation={0}>
                  <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                    <CardMedia
                      className="destination-image"
                      component="img"
                      image={destination.image}
                      alt={destination.title}
                    />
                    <Box 
                      className="destination-overlay"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                        display: 'flex',
                        alignItems: 'flex-end',
                        padding: 2,
                        '&:hover': {
                          opacity: 1
                        }
                      }}
                    >
                      <Typography variant="body2" sx={{ color: 'white' }}>
                        <LocationOn sx={{ mr: 0.5, verticalAlign: 'middle' }} />
                        {destination.location}
                      </Typography>
                    </Box>
                  </Box>
                  <CardContent className="destination-content">
                    <Typography variant="h5" component="h3" className="destination-title">
                      {destination.title}
                    </Typography>
                    <Typography variant="body2" className="destination-description">
                      {destination.description}
                    </Typography>
                    <div className="destination-info">
                      <Typography variant="body2" className="destination-duration">
                        <AccessTime sx={{ fontSize: 16 }} />
                        {destination.duration}
                      </Typography>
                      <Typography variant="body2" className="destination-price">
                        <AttachMoney sx={{ fontSize: 16 }} />
                        ${destination.price}
                      </Typography>
                    </div>
                    <div className="activities-container">
                      {destination.activities.map((activity, idx) => (
                        <span key={idx} className="activity-chip">
                          {activity}
                        </span>
                      ))}
                    </div>
                    <Button
                      variant="contained"
                      fullWidth
                      className="book-now-button"
                      onClick={() => handleBookNow(destination)}
                    >
                      Book Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Booking Modal */}
      <Dialog
        open={openBooking}
        onClose={handleCloseBooking}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            Book Your Trip to {selectedDestination?.title}
            <IconButton onClick={handleCloseBooking} size="small">
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <form onSubmit={handleBookingSubmit}>
          <DialogContent>
            {selectedDestination && (
              <Box mb={3}>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  {selectedDestination.duration} | ${selectedDestination.price} per person
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedDestination.description}
                </Typography>
                <Box mt={2} p={2} bgcolor="#f8f9fa" borderRadius={1}>
                  <Typography variant="body2" color="text.secondary">
                    Total Price: ${selectedDestination.price * bookingData.guests}
                  </Typography>
                </Box>
              </Box>
            )}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={bookingData.name}
                  onChange={handleInputChange}
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={bookingData.email}
                  onChange={handleInputChange}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={bookingData.phone}
                  onChange={handleInputChange}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  placeholder="+1 234 567 8900"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Travel Date"
                  name="date"
                  type="date"
                  value={bookingData.date}
                  onChange={handleInputChange}
                  error={!!errors.date}
                  helperText={errors.date}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ min: new Date().toISOString().split('T')[0] }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Number of Guests"
                  name="guests"
                  type="number"
                  value={bookingData.guests}
                  onChange={handleInputChange}
                  error={!!errors.guests}
                  helperText={errors.guests}
                  InputProps={{ inputProps: { min: 1, max: 10 } }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseBooking} color="inherit">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              className="book-now-button"
            >
              Confirm Booking
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          variant="filled"
        >
          Booking submitted successfully! We'll contact you soon.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Destinations;