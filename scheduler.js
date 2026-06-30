const cron = require("node-cron");
const { exec } = require("child_process");

console.log("======================================");
console.log(" Way2News Scheduler Started");
console.log(" Scraper will run every 15 minutes.");
console.log("======================================");

// Run immediately when the scheduler starts
runScraper();

// Run every 15 minutes
cron.schedule("*/15 * * * *", () => {
    runScraper();
});

function runScraper() {
    console.log("\n--------------------------------");
    console.log("Running scraper:", new Date().toLocaleString());
    console.log("--------------------------------");

    exec("node scraper.js", (error, stdout, stderr) => {
        if (error) {
            console.error("Error:", error.message);
            return;
        }

        if (stderr) {
            console.error(stderr);
        }

        console.log(stdout);
    });
}