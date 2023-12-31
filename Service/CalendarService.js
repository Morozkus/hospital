import fs from 'fs/promises'
import path from 'path'
import process from 'process';
import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';

async function ping() {
    const daysList = []

    // If modifying these scopes, delete token.json.
    const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
    // The file token.json stores the user's access and refresh tokens, and is
    // created automatically when the authorization flow completes for the first
    // time.
    const TOKEN_PATH = path.join(process.cwd(), 'token.json');
    const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

    /**
     * Reads previously authorized credentials from the save file.
     *
     * @return {Promise<OAuth2Client|null>}
     */
    async function loadSavedCredentialsIfExist() {
        try {
            const content = await fs.readFile(TOKEN_PATH);
            const credentials = JSON.parse(content);
            return google.auth.fromJSON(credentials);
        } catch (err) {
            return null;
        }
    }

    /**
     * Serializes credentials to a file compatible with GoogleAUth.fromJSON.
     *
     * @param {OAuth2Client} client
     * @return {Promise<void>}
     */
    async function saveCredentials(client) {
        const content = await fs.readFile(CREDENTIALS_PATH);
        const keys = JSON.parse(content);
        const key = keys.installed || keys.web;
        const payload = JSON.stringify({
            type: 'authorized_user',
            client_id: key.client_id,
            client_secret: key.client_secret,
            refresh_token: client.credentials.refresh_token,
        });
        await fs.writeFile(TOKEN_PATH, payload);
    }

    /**
     * Load or request or authorization to call APIs.
     *
     */
    async function authorize() {
        let client = await loadSavedCredentialsIfExist();
        if (client) {
            return client;
        }
        client = await authenticate({
            scopes: SCOPES,
            keyfilePath: CREDENTIALS_PATH,
        });
        if (client.credentials) {
            await saveCredentials(client);
        }
        return client;
    }

    /**
     * Lists the next 10 events on the user's primary calendar.
     * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
     */
    async function listEvents(auth) {
        const curr = new Date;
        const calendar = google.calendar({ version: 'v3', auth });
        const res = await calendar.events.list({
            calendarId: 'primary',
            timeMin: new Date(curr.setDate(curr.getDate() - curr.getDay())).toISOString(),
            maxResults: 30,
            singleEvents: true,
            orderBy: 'startTime',
        });
        const events = res.data.items;
        if (!events || events.length === 0) {
            console.log('No upcoming events found.');
            return;
        }
        events.map((event, i) => {
            const start = event.start.dateTime || event.start.date;
            const list = { start, color: event.colorId, msg: event.summary }

            daysList.push(list)

        });
    }
    await authorize().then(listEvents).catch(console.error)


    return daysList
}


function parse(dayList) {
    const parseArr = dayList.map(el => {
        const time = el.start.match(/\d\d:\d\d:\d\d/gmi)

        el.start = time[0]
        el.color == 10 ? el.color = true : el.color = false
        return el

    })
    const SIZE = 6
    const result = parseArr.reduce((p, c) => {

        if (p[p.length - 1].length == SIZE) {
            p.push([]);
        }

        p[p.length - 1].push(c);

        return p;
    }, [[]]);



    return result
}

export default parse(await ping())