const directoryOutputPlugin = require("@11ty/eleventy-plugin-directory-output");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const faviconPlugin = require("eleventy-favicon");
const metagen = require('eleventy-plugin-metagen');
const PostCSSPlugin = require("eleventy-plugin-postcss");
const htmlmin = require("html-minifier");
const CleanCSS = require("clean-css");
const markdownIt = require("markdown-it");

module.exports = function(eleventyConfig) {

    // Plugins
    eleventyConfig.addPlugin(PostCSSPlugin);
    eleventyConfig.addPlugin(directoryOutputPlugin);
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addPlugin(metagen);

    eleventyConfig.addPlugin(faviconPlugin, {
      destination: './public'
    });

    // Filters
  const md = new markdownIt({
    html: true,
  });

  eleventyConfig.addFilter("markdown", (content) => {
    return md.render(content);
  });

  // Transforms
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if( outputPath && outputPath.endsWith(".html") ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }

    return content;
  });

   // Passthrough
  eleventyConfig.setServerPassthroughCopyBehavior("copy");
  eleventyConfig.addPassthroughCopy('src/images');

  // Layouts
  eleventyConfig.addLayoutAlias('base', 'base.njk');
  eleventyConfig.addLayoutAlias('home', 'home.njk');
  eleventyConfig.addLayoutAlias('page', 'page.njk');

  return {
    markdownTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "public",
      layouts: "_layouts"
    },
    templateFormats: ['njk', 'md'],
  };
}
