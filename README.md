# Abolfazl Note

Abolfazl Note is a Progressive Web Application (PWA) built with Next.js, TipTap, and SCSS for taking and managing notes. The app features a clean and minimalistic user interface that looks similar to Samsung Note. With Abolfazl Note, you can take notes, update them, and save them to local storage or a MongoDB Atlas database. The app also uses JSON Web Tokens (JWT) for user authentication.

## Getting Started

To get started with Abolfazl Note, follow these steps:

1. Clone the repository: `git clone https://github.com/Abolfazl-ghodrati-k/abolfazl-note.git`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

Once the development server is running, you can access the app by visiting `http://localhost:3000` in your browser.

## Features

Abolfazl Note includes the following features:

- Create, read, update, and delete notes
- Save notes to local storage or a MongoDB Atlas database for offline and cross-device access
- Minimalistic user interface that looks similar to Samsung Note
- Supports TipTap for a rich text editing experience
- Fully responsive design for desktop and mobile devices
- Built-in `useLocalStorage` hook for local storage state management
- Written in TypeScript for type safety
- Uses JSON Web Tokens (JWT) for user authentication

## Technologies Used

Abolfazl Note was built using the following technologies:

- Next.js
- React
- TipTap
- SCSS
- TypeScript
- MongoDB Atlas
- JSON Web Tokens (JWT)

## API Routes

Abolfazl Note includes the following API routes:

| Route                  | Description                                                                                                   |
|------------------------|---------------------------------------------------------------------------------------------------------------|
| `/api/auth`            | Authenticates a user by JWT token and returns their username if the token is valid.                           |
| `/api/auth/authenticate`| Returns a token if the entered username and password are valid and match (simple login).                    |
| `/api/signup`          | Signs up a user based on the entered username and password and returns a token.                               |
| `/api/sync`            | Overwrites notes in the database with the user's saved notes in the app.                                      |
| `/api/notes`           | Returns all of the user's notes, so they can receive synced notes in a new device or after an app crash, etc. |
| `/api/hello`           | Used to push notifications into the PWA app (coming soon).                                                    |

## Contributing

Contributions to Abolfazl Note are welcome! To contribute:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/my-new-feature`
3. Make your changes and commit them: `git commit -m "Add some feature"`
4. Push your changes to the branch: `git push origin feature/my-new-feature`
5. Create a new pull request

## License

Abolfazl Note is licensed under the MIT License. See LICENSE for more information.
