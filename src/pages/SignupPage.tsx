import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Link,
  CircularProgress,
  Alert,
  IconButton,
  InputAdornment,
  styled,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useAuth } from "../context/AuthContext";

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(4),
  maxWidth: "450px",
  margin: "0 auto",
  borderRadius: "16px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
}));

const Logo = styled(Typography)({
  fontWeight: "bold",
  marginBottom: "24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& span": {
    color: "#FF5722",
  },
});

const SignupPage: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [birthdate, setBirthdate] = useState("");

  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const { authState, register } = useAuth();
  const { loading, error } = authState;
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone: string) => {
    // Basic validation for phone number
    const re = /^\+?[0-9]{10,15}$/;
    return re.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setFullNameError("");
    setEmailError("");
    setPasswordError("");
    setPhoneNumberError("");

    // Validate inputs
    let hasError = false;

    if (!fullName) {
      setFullNameError("Full name is required");
      hasError = true;
    }

    if (!email) {
      setEmailError("Email is required");
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email");
      hasError = true;
    }

    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      hasError = true;
    }

    if (phoneNumber && !validatePhone(phoneNumber)) {
      setPhoneNumberError("Please enter a valid phone number");
      hasError = true;
    }

    if (hasError) return;

    try {
      await register(fullName, email, password, phoneNumber);
      navigate("/");
    } catch (err) {
      console.error("Registration failed", err);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container component="main" maxWidth="sm">
      <StyledPaper elevation={1}>
        <Box sx={{ alignSelf: "flex-start", mb: 2 }}>
          <IconButton onClick={() => navigate("/login")} edge="start">
            <ArrowBackIcon />
          </IconButton>
        </Box>

        <Logo variant="h4">
          Find<span>It</span>
        </Logo>

        <Typography variant="h5" component="h1" gutterBottom>
          Sign up
        </Typography>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          Create an account to continue!
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: "100%", mt: 2, mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 3, width: "100%" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="fullName"
            label="Full Name"
            name="fullName"
            autoComplete="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            error={!!fullNameError}
            helperText={fullNameError}
            disabled={loading}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!emailError}
            helperText={emailError}
            disabled={loading}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
            disabled={loading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleTogglePassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              mt: 1,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <TextField
                fullWidth
                id="birthdate"
                label="Date of Birth"
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={loading}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <TextField
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                error={!!phoneNumberError}
                helperText={phoneNumberError}
                disabled={loading}
              />
            </Box>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            disabled={loading}
            sx={{
              mt: 4,
              mb: 2,
              py: 1.5,
              borderRadius: "8px",
              textTransform: "none",
              fontSize: "1rem",
            }}
          >
            {loading ? <CircularProgress size={24} /> : "Register"}
          </Button>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{" "}
              <Link
                component={RouterLink}
                to="/login"
                variant="body2"
                color="primary"
              >
                Login
              </Link>
            </Typography>
          </Box>
        </Box>
      </StyledPaper>
    </Container>
  );
};

export default SignupPage;
