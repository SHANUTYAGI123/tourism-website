import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn, Phone, Email, LocationOn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1976d2',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About Section */}
          <Grid item xs={12} md={4} id="about">
            <Box id="about" sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 2, color: 'white' }}>
                About Us
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey.400' }}>
                We are passionate about creating unforgettable travel experiences. Our team of experts
                curates the best destinations and provides personalized service to make your dream
                vacation a reality.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <IconButton color="inherit" aria-label="Facebook">
                  <Facebook />
                </IconButton>
                <IconButton color="inherit" aria-label="Twitter">
                  <Twitter />
                </IconButton>
                <IconButton color="inherit" aria-label="Instagram">
                  <Instagram />
                </IconButton>
                <IconButton color="inherit" aria-label="LinkedIn">
                  <LinkedIn />
                </IconButton>
              </Box>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link href="#" color="inherit" sx={{ mb: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                Home
              </Link>
              <Link href="#about" color="inherit" sx={{ mb: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                About Us
              </Link>
              <Link href="#contact" color="inherit" sx={{ mb: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                Contact
              </Link>
              <Link href="#" color="inherit" sx={{ mb: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                Privacy Policy
              </Link>
            </Box>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={4} id="contact">
            <Box id="contact" sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 2, color: 'white' }}>
                Contact Us
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOn sx={{ mr: 1 }} />
                <Typography variant="body2" sx={{ color: 'grey.400' }}>
                  123 Tourism Street, Travel City, TC 12345
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Phone sx={{ mr: 1 }} />
                <Typography variant="body2" sx={{ color: 'grey.400' }}>
                  +1 (555) 123-4567
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Email sx={{ mr: 1 }} />
                <Typography variant="body2" sx={{ color: 'grey.400' }}>
                  info@tourismwebsite.com
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box sx={{ mt: 4, borderTop: '1px solid rgba(255, 255, 255, 0.2)', pt: 3 }}>
          <Typography variant="body2" align="center">
            {new Date().getFullYear()} Tourism Website. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
