import {API_URL} from "../utils/constants";
import {validatePaginatedQuery} from "../utils/validate-paginated-query";


export const fetchPaginatedHeroes = async (from, to) => {
  validatePaginatedQuery(from, to);

  const limit = to - from;
  const heroIds = Array.from(new Array(limit), (_, index) => from + index);
  try {
    return {
      success: true,
      data: await Promise.all(heroIds.map(heroId => {
        return fetch(`${API_URL}/${heroId}`)
          .then(res => res.json())
      })),
      from,
      to
    }
  } catch (err) {
    return {
      success: false,
      error: 'Could not fetch data',
    }
  }
}
