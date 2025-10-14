# 📰 NewsHub - Modern News Application

A beautiful, modern news application built with React, featuring real-time news from around the world with category filtering, search functionality, and country-specific news.

## ✨ Features

- 🌍 **Multi-Country Support** - Get news from US, India, Canada, UK, Australia, and Germany
- 📑 **Category Filtering** - Browse news by Business, Entertainment, Health, Science, Sports, and Technology
- 🔍 **Smart Search** - Search for specific news articles with real-time results
- 📱 **Fully Responsive** - Beautiful UI that works on all devices
- ⚡ **Fast Loading** - Optimized performance with loading states
- 🎨 **Modern Design** - Clean, professional interface with smooth animations
- ♿ **Accessible** - Built with accessibility best practices

## 🚀 Tech Stack

- **React** - Frontend library
- **React Router** - Client-side routing
- **Bootstrap 5** - UI framework
- **Axios** - HTTP client
- **NewsData.io API** - News data source
- **Vite** - Build tool

## 📦 Installation

1. Clone the repository:
\`\`\`bash
git clone <your-repo-url>
cd news-app
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create a \`.env\` file in the root directory:
\`\`\`
VITE_API_KEY=your_newsdata_api_key_here
\`\`\`

Get your free API key from [NewsData.io](https://newsdata.io/)

4. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🏗️ Build for Production

\`\`\`bash
npm run build
\`\`\`

The build will be created in the \`dist\` directory.

## 📤 Deployment

### Deploy to Netlify

1. Install Netlify CLI:
\`\`\`bash
npm install -g netlify-cli
\`\`\`

2. Build and deploy:
\`\`\`bash
npm run build
netlify deploy --prod
\`\`\`

### Deploy to Vercel

1. Install Vercel CLI:
\`\`\`bash
npm install -g vercel
\`\`\`

2. Deploy:
\`\`\`bash
vercel
\`\`\`

### Environment Variables for Deployment

Make sure to add your \`VITE_API_KEY\` in your hosting platform's environment variables settings.

## 🎯 Project Structure

\`\`\`
news-app/
├── src/
│   ├── components/         # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── NewsCard.jsx
│   │   ├── Loader.jsx
│   │   └── CountryProvider.jsx
│   ├── contexts/          # React contexts
│   │   └── CountryContext.js
│   ├── pages/             # Page components
│   │   ├── Home.jsx
│   │   ├── Category.jsx
│   │   └── Search.jsx
│   ├── utils/             # Utility functions
│   │   └── api.js
│   ├── App.jsx
│   └── main.jsx
├── public/                # Static assets
└── index.html
\`\`\`

## 🌟 Features in Detail

### Home Page
- Latest top headlines from selected country
- Beautiful card layout with images
- Source attribution and publish dates
- Loading states and error handling

### Category Pages
- Browse news by specific categories
- Dynamic category icons
- Category-specific filtering

### Search Functionality
- Real-time search results
- Search result count
- Empty state handling

### Country Selector
- Switch between multiple countries
- Persistent country selection
- Instant content updates

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- News data provided by [NewsData.io](https://newsdata.io/)
- Icons and emojis for enhanced UI
- Bootstrap for responsive design
- React community for amazing tools

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

Made with ❤️ using React
