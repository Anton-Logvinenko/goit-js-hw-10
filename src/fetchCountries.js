function fetchCountries(nameCountry) {
  const BASE_URL = 'https://restcountries.com/v2/name/';

  return fetch(
    `${BASE_URL}${nameCountry}?fields=name,capital,population,flags,languages`
  ).then(resp => {
    console.log(resp);
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }

    return resp.json();
  });
}
export { fetchCountries };
