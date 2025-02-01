import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  MenuItem,
  Tooltip,
  Dialog,
  DialogContent,
  TextField,
  InputAdornment,
  Alert,
  CircularProgress,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CloseIcon from '@mui/icons-material/Close';
import { auth } from '../../firebase';
import { signInWithPopup, FacebookAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { FaFacebook } from 'react-icons/fa';
import travelLogo from '../../assets/travel-logo.png';

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
    setError('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    setTabValue(0);
  };

  const handleEmailLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      handleLoginClose();
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      handleLoginClose();
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      handleLoginClose();
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const handleFacebookSignIn = async () => {
    const provider = new FacebookAuthProvider();
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      handleLoginClose();
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const pages = ['Home', 'Destinations', 'Tours', 'About', 'Contact'];

  return (
    <AppBar position="static" sx={{ backgroundColor: '#fff' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Logo and brand name - always on the left */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={travelLogo}
                alt="EasyTours Logo"
                style={{
                  width: '40px',
                  height: '40px',
                  marginRight: '10px',
                  objectFit: 'contain'
                }}
              />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  color: '#333',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  letterSpacing: '.1rem'
                }}
              >
                EasyTours
              </Typography>
            </Box>
          </Link>

          {/* Right side content */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Mobile menu button */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                sx={{ color: '#333' }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Desktop navigation links */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  component={Link}
                  to={page === 'Home' ? '/' : `/${page.toLowerCase()}`}
                  onClick={handleCloseNavMenu}
                  sx={{ 
                    color: '#333',
                    mx: 1,
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.05)'
                    }
                  }}
                >
                  {page}
                </Button>
              ))}

              {/* Auth section */}
              <Box sx={{ ml: 2 }}>
                {!auth.currentUser ? (
                  <IconButton
                    onClick={handleLoginOpen}
                    sx={{
                      bgcolor: '#ff6b6b',
                      color: 'white',
                      '&:hover': {
                        bgcolor: '#ff5252'
                      },
                      width: 40,
                      height: 40
                    }}
                  >
                    <PersonIcon />
                  </IconButton>
                ) : (
                  <Tooltip title="Account settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar 
                        src={auth.currentUser.photoURL}
                        alt={auth.currentUser.displayName}
                      >
                        {auth.currentUser.email?.[0].toUpperCase()}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </Container>

      {/* Login Dialog */}
      <Dialog 
        open={loginOpen} 
        onClose={handleLoginClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            p: 0,
            backgroundColor: 'white'
          }
        }}
      >
        <IconButton
          onClick={handleLoginClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'grey.500',
            zIndex: 1
          }}
        >
          <CloseIcon />
        </IconButton>
        
        <Box sx={{ 
          textAlign: 'center', 
          p: 3,
          pb: 0
        }}>
          <Avatar sx={{ 
            mx: 'auto', 
            mb: 1,
            bgcolor: '#ff6b6b',
            width: 48,
            height: 48
          }}>
            <PersonIcon />
          </Avatar>
          <Typography variant="h5" sx={{ mb: 1, color: '#333' }}>
            Welcome
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: '#666' }}>
            {tabValue === 0 ? 'Login' : 'Sign Up'}
          </Typography>
        </Box>

        <DialogContent sx={{ p: 3, pt: 2 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <TextField
            autoFocus
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            placeholder="Email Address"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: '#666' }} />
                </InputAdornment>
              ),
            }}
            sx={{ 
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                bgcolor: '#f8f9fa'
              }
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            placeholder="Password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: '#666' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ 
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                bgcolor: '#f8f9fa'
              }
            }}
          />

          <Button
            fullWidth
            variant="contained"
            onClick={tabValue === 0 ? handleEmailLogin : handleSignUp}
            disabled={loading}
            sx={{ 
              mb: 2,
              py: 1.5,
              bgcolor: '#ff6b6b',
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
              '&:hover': {
                bgcolor: '#ff5252'
              }
            }}
          >
            {loading ? <CircularProgress size={24} /> : (tabValue === 0 ? 'Login' : 'Sign Up')}
          </Button>

          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              or
            </Typography>
          </Box>

          <Button
            fullWidth
            variant="outlined"
            onClick={handleGoogleSignIn}
            disabled={loading}
            sx={{ 
              mb: 2,
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
              borderColor: '#ddd',
              color: '#666',
              '&:hover': {
                borderColor: '#ccc',
                bgcolor: '#f8f9fa'
              }
            }}
            startIcon={
              <img 
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                style={{ width: 20, height: 20 }}
              />
            }
          >
            Continue with Google
          </Button>

          <Button
            fullWidth
            variant="outlined"
            onClick={handleFacebookSignIn}
            disabled={loading}
            sx={{ 
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
              borderColor: '#1877f2',
              color: '#1877f2',
              '&:hover': {
                borderColor: '#1877f2',
                bgcolor: 'rgba(24, 119, 242, 0.04)'
              }
            }}
            startIcon={<FaFacebook />}
          >
            Continue with Facebook
          </Button>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Button
              onClick={() => setTabValue(tabValue === 0 ? 1 : 0)}
              sx={{ 
                textTransform: 'none',
                color: '#666'
              }}
            >
              {tabValue === 0 ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* User menu */}
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography textAlign="center">Profile</Typography>
        </MenuItem>
        <MenuItem onClick={() => {
          auth.signOut();
          handleCloseUserMenu();
        }}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
