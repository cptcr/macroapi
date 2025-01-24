## MacroAPI

This repository contains a Node.js (using ts-node) Express server that provides endpoints for fetching TikTok information and more.

**Important Note:** This code retrieves data from external sources and does not directly interact with TikTok's official API. Always refer to TikTok's terms of service and respect user privacy when working with their data.

**Getting Started**

1. **Clone the repository:**

   ```bash
   git clone https://github.com/cptcr/macroapi.git
   ```

2. **Install dependencies:**

   ```bash
   cd repo-name
   npm install
   ```

3. **Configuration:**

   - Edit a file named `src/app/config.ts` in the project root directory 

4. **Run the server:**

   ```bash
   npm start
   ```

**API Endpoints**

* **`/` (GET):** Returns a simple welcome message.
* **`/tiktok` (GET):** Fetches information about a TikTok user.
    - Requires a valid JWT token in the Authorization header (implementation not provided in this example).
    - Query parameter: `user` (username of the TikTok user).
    - Response: JSON object containing the retrieved information (structure depends on the `getTikTokAll` function implementation).
* **`/hentai` (GET):** Returns Hentai content (for educational purposes only).
    - Requires a valid JWT token in the Authorization header (implementation not provided in this example).
    - Query parameter: `type` (type of Hentai content).
    - Response: JSON object containing the retrieved Hentai content (structure depends on the `returnHentai` function implementation).

**Notes:**

* This is a basic example and may require further customization depending on your specific needs.
* Error handling and logging are included for demonstration purposes. You might want to improve them for a production environment.
* The code for fetching TikTok information (`getTikTokAll`) and returning Hentai content (`returnHentai`) is not provided. You'll need to implement these functions based on your requirements and chosen data sources.
* Remember to replace `YOUR_PORT_NUMBER` and `YOUR_JWT_SECRET` with your desired values in the `src/app/config.ts` file.
* Securely store your JWT secret and avoid exposing it in public repositories.