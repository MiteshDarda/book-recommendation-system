import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { signIn } from '../../api/sign-in';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MessageTypeEnum } from '../../store/reducers/enums/message_type.enum';
import { messageSlice } from '../../store/reducers/message_slice';
import { NavigationEnum } from '../../router/navigation.enum';
import { useState } from 'react';
import { CircularProgress } from '@mui/material';

export default function SignIn() {
  //* ---------------------------------------------- Constants/States ----------------------------------------------
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  //* ---------------------------------------------- Functions ----------------------------------------------
  const formSubmitHandler = async (data: any) => {
    try {
      setLoading(true);
      const res = await signIn(data.email, data.password);
      const token = res?.token;
      if (token) {
        localStorage.setItem('token', token);
        navigate(NavigationEnum.HOME);
      }
      dispatch(
        messageSlice.actions.setMessage({
          type: MessageTypeEnum.SUCCESS,
          text: 'Successfully Signed In'
        })
      );
    } catch (error: any) {
      if (error?.message === 'Network Error') {
        dispatch(
          messageSlice.actions.setMessage({
            type: MessageTypeEnum.ERROR,
            text: 'Network Error'
          })
        );
        return;
      }
      dispatch(
        messageSlice.actions.setMessage({
          type: MessageTypeEnum.ERROR,
          text: error?.response?.data?.message[0] || 'Something went wrong'
        })
      );
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };

  //* ---------------------------------------------- JSX ----------------------------------------------
  return (
    <Grid container component="main" sx={{ height: '100vh', backgroundColor: '#111111' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Book Recommendation System
          </Typography>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {/* 
         //$ ---------------------------------------------- FORM ---------------------------------------------- 
         */}
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={handleSubmit((data: any) => formSubmitHandler(data))}>
            {/* 
         //$ ---------------------------------------------- Email ---------------------------------------------- 
         */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              error={!!errors?.email}
              {...register('email', {
                required: true,
                pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
              })}
            />
            {errors?.email ? (
              <Typography variant="caption" display="block" color={'red'} gutterBottom>
                Opps!! Not a Valid Email
              </Typography>
            ) : (
              <></>
            )}
            {/* 
         //$ ---------------------------------------------- Password ---------------------------------------------- 
         */}
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!errors?.password}
              {...register('password', { required: true, minLength: 6 })}
            />
            {errors?.password?.type === 'minLength' ? (
              <Typography variant="caption" display="block" color={'red'} gutterBottom>
                Your password must be at least <b>6 characters long</b>.
              </Typography>
            ) : (
              <></>
            )}
            {/* 
         //$ ---------------------------------------------- Submit ---------------------------------------------- 
         */}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              {loading ? <CircularProgress size={26} /> : <>Sign In</>}
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  variant="body2"
                  onClick={() => {
                    navigate(NavigationEnum.SIGN_UP);
                  }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
