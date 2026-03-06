# Canvas Couture 🎨✨

Welcome to **Canvas Couture**! This repository houses a full-stack web application built with a robust Model-View-Controller (MVC) architecture. 

## 🚀 Tech Stack

* **Backend Engine:** [Node.js](https://nodejs.org/)
* **Web Framework:** [Express.js](https://expressjs.com/)
* **Database:** MongoDB
* **Templating Engine:** [EJS](https://ejs.co/) (Embedded JavaScript)
* **Styling:** CSS3
* **Architecture:** MVC (Model-View-Controller)

## 📁 Project Structure

The project is thoughtfully organized to ensure scalability and separation of concerns:

```text
Canvas-Couture/
├── controllers/    # Contains the core business logic and request handling
├── middleware/     # Custom middle functions (e.g., authentication, error handling)
├── models/         # Database schemas and data access logic
├── public/         # Static assets (CSS, client-side JavaScript, images)
├── routes/         # Express route definitions, mapping URLs to controllers
├── services/       # Reusable business logic and external API integrations
├── views/          # EJS templates for rendering the user interface
├── app.js          # The main entry point and Express application setup
├── package.json    # Project metadata and dependencies
└── .gitignore      # Specifies intentionally untracked files to ignore
```

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed on your local machine:
* [Node.js](https://nodejs.org/en/download/)
* [npm](https://www.npmjs.com/) 

## 📦 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/AmitAzoulay/Canvas-Couture.git](https://github.com/AmitAzoulay/Canvas-Couture.git)
    cd Canvas-Couture
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root directory. **Do not commit this file to GitHub.** Copy the template below and replace the placeholders with your actual keys and credentials:
    
    ```env
    PORT=3000
    DB_URI=mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER>.mongodb.net/<DB_NAME>
    SESSION_SECRET=<YOUR_SESSION_SECRET>
    API_KEY=<YOUR_GENERAL_API_KEY>
    TWITTER_API_KEY=<YOUR_TWITTER_API_KEY>
    TWITTER_API_SECRET_KEY=<YOUR_TWITTER_API_SECRET_KEY>
    TWITTER_ACCESS_TOKEN=<YOUR_TWITTER_ACCESS_TOKEN>
    TWITTER_ACCESS_TOKEN_SECRET=<YOUR_TWITTER_ACCESS_TOKEN_SECRET>
    MAP_API=<YOUR_MAP_API_KEY>
    ANTHROPIC_API_KEY=<YOUR_ANTHROPIC_API_KEY>
    ```

4.  **Start the development server:**
    ```bash
    npm run dev
    ```

5.  **View the application:**
    Open your browser and navigate to `http://localhost:3000`.

## 🤝 Contributing

Contributions are always welcome! 
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.