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
	const upcomingStreams = await fetch('https://someantics.dev/api/upcomingStreams.json').then(res => res.json());
	const [nextStream] = upcomingStreams.events;

	// const nextStream = {
	// 	title: `JavaScript Problems: CSS Solutions, with Amit Sheen`,
	// 	date: '2022-03-15T14:00:00.000',
	// 	hosts: [{name: 'Amit Sheen', twitter: 'amit_sheen'}]
	// }

	// console.log(nextStream)

	return {
		title: 'Build a Minesweeper Game with Vanilla JavaScript, with Chris Ferdinandi' || nextStream.fullTitle || nextStream.title,
		streamTime: nextStream.date,
		guestTwitters: nextStream
			.hosts
			.filter(host => host.twitter && host.name !== 'Ben Myers')
			.map(host => host.twitter)
	}
}