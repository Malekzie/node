async function cityProvinceSearch(state) {
     const response = await fetch('https://countriesnow.space/api/v0.1/countries/state/cities' ,{
          method: 'POST',
          headers: {
               'Content-Type': 'application/json',
          },
          body: JSON.stringify({ country: 'Canada', state: state }),
     });
     const data = await response.json();
     console.log(data);
}

module.exports = cityProvinceSearch;