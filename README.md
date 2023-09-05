## Fullstack Social Media App

A social media application built with React and Node.js, featuring JWT authentication, post sharing, following system, customizable user profiles, and more.

## Technologies used

- Backend: Node.js, Express, MySQL, JWT for authentication, cookies for session management
- Frontend: React, React Query, Context API, Material-UI, Tailwind

## Installation

After cloning the repository, install the application by typing the following in your terminal:

- npm install
- npm start

Open http://localhost:3000 to view it in your browser.

Note: Make sure to set up your environment variables in api/.env for the backend to work correctly. Check the Environment Variables section below for more details.

## Environment Variables

In order for the app to function correctly, the user must set up their own environment variables. There should be a .env file containing the following:

- SECRET_KEY=your_secret_key_here
- DB_HOST=your_database_host_here
- DB_USER=your_database_user_here
- DB_PASSWORD=your_database_password_here
- DB_DATABASE=your_database_name_here

## Quick Overview

![Demo](./client/public/demo.gif)
