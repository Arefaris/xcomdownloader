const getTwitterMedia = require('get-twitter-media');

async function test() {
	try {
		console.log('Fetching Twitter media...');
		const result = await getTwitterMedia("https://twitter.com/CursedVideos/status/1687071264848879616?s=20", {
			buffer: true
		});
		console.log('Success!');
		console.log('Result:', JSON.stringify(result, null, 2));
	} catch (error) {
		console.error('Error:', error.message || error);
	}
}

test();
