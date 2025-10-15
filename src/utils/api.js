import axios from "axios";

const BASE_URL = "https://newsdata.io/api/1/latest?";

let API_KEY;
if (import.meta.env.VITE_API_KEY) {
  console.log("Using API key from .env");
  API_KEY = import.meta.env.VITE_API_KEY;
} else {
  console.log("Using backup API key");
  API_KEY = "pub_e2390ff326904b2293b852fd29aa11d3";
}

const fetchHeadlines = async (countrycode, nextPage = null) => {
  try {
    const params = {
      apiKey: API_KEY,
      country: countrycode,
      size: 9,
      ...(nextPage && { page: nextPage }),
    };

    const { data } = await axios.get(`${BASE_URL}`, {
      params,
    });
    console.log(data);

    return {
      results: data.results,
      nextPage: data.nextPage,
    };
  } catch (error) {
    console.error("Error fetching headlines", error);
    return [];
  }
};

const fetchCategory = async (category) => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        apiKey: API_KEY,
        category: category,
        size: 9,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error("Error fetching category", error);
    return [];
  }
};

const fetchSearch = async (searchQuery) => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        apiKey: API_KEY,
        q: searchQuery,
        size: 9,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error("Error fetching search", error);
    return [];
  }
};

export { fetchHeadlines, fetchCategory, fetchSearch };
