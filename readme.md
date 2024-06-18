# Book Recommendation System

## Table Of content
- [Book Recommendation System](#book-recommendation-system)
  - [Table Of content](#table-of-content)
  - [Project Setup](#project-setup)
    - [Docker](#docker)
  - [Frontend](#frontend)
    - [Technologies Used](#technologies-used)
    - [How to run frontend ?](#how-to-run-frontend-)
  - [Backend](#backend)
    - [Technologies Used](#technologies-used-1)
      - [How to run backend ?](#how-to-run-backend-)

## Project Setup
### Docker
1. Make sure you have ***docker*** and ***docker-compose*** installed in your system.
2. Use `git clone https://github.com/MiteshDarda/book-recommendation-system.git` to clone the project into your system
3. `cd book-recommendation-system` to navigate into your project ![img](/readme-utils/images/clone.png)
   - Use git bash or linux/unix based terminal
4. Open the folder in an editor and change `backend/env-docker` file to `backend/.env`
    - Before :  ![img](/readme-utils/images/before.png)
    - After : ![img](/readme-utils/images/after.png)
5. For `GOOGLE_API_KEY` in the .env [Link](https://support.google.com/googleapi/answer/6158862?hl=en) look at this article by google and add the api key in `GOOGLE_API_KEY` also make sure to give correct google books permission while making API_KEY in your google application 
6. Before next step make sure docker (docker demon) is running in your system
7. `docker-compose build` this command is used to build the project ![img](/readme-utils/images/build.png)
8. `docker-compose up` this will start the container with **backend**, **frontend**, and **persistent postgreSQL** ![img](/readme-utils/images/up.png)
9. Congratulation 🎉🎉🎉 http://localhost:3000/ Your server is running and start by going to to the frontend at port 3000 ![img](/readme-utils/images/frontend.png)


## Frontend

### Technologies Used
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

### How to run frontend ?

- Go to the frontend directory
- Rename a file `env` to `.env`
- Run `npm run dev`
- This command alone will start the server and start TailwindCss
- URL will be provided in the terminal itself

## Backend

### Technologies Used
- NestJs
- Typeorm
- bcrypt
- class-transformer, class-validator
- JWT token
- PostgreSql for Database

#### How to run backend ?

- Go to the backend directory
- Rename a file `local-env` to `.env`
- Setup Postgres database in you system
- Change env values accordingly
- For `GOOGLE_API_KEY` in the .env [Link](https://support.google.com/googleapi/answer/6158862?hl=en) look at this article by google and add the api key in `GOOGLE_API_KEY` also make sure to give correct google books permission while making API_KEY in your google application 
- To Change the port you can change it in the `.env` file