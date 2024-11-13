# ImageGram Frontend

This is the frontend for the **ImageGram** project, a social media platform that allows users to upload images, comment on posts, and interact with other users. The frontend is built with **React**, **Tailwind CSS**, and **Next.js** to provide a responsive and user-friendly interface.

## Features
- **User Authentication**: Sign up and sign-in functionality.
- **Post Feed**: View posts with images and comments.
- **Comment System**: Add comments to posts, reply to existing comments.
- **Responsive Design**: Fully responsive UI built with Tailwind CSS.
- **Image Upload**: Allows users to upload images and create posts.

## Setup

### Prerequisites
- Node.js (v16 or higher)
- A backend server running the ImageGram API (Make sure the backend is set up and running).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AdityaBhojane/ImageGram-Frontend.git
   cd ImageGram-Frontend
   npm install
   npm run dev #(run command)
   ```
2. Configure the backend API URL in the .env.example

### file structure

```
├── components/        # Reusable components (Header, PostCard, etc.)
├── pages/             # Next.js pages (Home, Sign In, Sign Up, etc.)
├── public/            # Static assets (images, fonts, etc.)
├── styles/            # Tailwind CSS custom styles
├── .env.local         # Environment variables (API URL, etc.)
├── package.json       # Project metadata and dependencies
├── tailwind.config.js # Tailwind CSS configuration
├── next.config.js     # Next.js configuration

```

### Technologies Used
- React: JavaScript library for building user interfaces.
- Tailwind CSS: Utility-first CSS framework for building custom designs quickly.
- Axios: Promise-based HTTP client for making API requests.
- JWT (JSON Web Tokens): For handling user authentication.

- Next UI for micro animations
### Contributing
Fork the repository.
Create a new branch (git checkout -b feature-branch).
Commit your changes (git commit -m 'Add new feature').
Push to the branch (git push origin feature-branch).
Create a new Pull Request.