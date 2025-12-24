const axios = require("axios");

async function igdl(query) {
  try {
  const { data } = await axios.get(
      `https://api.ootaizumi.web.id/downloader/instagram?url=${encodeURIComponent(query)}`
    );
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

module.exports = { igdl }
