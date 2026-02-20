module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("static");
  eleventyConfig.addPassthroughCopy("admin");

  eleventyConfig.addCollection("publications", function (collectionApi) {
    return collectionApi.getFilteredByGlob("./src/publications/**/*.{md,njk,html}").sort((a, b) => {
      const yearA = Number(a.data.year) || 0;
      const yearB = Number(b.data.year) || 0;
      return yearB - yearA;
    });
  });

  eleventyConfig.addCollection("updates", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("./src/updates/**/*.{md,njk,html}")
      .filter((item) => !item.inputPath.endsWith("/updates.njk") && !item.inputPath.endsWith("\\updates.njk"))
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
      });
  });

  eleventyConfig.addCollection("research", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("./src/research/**/*.{md,njk,html}")
      .filter((item) => !item.inputPath.endsWith("/research.njk") && !item.inputPath.endsWith("\\research.njk"))
      .sort((a, b) => {
        const orderA = Number(a.data.order);
        const orderB = Number(b.data.order);
        const safeA = Number.isFinite(orderA) ? orderA : Number.MAX_SAFE_INTEGER;
        const safeB = Number.isFinite(orderB) ? orderB : Number.MAX_SAFE_INTEGER;
        return safeA - safeB;
      });
  });

  eleventyConfig.addCollection("team", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("./src/team/**/*.{md,njk,html}")
      .filter((item) => !item.inputPath.endsWith("/team.njk") && !item.inputPath.endsWith("\\team.njk"))
      .sort((a, b) => {
        const orderA = Number(a.data.order);
        const orderB = Number(b.data.order);
        const safeA = Number.isFinite(orderA) ? orderA : Number.MAX_SAFE_INTEGER;
        const safeB = Number.isFinite(orderB) ? orderB : Number.MAX_SAFE_INTEGER;
        return safeA - safeB;
      });
  });

  eleventyConfig.addCollection("teaching", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("./src/teaching/**/*.{md,njk,html}")
      .filter((item) => !item.inputPath.endsWith("/teaching.njk") && !item.inputPath.endsWith("\\teaching.njk"));
  });

  eleventyConfig.addCollection("service", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("./src/service/**/*.{md,njk,html}")
      .filter((item) => !item.inputPath.endsWith("/service.njk") && !item.inputPath.endsWith("\\service.njk"));
  });

  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
};
