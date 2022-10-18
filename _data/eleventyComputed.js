const fetch = require('node-fetch');

module.exports = async () => {
	/**
	 * @type {{
	 * 		events: {
	 * 			title: string,
	 * 			fullTitle: string,
	 * 			hosts: Host[],
	 * 			guests: Host[],
	 * 			date: string,
	 * 			slug: string,
	 * 			url: string
	 * 		}[]
	 * 	}}
	 */
	const upcomingStreams = await fetch('https://someantics.dev/api/upcomingStreams.json').then(res => res.json());
	// const [nextStream] = upcomingStreams.events;

	const nextStream = {
		title: `Community Building and Mentorship with Nerando Johnson`,
		date: '2022-10-18T14:00:00.000',
		hosts: []
	}

	console.log(nextStream)

	const {hosts = [], guests = []} = nextStream;
	const people = [...hosts, ...guests];
	const guestTwitters = people
		.filter(person => person.twitter && (person.name !== 'Ben Myers'))
		.map(person => person.twitter);

	return {
		title: nextStream.fullTitle || nextStream.title,
		shortTitle: nextStream.title,
		streamTime: nextStream.date,
		guestTwitters
		// formattedHosts: formatHosts(nextStream.hosts),
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