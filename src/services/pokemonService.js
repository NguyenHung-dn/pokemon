import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
const LIMIT = 151; // Số lượng Pokémon muốn lấy

// Lấy danh sách Pokémon và chi tiết của tất cả Pokémon
export const getAllPokemonDetails = async () => {
  try {
    // Lấy danh sách Pokémon
    const listResponse = await axios.get(`${BASE_URL}?limit=${LIMIT}`);
    const pokemonList = listResponse.data.results;

    // Tạo danh sách các URL chi tiết của Pokémon
    const pokemonDetailsUrls = pokemonList.map((pokemon) => pokemon.url);

    // Lấy thông tin chi tiết của tất cả Pokémon
    const detailsPromises = pokemonDetailsUrls.map((url) => axios.get(url));
    const detailsResponses = await Promise.all(detailsPromises);

    // Trả về danh sách chi tiết Pokémon
    return detailsResponses.map((response) => response.data);
  } catch (error) {
    console.error("Failed to fetch all Pokémon details:", error);
    throw error;
  }
};
