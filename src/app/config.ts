
interface RateLimitConfig {
    time_window: number; 
    max_requests: number; 
    error_message: string;
}

interface Config {
    rate_limit: RateLimitConfig; 
    apiKeys: string[];
    port: number;
}
  
  // Function that returns the configuration object
export default function config(): Config {
    return {
      rate_limit: {
        time_window: 1 * 60 * 1000, // 1 minute window
        max_requests: 5, // Max 5 requests per minute
        error_message: "Too many requests, please try again later." // Error message when exceeding rate limit
      },
      apiKeys: [ // Paste in your API Keys here, you can also build custom functions to store, call and delete API Keys
        "testApiKey"
      ],
      port: 3000
    };
}
  