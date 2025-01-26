import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Rating,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from '@mui/material';
import {
  LocationOn,
  AccessTime,
  Group,
  Favorite,
  FavoriteBorder,
} from '@mui/icons-material';
import './Tours.css';

const toursData = [
  {
    id: 1,
    title: "Cultural Heritage Walk",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da",
    duration: "2 Days",
    groupSize: "10-15",
    rating: 4.5,
    price: 299,
    location: "Rome, Italy",
    category: "Cultural",
    startDates: ["2024-02-15", "2024-03-01", "2024-03-15"],
    description: "Explore the rich history and cultural heritage of Rome through its ancient streets and monuments.",
    highlights: ["Colosseum Tour", "Vatican Museums", "Roman Forum", "Local Food Tasting"],
  },
  {
    id: 2,
    title: "Mountain Adventure Trek",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    duration: "5 Days",
    groupSize: "8-12",
    rating: 4.8,
    price: 599,
    location: "Swiss Alps",
    category: "Adventure",
    startDates: ["2024-02-20", "2024-03-10", "2024-03-25"],
    description: "Challenge yourself with an exciting trek through the stunning Swiss Alps.",
    highlights: ["Summit Hiking", "Cable Car Ride", "Alpine Villages", "Photography Sessions"],
  },
  {
    id: 3,
    title: "Tropical Paradise Tour",
    image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21",
    duration: "7 Days",
    groupSize: "6-10",
    rating: 4.6,
    price: 899,
    location: "Maldives",
    category: "Beach",
    startDates: ["2024-02-25", "2024-03-15", "2024-04-01"],
    description: "Relax and unwind in the pristine beaches and crystal-clear waters of the Maldives.",
    highlights: ["Snorkeling", "Island Hopping", "Sunset Cruise", "Beach BBQ"],
  },
  {
    id: 4,
    title: "Japanese Garden Tour",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186",
    duration: "4 Days",
    groupSize: "8-12",
    rating: 4.7,
    price: 499,
    location: "Kyoto, Japan",
    category: "Cultural",
    startDates: ["2024-03-05", "2024-03-20", "2024-04-05"],
    description: "Immerse yourself in the serene beauty of traditional Japanese gardens and temples.",
    highlights: ["Tea Ceremony", "Zen Gardens", "Temple Visit", "Kimono Experience"],
  },
  {
    id: 5,
    title: "Desert Safari Adventure",
    image: "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3",
    duration: "3 Days",
    groupSize: "6-8",
    rating: 4.9,
    price: 449,
    location: "Dubai, UAE",
    category: "Adventure",
    startDates: ["2024-02-28", "2024-03-15", "2024-03-30"],
    description: "Experience the thrill of desert adventures and traditional Bedouin culture.",
    highlights: ["Dune Bashing", "Camel Riding", "Desert Camping", "Arabian Nights"],
  },
  {
    id: 6,
    title: "Greek Island Hopping",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077",
    duration: "8 Days",
    groupSize: "10-15",
    rating: 4.6,
    price: 1299,
    location: "Greek Islands",
    category: "Beach",
    startDates: ["2024-03-10", "2024-03-25", "2024-04-10"],
    description: "Explore the stunning Cyclades islands, from Santorini to Mykonos.",
    highlights: ["Sunset in Oia", "Beach Exploration", "Wine Tasting", "Local Cuisine"],
  },
  {
    id: 7,
    title: "Amazon Rainforest Expedition",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5",
    duration: "6 Days",
    groupSize: "6-8",
    rating: 4.8,
    price: 899,
    location: "Amazon, Brazil",
    category: "Adventure",
    startDates: ["2024-03-01", "2024-03-15", "2024-04-01"],
    description: "Discover the incredible biodiversity of the Amazon rainforest.",
    highlights: ["Wildlife Spotting", "Canopy Walk", "Indigenous Village", "Night Safari"],
  },
  {
    id: 8,
    title: "Northern Lights Hunt",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7",
    duration: "5 Days",
    groupSize: "8-12",
    rating: 4.7,
    price: 1499,
    location: "Iceland",
    category: "Adventure",
    startDates: ["2024-02-15", "2024-03-01", "2024-03-15"],
    description: "Chase the magical Aurora Borealis across Iceland's stunning landscapes.",
    highlights: ["Aurora Viewing", "Hot Springs", "Glacier Walk", "Ice Cave Tour"],
  },
  {
    id: 9,
    title: "Taj Mahal & Golden Triangle",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada",
    duration: "6 Days",
    groupSize: "10-15",
    rating: 4.5,
    price: 799,
    location: "India",
    category: "Cultural",
    startDates: ["2024-03-05", "2024-03-20", "2024-04-05"],
    description: "Experience the rich cultural heritage of India's Golden Triangle.",
    highlights: ["Taj Mahal Visit", "Palace Tours", "Local Markets", "Cooking Class"],
  },
  {
    id: 10,
    title: "Bali Wellness Retreat",
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1",
    duration: "7 Days",
    groupSize: "8-10",
    rating: 4.9,
    price: 1099,
    location: "Bali, Indonesia",
    category: "Cultural",
    startDates: ["2024-02-25", "2024-03-10", "2024-03-25"],
    description: "Rejuvenate your mind and body in the spiritual heart of Bali.",
    highlights: ["Yoga Sessions", "Temple Visits", "Spa Treatments", "Rice Terrace Walk"],
  },
  {
    id: 11,
    title: "Caribbean Cruise Adventure",
    image: "https://images.unsplash.com/photo-1548574505-5e239809ee19",
    duration: "8 Days",
    groupSize: "20-30",
    rating: 4.6,
    price: 1599,
    location: "Caribbean Islands",
    category: "Beach",
    startDates: ["2024-03-01", "2024-03-15", "2024-04-01"],
    description: "Sail through the crystal-clear waters of the Caribbean Sea.",
    highlights: ["Island Visits", "Snorkeling", "Beach Parties", "Water Sports"],
  },
  {
    id: 12,
    title: "African Safari Experience",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801",
    duration: "7 Days",
    groupSize: "6-8",
    rating: 4.9,
    price: 2499,
    location: "Kenya",
    category: "Adventure",
    startDates: ["2024-02-20", "2024-03-05", "2024-03-20"],
    description: "Witness the incredible wildlife of the African savanna.",
    highlights: ["Game Drives", "Masai Village", "Sunset Safari", "Luxury Camping"],
  }
];

const Tours = () => {
  const [favorites, setFavorites] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('price');

  const toggleFavorite = (tourId) => {
    setFavorites(prev => 
      prev.includes(tourId)
        ? prev.filter(id => id !== tourId)
        : [...prev, tourId]
    );
  };

  const filteredTours = toursData
    .filter(tour => {
      const matchesCategory = selectedCategory === 'all' || tour.category === selectedCategory;
      const matchesSearch = tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tour.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'duration') return parseInt(a.duration) - parseInt(b.duration);
      return 0;
    });

  return (
    <Box className="tours-container">
      {/* Hero Section */}
      <Box className="tours-hero">
        <Typography variant="h1" className="hero-title">
          Discover Amazing Tours
        </Typography>
        <Typography variant="h5" className="hero-subtitle">
          Explore the world with our carefully curated travel experiences
        </Typography>
      </Box>

      {/* Filter Section */}
      <Container className="filter-section">
        <Box className="filter-container">
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search tours..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-field"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="filter-field"
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  <MenuItem value="Cultural">Cultural</MenuItem>
                  <MenuItem value="Adventure">Adventure</MenuItem>
                  <MenuItem value="Beach">Beach</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="filter-field"
                >
                  <MenuItem value="price">Price</MenuItem>
                  <MenuItem value="rating">Rating</MenuItem>
                  <MenuItem value="duration">Duration</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* Tours Grid */}
      <Container className="tours-grid-container">
        <Grid container spacing={4}>
          {filteredTours.map((tour) => (
            <Grid item xs={12} md={6} lg={4} key={tour.id}>
              <Card className="tour-card">
                <Box className="tour-image-container">
                  <CardMedia
                    component="img"
                    height="240"
                    image={tour.image}
                    alt={tour.title}
                    className="tour-image"
                  />
                  <Box className="tour-overlay">
                    <Chip
                      label={tour.category}
                      className="category-chip"
                    />
                    <IconButton
                      className="favorite-button"
                      onClick={() => toggleFavorite(tour.id)}
                    >
                      {favorites.includes(tour.id) ? (
                        <Favorite className="favorite-icon active" />
                      ) : (
                        <FavoriteBorder className="favorite-icon" />
                      )}
                    </IconButton>
                  </Box>
                </Box>
                <CardContent className="tour-content">
                  <Typography variant="h5" className="tour-title">
                    {tour.title}
                  </Typography>
                  <Box className="tour-info">
                    <Box className="info-item">
                      <LocationOn />
                      <Typography>{tour.location}</Typography>
                    </Box>
                    <Box className="info-item">
                      <AccessTime />
                      <Typography>{tour.duration}</Typography>
                    </Box>
                    <Box className="info-item">
                      <Group />
                      <Typography>{tour.groupSize} people</Typography>
                    </Box>
                  </Box>
                  <Box className="tour-rating">
                    <Rating value={tour.rating} precision={0.5} readOnly />
                    <Typography variant="body2">
                      {tour.rating} / 5
                    </Typography>
                  </Box>
                  <Typography className="tour-description">
                    {tour.description}
                  </Typography>
                  <Box className="tour-highlights">
                    {tour.highlights.map((highlight, index) => (
                      <Chip
                        key={index}
                        label={highlight}
                        className="highlight-chip"
                      />
                    ))}
                  </Box>
                  <Box className="tour-footer">
                    <Typography variant="h6" className="tour-price">
                      ${tour.price}
                      <Typography component="span" variant="body2"> / person</Typography>
                    </Typography>
                    <Button variant="contained" className="book-button">
                      Book Now
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Tours;
