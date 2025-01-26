import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from '../Footer/Footer';

const backgroundImages = [
  'https://images.unsplash.com/photo-1530789253388-582c481c54b0?ixlib=rb-4.0.3', // Santorini sunset
  'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3', // Maldives aerial
  'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?ixlib=rb-4.0.3', // Venice gondolas
  'https://images.unsplash.com/photo-1542542540-6da0c185d449?ixlib=rb-4.0.3', // Swiss Alps
];

const travelImages = [
  { url: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?ixlib=rb-4.0.3', title: 'Santorini, Greece' },
  { url: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3', title: 'Maldives' },
  { url: 'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?ixlib=rb-4.0.3', title: 'Venice, Italy' },
  { url: 'data:image/jpeg;base64,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', title: 'Swiss Alps' },
  { url: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?ixlib=rb-4.0.3', title: 'Great Wall, China' },
  { url: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?ixlib=rb-4.0.3', title: 'Taj Mahal, India' }
];

const featuredDestinations = [
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
    image: 'https://images.unsplash.com/photo-1531366936337-582c481c54b0?ixlib=rb-4.0.3',
    description: 'Embark on an alpine adventure in the majestic Swiss Alps, featuring breathtaking mountain views, pristine lakes, and charming villages nestled in scenic valleys.',
    price: 2199,
    duration: '6 Days',
    location: 'Switzerland',
    activities: ['Skiing', 'Hiking', 'Cable Car Tours']
  },
];

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    role: "Adventure Enthusiast",
    rating: 5,
    text: "The Swiss Alps trek was absolutely breathtaking! The guides were knowledgeable and the experience was unforgettable.",
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    role: "Cultural Explorer",
    rating: 5,
    text: "The Japan cultural tour exceeded all expectations. Every detail was perfectly planned and executed.",
  },
  {
    id: 3,
    name: "Emma Davis",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    role: "Beach Lover",
    rating: 5,
    text: "Maldives was a dream come true! Crystal clear waters and luxurious accommodations made it perfect.",
  },
];

const features = [
  {
    icon: <i className="fas fa-plane" />,
    title: "Flight Booking",
    description: "Get the best deals on flights to your dream destinations.",
  },
  {
    icon: <i className="fas fa-hotel" />,
    title: "Hotel Stays",
    description: "Luxurious and comfortable accommodations worldwide.",
  },
  {
    icon: <i className="fas fa-car" />,
    title: "Transportation",
    description: "Convenient transfers and car rentals at your service.",
  },
  {
    icon: <i className="fas fa-utensils" />,
    title: "Fine Dining",
    description: "Experience local cuisine and world-class restaurants.",
  },
];

const stats = [
  { number: "50+", label: "Countries" },
  { number: "200+", label: "Tours" },
  { number: "10k+", label: "Happy Customers" },
  { number: "15+", label: "Years Experience" },
];

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  useEffect(() => {
    if (location.state?.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location]);

  const handleExploreClick = () => {
    try {
      navigate('/destinations');
    } catch (error) {
      console.error('Navigation failed:', error);
      window.location.href = '/destinations';
    }
  };

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
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!bookingData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!bookingData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(bookingData.email)) {
      newErrors.email = 'Invalid email format';
    }

    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!bookingData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(bookingData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    const selectedDate = new Date(bookingData.date);
    const today = new Date();
    if (!bookingData.date) {
      newErrors.date = 'Date is required';
    } else if (selectedDate < today) {
      newErrors.date = 'Date cannot be in the past';
    }

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
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          height: '100vh',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Background Image */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${backgroundImages[0]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 100%)',
              zIndex: 1,
            },
          }}
        />

        {/* Content */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            padding: 4,
            color: 'white',
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              marginBottom: 2,
              color: '#FFD700',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            Explore the World
          </Typography>
          <Typography
            variant="h5"
            sx={{
              marginBottom: 4,
              fontStyle: 'italic',
              color: '#FFFFFF',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            }}
          >
            Discover amazing places and create unforgettable memories
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleExploreClick}
            sx={{
              fontSize: '1.3rem',
              padding: '15px 40px',
              borderRadius: '35px',
              background: 'linear-gradient(45deg, #FF6B6B, #FF8E53)',
              boxShadow: '0 4px 15px rgba(255,107,107,0.3)',
              border: '2px solid rgba(255,255,255,0.1)',
              cursor: 'pointer',
            }}
          >
            Explore Destinations
          </Button>
        </Box>
      </Box>

      {/* Image Gallery */}
      <Box sx={{ py: 6, backgroundColor: 'background.paper' }}>
        <Container>
          <Typography
            variant="h2"
            align="center"
            sx={{ 
              mb: 4, 
              fontWeight: 'bold', 
              color: 'primary.main',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            Popular Destinations
          </Typography>
          
          <Grid container spacing={3}>
            {travelImages.map((image, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ height: '300px', position: 'relative', overflow: 'hidden', boxShadow: 3 }}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={image.url}
                    alt={image.title}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      bgcolor: 'rgba(0, 0, 0, 0.5)',
                      color: 'white',
                      padding: 2,
                    }}
                  >
                    <Typography variant="h6">{image.title}</Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container>
        <Box sx={{ py: 8 }}>
          <Typography variant="h3" sx={{ textAlign: 'center', mb: 4 }}>
            Why Choose Us
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      {feature.title}
                    </Typography>
                    <Typography>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* Stats Section */}
      <Box sx={{ py: 8, backgroundColor: '#f5f5f5' }}>
        <Container>
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant="h3" sx={{ mb: 1 }}>
                    {stat.number}
                  </Typography>
                  <Typography variant="h6" color="textSecondary">
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Featured Destinations Section */}
      <Box sx={{ backgroundColor: '#f5f5f5', py: 8 }}>
        <Container>
          <Typography
            variant="h2"
            component="h2"
            sx={{ 
              textAlign: 'center',
              fontWeight: 800,
              background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              mb: 2
            }}
          >
            Featured Destinations
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            align="center"
            sx={{ mb: 6 }}
          >
            Explore our handpicked destinations for your next adventure
          </Typography>
          <Grid container spacing={4}>
            {featuredDestinations.map((destination, index) => (
              <Grid item xs={12} md={4} key={index}>
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
                        <i className="fas fa-map-marker-alt" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
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
                        <i className="fas fa-clock" sx={{ fontSize: 16 }} />
                        {destination.duration}
                      </Typography>
                      <Typography variant="body2" className="destination-price">
                        <i className="fas fa-dollar-sign" sx={{ fontSize: 16 }} />
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
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: 8 }}>
        <Container>
          <Typography variant="h3" sx={{ textAlign: 'center', mb: 4 }}>
            What Our Travelers Say
          </Typography>
          <Grid container spacing={4}>
            {testimonials.map((testimonial) => (
              <Grid item xs={12} md={4} key={testimonial.id}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <img src={testimonial.avatar} alt={testimonial.name} style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 16 }} />
                      <Box>
                        <Typography variant="h6">
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {testimonial.text}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      {[1, 2, 3, 4, 5].map((rating, index) => (
                        <i key={index} className={`fas fa-star${rating <= testimonial.rating ? '' : '-o'}`} sx={{ fontSize: 16, color: 'warning.main', marginRight: 0.5 }} />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Newsletter Section */}
      <Box sx={{ py: 8, backgroundColor: '#f5f5f5' }}>
        <Container>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Get Travel Updates
            </Typography>
            <Typography variant="h6" color="textSecondary" sx={{ mb: 4 }}>
              Subscribe to our newsletter for exclusive deals and travel tips
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <input type="email" placeholder="Enter your email" style={{ padding: '10px', fontSize: 16, border: '1px solid #ccc', borderRadius: 4, width: '100%' }} />
              <Button variant="contained" size="small" sx={{ ml: 2 }}>
                Subscribe
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Social Media Section */}
      <Box sx={{ py: 8 }}>
        <Container>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <i className="fab fa-facebook" style={{ fontSize: 24, color: '#4267B2', marginRight: 16 }} />
            <i className="fab fa-twitter" style={{ fontSize: 24, color: '#1DA1F2', marginRight: 16 }} />
            <i className="fab fa-instagram" style={{ fontSize: 24, color: '#E1306C' }} />
          </Box>
        </Container>
      </Box>

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
            <i className="fas fa-times" style={{ fontSize: 20, cursor: 'pointer' }} onClick={handleCloseBooking} />
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
                <input
                  required
                  fullWidth
                  type="text"
                  label="Full Name"
                  name="name"
                  value={bookingData.name}
                  onChange={handleInputChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  style={{ padding: '10px', fontSize: 16, border: '1px solid #ccc', borderRadius: 4 }}
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  required
                  fullWidth
                  type="email"
                  label="Email"
                  name="email"
                  value={bookingData.email}
                  onChange={handleInputChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  style={{ padding: '10px', fontSize: 16, border: '1px solid #ccc', borderRadius: 4 }}
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  required
                  fullWidth
                  type="text"
                  label="Phone Number"
                  name="phone"
                  value={bookingData.phone}
                  onChange={handleInputChange}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  placeholder="+1 234 567 8900"
                  style={{ padding: '10px', fontSize: 16, border: '1px solid #ccc', borderRadius: 4 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <input
                  required
                  fullWidth
                  type="date"
                  label="Travel Date"
                  name="date"
                  value={bookingData.date}
                  onChange={handleInputChange}
                  error={!!errors.date}
                  helperText={errors.date}
                  style={{ padding: '10px', fontSize: 16, border: '1px solid #ccc', borderRadius: 4 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <input
                  required
                  fullWidth
                  type="number"
                  label="Number of Guests"
                  name="guests"
                  value={bookingData.guests}
                  onChange={handleInputChange}
                  error={!!errors.guests}
                  helperText={errors.guests}
                  style={{ padding: '10px', fontSize: 16, border: '1px solid #ccc', borderRadius: 4 }}
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

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Home;
