import puppeteer from 'puppeteer';

/**
 * Get the TikTok followers count of a user
 * @param username - The username of the TikTok account
 * @returns {number | null} - The followers count (or null if it couldn't be fetched)
 */
export default async function getTikTokFollowersCount(username: string): Promise<number | null> {
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

    // Wait for the element containing the followers count to be loaded
    await page.waitForSelector('strong[data-e2e="followers-count"]');

    // Extract the followers count
    const followersCount = await page.evaluate(() => {
        const followersElement = document.querySelector('strong[data-e2e="followers-count"]');
        // Type assertion to HTMLElement to access innerText
        return followersElement ? parseInt((followersElement as HTMLElement).innerText.replace(/\D/g, ''), 10) : null;
    });

    await browser.close();

    return followersCount;
}
