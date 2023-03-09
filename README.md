# Abolfaz Note

Abolfaz Note is a note app which help's you in remembering things.

## Installation

Head Over to [`Abolfaz Note`](https://abolfazl-note.vercel.app) to Download the app <br />
( Dont worry its a PWA app not that difficult to install 😁✌️ )

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change. <br/>
Please make sure to update tests as appropriate.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You will face login page when you open [http://localhost:3000](http://localhost:3000) ! dont panic and enter as a guest if you dont want an account.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## api routes

 - '/api/auth' : will authenticate user by [`JWT Token`](https://jwt.io/) and return his/her username if token is valid
 - '/api/auth/authenticate': will return a token if entered username and pass is valid and matches( simple login )
 - '/api/signup' : will sign up based on entered username and password and return a token
 - '/api/sync': will owerrite notes in your database with your saved notes in app
 - '/api/notes' : will return all of your notes so if your in a new device and suddenly something happens (clearing browser storage, app crashes, ...) you can recieve         synced notes
 - '/api/hello' : used to push notification into pwa app ( coming soon )
 
 all returned values are type-guarded so you can easily figure out whats going on...

## Features

V1.1.0

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font. <br />
This project uses [`PWA`](https://web.dev/progressive-web-apps/) to make app installable and available in offline mode. <br />
this project has Guest mode available for those who dont want to have notes on other devices!
this project is using [`JWT`](https://jwt.io/) an authentication service

## License

[MIT](https://choosealicense.com/licenses/mit/)
