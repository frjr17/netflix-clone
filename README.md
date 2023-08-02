# Netflix Clone

A Netflix clone project built with [React](https://reactjs.org/) and [Firebase](https://firebase.google.com/). This project aims to replicate the look and feel of the Netflix website and provides similar functionalities.

## Demo

Check out the live demo [here]([link_to_live_demo](https://vercel.com/frjr17/netflix-clone)).

## Features

- Browse popular movies and TV shows
- View movie/TV show details with descriptions and ratings
- Search for specific movies/TV shows
- Authentication and user accounts
- Responsive design for all devices

## Technologies Used

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [Firebase](https://firebase.google.com/)
- [Axios](https://github.com/axios/axios)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/netflixClone.git
cd netflixClone
```

2. Install the dependencies:

npm install

3. Set up Firebase:

- Create a new Firebase project at https://console.firebase.google.com/.
- Enable Firebase Authentication and Firestore database.
- Obtain the Firebase config object and replace it in src/firebase.js:

      const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID",
      };

4. Run the App

       npm start


Enjoy your NetflixClone experience! If you have any questions or feedback, feel free to contact me.
