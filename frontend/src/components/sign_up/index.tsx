import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm } from 'react-hook-form';

export default function SignUp() {
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {/* 
         //$ ---------------------------------------------- FORM ---------------------------------------------- 
         */}
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit((data: any) => formSubmitHandler(data))}
          sx={{ mt: 3 }}>
          {/* 
         //$ ---------------------------------------------- First name ---------------------------------------------- 
         */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                error={!!errors?.firstName}
                {...register('firstName', { required: true })}
              />
            </Grid>
            {/* 
         //$ ---------------------------------------------- Last Name ---------------------------------------------- 
         */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                autoComplete="family-name"
                error={!!errors?.lastName}
                {...register('lastName', { required: true })}
              />
            </Grid>
            {/* 
         //$ ---------------------------------------------- Email ---------------------------------------------- 
         */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                error={!!errors?.email}
                label="Email Address"
                autoComplete="email"
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
            </Grid>
            {/* 
         //$ ---------------------------------------------- Password ---------------------------------------------- 
         */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
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
            </Grid>
          </Grid>
          {/* 
         //$ ---------------------------------------------- Submit ---------------------------------------------- 
         */}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
