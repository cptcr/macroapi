import puppeteer from 'puppeteer';

/**
 * Get the TikTok profile URL of a user
 * @param username - The username of the TikTok account
 * @returns {string | null} - The profile URL (or null if it couldn't be fetched)
 */
export default async function getTikTokProfileLinkedURL(username: string): Promise<string | null> {
    // Function to check if username starts with an @
    function user() {
        if (!username.startsWith("@")) {
            return `@${username}`;
        } else {
            return username;
        }
    }

    // Launch browser
    const browser = await puppeteer.launch({ headless: true });
    // Open a new blank page
    const page = await browser.newPage();
    // Open the TikTok profile URL
    await page.goto(`https://www.tiktok.com/${user()}`);

    // Wait for the element containing the profile URL to be loaded
    await page.waitForSelector('span.css-847r2g-SpanLink.eht0fek2');

    // Extract the profile URL
    const profileURL = await page.evaluate(() => {
        const profileElement = document.querySelector('span.css-847r2g-SpanLink.eht0fek2');
        // Type assertion to HTMLElement to access innerText
        return profileElement ? (profileElement as HTMLElement).innerText : null;
    });

    await browser.close();

    return profileURL;
}