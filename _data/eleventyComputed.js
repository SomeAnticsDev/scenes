const fetch = require('node-fetch');

module.exports = async () => {
	/**
	 * @type {{
	 * 		events: {
	 * 			title: string,
	 * 			fullTitle: string,
	 * 			hosts: Host[],
	 * 			date: string,
	 * 			slug: string,
	 * 			url: string
	 * 		}[]
	 * 	}}
	 */
	const upcomingStreams = await fetch('https://someantics.dev/api/upcomingStreams.json').then(res => res.json());
	// const [nextStream] = upcomingStreams.events;

	const nextStream = {
		title: `Help me build the Some Antics website!`,
		date: '2022-08-23T14:00:00.000',
		hosts: []
	}

	// console.log(nextStream)

	return {
		title: nextStream.fullTitle || nextStream.title,
		shortTitle: nextStream.title,
		streamTime: nextStream.date,
		// formattedHosts: formatHosts(nextStream.hosts),
		guestTwitters: nextStream
			.hosts
			.filter(host => host.twitter && host.name !== 'Ben Myers')
			.map(host => host.twitter)
	}
}

/**
 * 
 * @param {Host[]} hosts 
 */
function formatHosts(hosts) {
	if (!hosts) return '';

	/** @type {Host[]} */
	let orderedHosts = [...hosts];
	if (orderedHosts[0].name == 'Ben Myers') {
		const [ben, ...guests] = orderedHosts;
		orderedHosts = [...guests, ben];
	}

	switch (orderedHosts.length) {
		case 1:
			return orderedHosts[0].name.bold();
		case 2:
			return `${orderedHosts[0].name.bold()} and ${orderedHosts[1].name.bold()}`;
		default:
			const bolded = orderedHosts.map(host => host.name.bold());
			const lastIndex = bolded.length - 1;
			const lastName = bolded[lastIndex];
			bolded[lastIndex] = 'and ' + lastName;
			return bolded.join(',&nbsp;');
	}
}

/**
 * @typedef {{
 * 		name: string,
 * 		pronouns: string,
 * 		avatar: string,
 * 		instagram?: string,
 * 		twitch?: string,
 * 		twitter?: string,
 * 		website?: string
 * }} Host
 */