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

export default function SignIn() {
  //* ---------------------------------------------- Constants/States ----------------------------------------------
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  //* ---------------------------------------------- Functions ----------------------------------------------
  const formSubmitHandler = (data: any) => {
    console.log('in', data);
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
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers=&query=books)',
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
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2">
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
