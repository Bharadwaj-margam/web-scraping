const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

(async () => {
    const browser = await chromium.launch({
        headless: false
    });

    const page = await browser.newPage();

    await page.goto("https://telugu.way2news.com/", {
        waitUntil: "networkidle"
    });

    // Wait for the page to load
    await page.waitForTimeout(5000);

    // Get all headlines
    const headlines = await page.$$eval("h1 a", elements =>
        elements.map(e => e.innerText.trim())
    );

    console.log(headlines);

    // Get current date and time
    const now = new Date();

    const day = String(now.getDate()).padStart(2, "0");
    const month = now
        .toLocaleString("en-US", { month: "short" })
        .toLowerCase();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    // Create filename
    const fileName = `way2news_${day}${month}_${hours}-${minutes}.txt`;

    // Output folder path
    const outputFolder = path.join(__dirname, "output");

    // Create output folder if it doesn't exist
    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder);
    }

    // Full file path
    const filePath = path.join(outputFolder, fileName);

    // Save headlines
    fs.writeFileSync(
        filePath,
        headlines.join("\n\n"),
        "utf8"
    );

    console.log(`✅ ${fileName} created successfully.`);

    await browser.close();
})();