const url = 'https://shesharpnl.github.io/hackathon-2023.sourcestack-data/assets/junior-nl.json';

fetch(url)
    .then(response => response.json())
    .then(data => {
        const randomJob = data.data[Math.floor(Math.random() * data.data.length)];
        console.log({randomJob});
        const webhookUrl = process.env.SLACK_WEBHOOK_URL;
        if (webhookUrl) {
            const payload = {
                "attachments": [
                    {
                        "color": "#00b29a",
                        "blocks": [
                            {
                                "type": "section",
                                "text": {
                                    "type": "mrkdwn",
                                    "text": `:star: *New Job Posting: ${randomJob.job_name}* :star:`
                                }
                            },
                            {
                                "type": "divider"
                            },
                            {
                                "type": "section",
                                "text": {
                                    "type": "mrkdwn",
                                    "text": `*View job posting*: ${randomJob.post_url}\n*Seniority*: ${randomJob.seniority}\n*Location*: ${randomJob.job_location}\n*Company*: ${randomJob.company_name}\n*Hours*: ${randomJob.hours}\n*Tags Matched*: ${randomJob.tags_matched}\n*Tag Categories*: ${randomJob.tag_categories}`
                                }
                            }
                        ]
                    }
                ]
            };
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
    })
    .catch(error => console.error(error));
