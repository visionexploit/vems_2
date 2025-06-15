# Vision Exploit Management System (VEMS)

A comprehensive platform for managing student applications and university partnerships.

## Features

- Student Management
- University Partnerships
- Application Processing
- Payment Tracking
- Report Generation
- User Authentication
- Role-based Access Control

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- React Router v6
- Axios
- MySQL
- Node.js/Express (Backend)

## Prerequisites

- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/vems.git
   cd vems
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
vems/
├── public/             # Static files
├── src/               # Source files
│   ├── components/    # React components
│   ├── hooks/         # Custom hooks
│   ├── context/       # React context
│   ├── services/      # API services
│   ├── utils/         # Utility functions
│   └── styles/        # Global styles
├── database/          # Database files
└── docs/             # Documentation
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@visionexploit.com or join our Slack channel.
