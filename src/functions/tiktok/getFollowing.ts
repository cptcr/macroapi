import puppeteer from "puppeteer";

/**
 * Get the following count of a TikTok User
 * @param username - The username of the TikTok account
 * @returns {number | null} - The following count of the user (or null if it couldn't be fetched)
 */
export default async function getTikTokFollowing(username: string): Promise<number | null> {
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
    // Open the URL
    await page.goto(`https://www.tiktok.com/${user()}`);
    // Wait for the element that contains the following count to be loaded
    await page.waitForSelector('div[data-e2e="following-count"]');

    // Extract the following count
    const followingCount = await page.evaluate(() => {
        const followingElement = document.querySelector('div[data-e2e="following-count"] strong');
        
        // If element exists, parse the following count as an integer
        return followingElement ? parseInt((followingElement as HTMLElement).innerText.replace(/\D/g, ''), 10) : null;
    });

    // Close the browser
    await browser.close();

    // Return the following count
    return followingCount;
}