const searchBtn = document.getElementById('search-btn');
const apiKey = `GSR7zoBZ7gl3FAdkEk2rHsu7C85lXVHL`;
const city = JSON.parse(localStorage.getItem('search-input')) || [];


searchBtn.addEventListener('click', function(e) {
    e.preventDefault();

    let searchInput = document.getElementById('search-input').value;
    city.push(searchInput);
    localStorage.setItem('search-input', JSON.stringify(city));

    searchAPI(city);
    
});

function searchAPI(city) {

    const geoURL = `https://api.tomtom.com/search/2/geocode/${city}.json?key=${apiKey}`;

    fetch(geoURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (geoResults) {
            console.log(geoResults);
            const lat = geoResults.results[0].position.lat;
            const lon = geoResults.results[0].position.lon;
            console.log(lat);
            console.log(lon);

            const apiUrl = `https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json?key=${apiKey}&unit=mph&point=${lat},${lon}`;

            fetch(apiUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (apiData) {
                    console.log(apiData);
                })

            const ocURL = `https://api.openchargemap.io/v3/poi/?output=json&maxresults=20&key=789f86d1-a5b2-4530-8ca0-fa64aebcc952&latitude=${lat}&longitude=${lon}`;
    
            fetch(ocURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (ocData) {
                    console.log(ocData);
                })
        })
}

