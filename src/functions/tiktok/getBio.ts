import puppeteer from 'puppeteer';

/**
 * Get the TikTok profile bio of a user
 * @param username - The username of the TikTok account
 * @returns {string | null} - The profile bio (or null if it couldn't be fetched)
 */
export default async function getTikTokProfileBio(username: string): Promise<string | null> {
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

    // Wait for the element containing the profile bio to be loaded
    await page.waitForSelector('h2[data-e2e="user-bio"]');

    // Extract the profile bio
    const profileBio = await page.evaluate(() => {
        const bioElement = document.querySelector('h2[data-e2e="user-bio"]');
        // Type assertion to HTMLElement to access innerText
        return bioElement ? (bioElement as HTMLElement).innerText : null;
    });

    await browser.close();

    return profileBio;
}
