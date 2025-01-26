import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar, Box, Button, Drawer, IconButton, Toolbar, Typography,
  Dialog, DialogContent, TextField, Tabs, Tab,
  Tooltip, Alert, Snackbar, Avatar, Menu, MenuItem, CircularProgress,
  Divider, InputAdornment
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import { auth, signInWithGoogle } from '../../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpen = () => {
    handleMenuClose();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setShowPassword(false);
    setTabValue(0);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    }
    if (!re.test(email)) {
      setEmailError('Invalid email format');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password) => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    }
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (tabValue === 1) {
      if (!confirmPassword) {
        setConfirmPasswordError('Please confirm your password');
        return false;
      }
      if (password !== confirmPassword) {
        setConfirmPasswordError('Passwords do not match');
        return false;
      }
    }
    setConfirmPasswordError('');
    return true;
  };

  const handleLogin = async () => {
    if (!validateEmail(email) || !validatePassword(password)) {
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      handleClose();
      setSnackbarMessage('Successfully logged in!');
      setSnackbarOpen(true);
    } catch (error) {
      setError(error.message.replace('Firebase: ', ''));
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!validateEmail(email) || !validatePassword(password) || !validateConfirmPassword(password, confirmPassword)) {
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      handleClose();
      setSnackbarMessage('Account created successfully!');
      setSnackbarOpen(true);
    } catch (error) {
      setError(error.message.replace('Firebase: ', ''));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      handleClose();
      setSnackbarMessage('Successfully logged in with Google!');
      setSnackbarOpen(true);
    } catch (error) {
      setError('Error signing in with Google');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    auth.signOut();
    handleMenuClose();
    setSnackbarMessage('Successfully logged out!');
    setSnackbarOpen(true);
  };

  const handleScroll = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const drawer = (
    <Box sx={{ p: 2 }}>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }} onClick={handleDrawerToggle}>
        <Typography variant="h6" sx={{ mb: 2 }}>Home</Typography>
      </Link>
      <Link to="/destinations" style={{ textDecoration: 'none', color: 'inherit' }} onClick={handleDrawerToggle}>
        <Typography variant="h6" sx={{ mb: 2 }}>Destinations</Typography>
      </Link>
      <Link to="/tours" style={{ textDecoration: 'none', color: 'inherit' }} onClick={handleDrawerToggle}>
        <Typography variant="h6" sx={{ mb: 2 }}>Tours</Typography>
      </Link>
      <Typography variant="h6" sx={{ mb: 2, cursor: 'pointer' }} onClick={() => { handleScroll('about'); handleDrawerToggle(); }}>
        About
      </Typography>
      <Typography variant="h6" sx={{ mb: 2, cursor: 'pointer' }} onClick={() => { handleScroll('contact'); handleDrawerToggle(); }}>
        Contact
      </Typography>
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'white' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' }, color: '#333' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              color: '#333',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            EasyTours
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
            <Button
              component={Link}
              to="/"
              sx={{ color: '#333', mr: 2 }}
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/destinations"
              sx={{ color: '#333', mr: 2 }}
            >
              Destinations
            </Button>
            <Button
              component={Link}
              to="/tours"
              sx={{ color: '#333', mr: 2 }}
            >
              Tours
            </Button>
            <Button
              color="inherit"
              sx={{ color: '#333', mr: 2 }}
              onClick={() => handleScroll('about')}
            >
              About
            </Button>
            <Button
              color="inherit"
              sx={{ color: '#333', mr: 2 }}
              onClick={() => handleScroll('contact')}
            >
              Contact
            </Button>
            <Tooltip title={auth.currentUser ? 'Account' : 'Login/Signup'}>
              <IconButton
                onClick={handleMenuOpen}
                sx={{
                  color: '#333',
                  backgroundColor: 'rgba(25, 118, 210, 0.04)',
                  borderRadius: '50%',
                  padding: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.08)',
                  },
                }}
              >
                {auth.currentUser ? (
                  <Avatar
                    src={auth.currentUser.photoURL}
                    sx={{
                      width: 32,
                      height: 32,
                      border: '2px solid #1976d2',
                    }}
                  >
                    {auth.currentUser.email?.[0].toUpperCase()}
                  </Avatar>
                ) : (
                  <PersonIcon sx={{ 
                    fontSize: 28,
                    color: '#1976d2',
                  }} />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {auth.currentUser ? (
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        ) : (
          <MenuItem onClick={handleClickOpen}>Login/Signup</MenuItem>
        )}
      </Menu>

      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="xs" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }
        }}
      >
        <Box sx={{ 
          bgcolor: 'primary.main',
          py: 3,
          px: 2,
          textAlign: 'center',
          position: 'relative'
        }}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
          <Avatar
            sx={{
              width: 60,
              height: 60,
              bgcolor: 'white',
              color: 'primary.main',
              margin: '0 auto 16px',
            }}
          >
            <PersonIcon sx={{ fontSize: 40 }} />
          </Avatar>
          <Typography variant="h5" color="white" gutterBottom>
            Welcome
          </Typography>
          <Tabs 
            value={tabValue} 
            onChange={(e, newValue) => {
              setTabValue(newValue);
              setError('');
              setEmailError('');
              setPasswordError('');
              setConfirmPasswordError('');
            }} 
            centered
            sx={{
              '& .MuiTab-root': {
                minWidth: 120,
                fontWeight: 'bold',
                color: 'rgba(255, 255, 255, 0.7)',
                '&.Mui-selected': {
                  color: 'white',
                },
              },
              '& .MuiTabs-indicator': {
                height: 3,
                borderRadius: 1.5,
                backgroundColor: 'white',
              },
            }}
          >
            <Tab label="Login" />
            <Tab label="Sign Up" />
          </Tabs>
        </Box>
        <DialogContent sx={{ p: 4 }}>
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                borderRadius: 2,
                '& .MuiAlert-icon': {
                  color: '#d32f2f'
                }
              }}
            >
              {error}
            </Alert>
          )}
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError('');
            }}
            error={!!emailError}
            helperText={emailError}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color={emailError ? 'error' : 'primary'} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="dense"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError('');
            }}
            error={!!passwordError}
            helperText={passwordError}
            sx={{
              mb: tabValue === 1 ? 2 : 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color={passwordError ? 'error' : 'primary'} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ color: 'primary.main' }}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {tabValue === 1 && (
            <TextField
              margin="dense"
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setConfirmPasswordError('');
              }}
              error={!!confirmPasswordError}
              helperText={confirmPasswordError}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color={confirmPasswordError ? 'error' : 'primary'} />
                  </InputAdornment>
                ),
              }}
            />
          )}
          <Button
            fullWidth
            variant="contained"
            onClick={tabValue === 0 ? handleLogin : handleSignup}
            disabled={loading}
            sx={{
              mb: 2,
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
              boxShadow: 'none',
              '&:hover': {
                boxShadow: 'none',
                bgcolor: 'primary.dark',
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              tabValue === 0 ? 'Login' : 'Sign Up'
            )}
          </Button>
          <Divider sx={{ 
            my: 2,
            '&::before, &::after': {
              borderColor: 'rgba(0, 0, 0, 0.08)',
            },
          }}>
            <Typography variant="body2" color="text.secondary" sx={{ px: 1 }}>
              or
            </Typography>
          </Divider>
          <Button
            fullWidth
            variant="outlined"
            onClick={handleGoogleSignIn}
            disabled={loading}
            sx={{
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
              borderColor: 'rgba(0, 0, 0, 0.12)',
              color: 'text.primary',
              '&:hover': {
                borderColor: 'primary.main',
                bgcolor: 'rgba(25, 118, 210, 0.04)',
              },
            }}
            startIcon={
              loading ? (
                <CircularProgress size={20} />
              ) : (
                <img 
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                  alt="Google" 
                  style={{ width: 20, height: 20 }} 
                />
              )
            }
          >
            Continue with Google
          </Button>
        </DialogContent>
      </Dialog>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </>
  );
};

export default Navbar;
