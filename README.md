Article Management API

This is a simple Express.js API for managing articles. The API allows you to create articles, search for articles based on keywords, and retrieve individual articles. It also supports bulk article creation and indexing for fast keyword-based search functionality.

 Features:
- Create Article: Add a single article with a title, content, and tags.
- Bulk Article Creation: Add multiple articles in a single request.
- Search Articles: Search for articles by keyword and sort results by relevance or date.
- Retrieve Article: Get details of an individual article by its ID.
- Keyword Indexing: Index articles by words in their title, content, and tags to support fast search.

 Endpoints:
- `POST /articles`: Adds a new article.
- `POST /articles/bulk`: Adds multiple articles.
- `GET /articles/search`: Searches for articles by a keyword, with sorting options by relevance or date.
- `GET /articles/:id`: Retrieves an article by its ID.

 Technologies:
- Express.js: Web framework for Node.js.
- Body-Parser: Middleware to handle JSON requests.
- CORS: Middleware for cross-origin requests.

 Getting Started:
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/article-management-api.git
   cd article-management-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. The server will be running at `http://localhost:8500`.
