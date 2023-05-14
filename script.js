// Returns a random job from an array of jobs
const getRandomJob = (jobs) => {
    return jobs[Math.floor(Math.random() * jobs.length)];
}

// Generates a Slack payload based on a job object
const generateSlackPayload = (job) => {
    return {
        "attachments": [
            {
                "color": "#00b29a",
                "blocks": [
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": `:star: *New Job Posting: ${job.job_name}* :star:`
                        }
                    }
                ]
            }
        ]
    }
}

// Posts a Slack payload to a webhook URL
const postJobToSlack = (webhookUrl, payload) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(payload)
    };
    fetch(webhookUrl, options)
        .then(response => console.log(`Slack response: ${response.status} ${response.statusText}`))
        .catch(error => console.error(error));
}

// The URL of the JSON file containing job data
const url = 'https://shesharpnl.github.io/hackathon-2023.sourcestack-data/assets/junior-nl.json';

// Fetches job data from the URL and posts a random job to Slack
fetch(url)
    .then(response => response.json())
    .then(data => {
        // Get a random job from the data
        const randomJob = getRandomJob(data.data);
        console.log({randomJob});

        // Get the webhook URL from the environment variables
        const webhookUrl = process.env.SLACK_WEBHOOK_URL;

        // If a webhook URL is set, generate a Slack payload and post it to Slack
        if (webhookUrl) {
            const payload = generateSlackPayload(randomJob);
            postJobToSlack(webhookUrl, payload);
        } else {
            console.log('The environment variable SLACK_WEBHOOK_URL is missing');
        }

    })
    .catch(error => console.error(error));