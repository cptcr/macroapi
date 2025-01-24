import puppeteer from 'puppeteer';

/**
 * Get the TikTok likes count of a user
 * @param username - The username of the TikTok account
 * @returns {number | null} - The likes count (or null if it couldn't be fetched)
 */
export default async function getTikTokLikesCount(username: string): Promise<number | null> {
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

    // Wait for the element containing the likes count to be loaded
    await page.waitForSelector('strong[data-e2e="likes-count"]');

    // Extract the likes count
    const likesCount = await page.evaluate(() => {
        const likesElement = document.querySelector('strong[data-e2e="likes-count"]');
        // Type assertion to HTMLElement to access innerText
        return likesElement ? parseInt((likesElement as HTMLElement).innerText.replace(/\D/g, ''), 10) : null;
    });

    await browser.close();

    return likesCount;
}
