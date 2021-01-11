module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy('./assets/');
	eleventyConfig.addPassthroughCopy('./css/');
	eleventyConfig.addWatchTarget('./css/*.css');
}