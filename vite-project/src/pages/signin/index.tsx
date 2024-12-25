import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import KakaoIcon from '/kakaotalk.svg';
import axios from '~/common/Axios';
import { setToken, TokenType } from '~/common/Token';
import { useNavigate } from 'react-router-dom';
import { Card } from '~/components/Card';
import { SignInContainer } from '~/components/signin/SignInContainer';

export default function Signin() {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const handleSubmit = async () => {
    if (!validateInputs()) {
      return;
    }
    if (emailError || passwordError) {
      return;
    }
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    console.log({
      email: email.value,
      password: password.value,
    });
    try {
      const res = await axios.post('/api/auth/login', {
        email: email.value,
        password: password.value,
      });
      if (res.data.success) {
        setToken(TokenType.ACCESS_TOKEN, res.data.token.access_token);
        setToken(TokenType.REFRESH_TOKEN, res.data.token.refresh_token);
        navigate('/');
      }
    } catch (e: any) {
      console.error(e);
      alert(e.message);
    }
  };

  const handleSnSLogin = async (type: 'google' | 'kakao') => {
    if (type === 'google') {
      const res = await axios.get('/api/auth/google/signin');
      window.location.href = res.data;
    } else if (type === 'kakao') {
      const res = await axios.get('/api/auth/kakao/signin');
      window.location.href = res.data;
    } else {
      console.error('Invalid login type');
    }
  };

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
    <div>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography variant="h4" component="h1" gutterBottom>
            로그인
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <Button
              type="button"
              fullWidth
              variant="contained"
              onClick={handleSubmit}
            >
              Sign in
            </Button>

            <Divider>or</Divider>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => handleSnSLogin('google')}
                startIcon={<GoogleIcon />}
              >
                구글로 로그인
              </Button>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => handleSnSLogin('kakao')}
              >
                <img
                  src={KakaoIcon}
                  alt="kakao"
                  width={20}
                  height={20}
                  color="yellow"
                />
                카카오로 로그인
              </Button>
            </Box>
          </Box>
        </Card>
      </SignInContainer>
    </div>
  );
}
