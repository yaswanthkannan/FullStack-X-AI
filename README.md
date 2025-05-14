# MoneyVerse - Financial Community Platform

MoneyVerse is a comprehensive financial community platform that helps users manage their finances, connect with other investors, and make informed financial decisions.

## Abstract

MoneyVerse is a modern web application designed to bridge the gap between individual investors and financial knowledge. It combines social networking features with financial tools to create an engaging platform where users can learn, share, and grow their financial knowledge. The platform integrates real-time market data, community discussions, and personalized financial tracking to provide a holistic financial management experience.

## Motivation

In today's complex financial landscape, many individuals struggle with:
- Limited access to reliable financial information
- Lack of community support for financial decisions
- Difficulty in tracking and managing personal finances
- Need for real-time market insights
- Desire to learn from experienced investors

MoneyVerse addresses these challenges by:
1. Creating a supportive community of investors and financial enthusiasts
2. Providing easy-to-use tools for financial tracking and analysis
3. Offering real-time market data and insights
4. Facilitating knowledge sharing through discussions and forums
5. Implementing secure and user-friendly authentication systems

Our goal is to democratize financial knowledge and create a space where both beginners and experienced investors can learn, share, and grow together.

## Features

- User Authentication (Sign Up, Login, Password Reset)
- Community Discussions
- Financial Dashboard
- Real-time Notifications
- Profile Management
- Search Functionality
- Responsive Design

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: EJS, TailwindCSS
- **Database**: MySQL
- **Authentication**: Express Session, bcrypt
- **Real-time Features**: Socket.io
- **Email Service**: Nodemailer
- **File Upload**: Multer
- **Charts**: Chart.js

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/moneyverse.git
cd moneyverse
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=moneyverse
SESSION_SECRET=your_session_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

4. Initialize the database:
```bash
npm run db:init
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
moneyverse/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── middleware/     # Custom middleware
├── models/         # Database models
├── public/         # Static files
│   ├── css/       # Stylesheets
│   ├── js/        # Client-side JavaScript
│   └── images/    # Image assets
├── routes/         # Route definitions
├── views/          # EJS templates
├── app.js         # Application entry point
└── package.json   # Project dependencies
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Your Name - your.email@example.com
Project Link: [https://github.com/yourusername/moneyverse](https://github.com/yourusername/moneyverse) 