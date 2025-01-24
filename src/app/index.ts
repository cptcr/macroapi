import express, { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import { authenticateToken } from './middlewares/authenticateToken';
import c from './config';
import { ok, startup, failedRequest, request } from './tools/logs';
import getTikTokAll from '../functions/tiktok/getAll';
import { createServer, Server } from 'http';
import returnHentai from '../functions/hentai/hentai';

startup("starting", "Express server initiated....");

interface Config {
  port: number;
  rate_limit: {
    time_window: number;
    max_requests: number;
    error_message: string;
  };
}

const config: Config = c();
const app = express();
const port = config.port;

// Create HTTP server for app
const server: Server = createServer(app);

// Rate limiter middleware
const limiter = rateLimit({
  windowMs: config.rate_limit.time_window,
  max: config.rate_limit.max_requests,
  message: config.rate_limit.error_message,
});

// Apply middlewares
app.use(cors());
app.use(limiter);
app.use(express.json());
app.use(authenticateToken);

// Define the /tiktok endpoint
app.get('/tiktok', async (req: Request, res: Response): Promise<void> => {
  const authorizationHeader = req.header('Authorization') || 'No Authorization header';
  try {

    // Log the request details
    request(`/tiktok`, `{${req.ip}`, authorizationHeader);

    // Validate user input
    const username = req.query.user?.toString() || ''; // Ensure username is always a string
    if (!username.trim()) {
      failedRequest('/tiktok', `${req.ip}`, authorizationHeader, {
        ratelimit: false,
        error: 'Invalid or missing username',
      });
      res.status(400).json({ error: 'Invalid or missing username in query parameters.' });
      return;
    }

    // Call the getTikTokAll function
    const resp = await getTikTokAll(username);

    // Respond with the data
    res.status(200).json(resp);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error in /tiktok endpoint:', errorMessage);

    failedRequest('/tiktok', `${req.ip}`, authorizationHeader, {
      ratelimit: false,
      error: errorMessage,
    });

    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Define the /hentai endpoint
app.get("/hentai", async (req: Request, res: Response): Promise<void> => {
  const authorizationHeader = req.header("Authorization") || "No authorization header";
  try {
    request("/hentai", `${req.ip}`, authorizationHeader);

    const type = req.query.type?.toString() || "";
    if (!type.trim()) {
      failedRequest("/hentai", `${req.ip}`, authorizationHeader, {
        ratelimit: false,
        error: "Invalid type or missing type"
      });

      res.status(400).json({error: 'Invalid or missing type in query parameters.'})
    }

    const resp = await returnHentai(type);
    const body = JSON.stringify({
      "data": resp
    })
    res.status(200).json(body);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error in /hentai endpoint:', errorMessage);

    failedRequest('/hentai', `${req.ip}`, authorizationHeader, {
      ratelimit: false,
      error: errorMessage,
    });

    res.status(500).json({ error: 'Internal server error.' });
  }
})


// Handle the root route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, welcome to the API!');
});

// Start the server
server.listen(port, () => {
  startup("ready", `Server is running on port ${port}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
