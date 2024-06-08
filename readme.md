# Book Recommendation System

## Project Setup
1. > Open Terminal
2. > Use this command to clone the project `https://github.com/MiteshDarda/book-recommendation-system.git`
3. > Use this to go inside project `cd book-recommendation-system`
4. > Use this to go inside frontend `cd frontend`
5. > Before Next step make sure you have node installed in your system.
6. > Use this to install frontend dependencies `npm i`
7. > Use this to go back to the root folder `cd ..`
8. > Use this to go inside backend `cd backend`
9. > Before Next step make sure you have Nest-cli installed in your system.
10. > Use this to install backend dependencies `npm i`

### Frontend

- ReactJs 
- Redux-toolkit 
  - For state management
- React-router-dom
  - For smooth navigation
- axios
  - To fetch api's
- TailwindCss
  - For CSS
- MaterialUI
  - For pre-made components/icons
- react-hook-form
  - For form submissions

#### To run frontend

- Go to the frontend directory
- Rename a file `env` to `.env`
- Run `npm run dev`
- This command alone will start the server and start TailwindCss
- URL will be provided in the terminal itself

### Backend

- NestJs
- Typeorm
- bcrypt
- class-transformer, class-validator
- JWT token
- PostgreSql for Database

#### To run backend

- Go to the backend directory
- Rename a file `env` to `.env`
- Setup Postgres database in you system
- Change env values accordingly
- For `GOOGLE_API_KEY` int the .env [Link](https://support.google.com/googleapi/answer/6158862?hl=en) look at this article by google and add the api key in `GOOGLE_API_KEY`
- Run `npm run start:dev`
- To Change the port you can change it in the `.env` file