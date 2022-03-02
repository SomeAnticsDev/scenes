const fetch = require('node-fetch');

module.exports = async () => {
	/**
	 * @type {{
	 * 		events: {
	 * 			title: string,
	 * 			fullTitle: string,
	 * 			hosts: {
	 * 				name: string,
	 * 				pronouns: string,
	 * 				avatar: string,
	 * 				instagram?: string,
	 * 				twitch?: string,
	 * 				twitter?: string,
	 * 				website?: string
	 * 			}[],
	 * 			date: string,
	 * 			slug: string,
	 * 			url: string
	 * 		}[]
	 * 	}}
	 */
	// const upcomingStreams = await fetch('https://someantics.dev/api/upcomingStreams.json').then(res => res.json());
	// const [nextStream] = upcomingStreams.events;

	const nextStream = {
		title: `Accessibility in Responsive Design with Jim Drury`,
		// date: '2022-02-22T14:00:00.000',
		date: '2022-03-04T14:00:00.000',
		hosts: [{name: 'Jim Drury', twitter: 'jim_drury'}]
	}

	console.log(nextStream)

	return {
		title: nextStream.fullTitle || nextStream.title,
		streamTime: nextStream.date,
		guestTwitters: nextStream
			.hosts
			.filter(host => host.twitter && host.name !== 'Ben Myers')
			.map(host => host.twitter)
	}
}