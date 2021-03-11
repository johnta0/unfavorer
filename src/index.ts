import * as Twitter from 'twitter';

const main = async () => {
    const client = new Twitter({
        consumer_key: process.env.TW_API_KEY!,
        consumer_secret: process.env.TW_API_SECRET!,
        access_token_key: process.env.TW_ACCESS_TOKEN!,
        access_token_secret: process.env.TW_ACCESS_TOKEN_SECRET!,
    });

    const screenName = process.argv[2];
    const params = {
        count: 200,
        screen_name: screenName,
    };
    const likes200 = await client.get('/favorites/list', params);
    const statusIdsStr: string[] = [];
    for (let i = 0; i < likes200.length; i++) {
        statusIdsStr.push(likes200[i]['id_str']);
    }

    // const statusIdBigInt = statusIdsStr.map(x => BigInt(x));
    
    // destroy favorites
    for (let statusId of statusIdsStr) {
        const res = await client.post('/favorites/destroy', { id: statusId });
        console.log('Unfavored:', res['id_str']);
    }
}

main();
