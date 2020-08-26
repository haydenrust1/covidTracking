/***************************
 * URL to COVID 19 API Documentation:
 * https://documenter.getpostman.com/view/10808728/SzS8rjbc?version=latest#071be6ab-ebcc-40dc-be8b-9209ab7caca5
 * Recommend: 'By Country All Status'
 ****************************/

$(document).ready(function () {
    //COVID 19 API
    let worldPopulation;
    let countryPopulation;
    let countryQuery;
    let covidQuery;
    let GlobalTotalConfirmed;
    let TotalConfirmed;
    let NewConfirmed;
    // let globalCount; Don't need this because it's in the variable covidQuery
    let countriesList = [];

    // call to Covid api
    $.ajax({
            url: 'https://api.covid19api.com/summary',
            method: 'GET',
        })
        // After the data comes back from the API
        .then(function (response) {
            console.log(response);
            covidQuery = response;
            for (var i = 0; i < response.Countries.length; i++) {
                countriesList.push(response.Countries[i].Country)
            }

            $("#country").autocomplete({
                source: countriesList
            });
            getGlobalPop();
            GlobalTotalConfirmed = response.Global.TotalConfirmed;
        });

    // On search button click
    $("#searchBtn").on("click", function (event) {
        event.preventDefault();
        countryQuery = $(this).siblings("#country").val();
        idx = covidQuery.Countries.findIndex(x => x.Country === countryQuery);
        TotalConfirmed = covidQuery.Countries[idx].TotalConfirmed;
        NewConfirmed = covidQuery.Countries[idx].NewConfirmed;
        GlobalNewConfirmed = covidQuery.Global.NewConfirmed;
        GlobalTotalConfirmed = covidQuery.Global.TotalConfirmed;
        // Not alike data
        // graphData("global-chart", [TotalConfirmed, NewConfirmed], ["Country Total Confirmed", "Country New Confirmed"]);
        // graphData("country-chart", [GlobalNewConfirmed, GlobalTotalConfirmed], ["Global New Confirmed", "Global Total Confirmed"]);
        // Alike data
        graphData("global-chart", [TotalConfirmed, GlobalTotalConfirmed], ["Country New Confirmed", "Global New Confirmed"]);
        graphData("country-chart", [NewConfirmed, GlobalNewConfirmed], ["Country Total Confirmed", "Global Total Confirmed"]);
        getCountryPopulation(countryQuery);

    })

    // Call to get global population
    function getGlobalPop() {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://world-population.p.rapidapi.com/worldpopulation",
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "world-population.p.rapidapi.com",
                "x-rapidapi-key": "7890d205b1msh01e2a11ec28f854p1c50e9jsn12a3a11721e5"
            }
        }
        // After the data comes back from the API
        $.ajax(settings).done(function (response) {
            worldPopulation = response.body.world_population;
            // console.log(response);
        });

    }


    // Call to get country population from query
    function getCountryPopulation(query) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": `https://world-population.p.rapidapi.com/population?country_name=${query}`,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "world-population.p.rapidapi.com",
                "x-rapidapi-key": "7890d205b1msh01e2a11ec28f854p1c50e9jsn12a3a11721e5"
            }
        }
        // After the data comes back from the API
        $.ajax(settings).done(function (response) {
            countryPopulation = response.body.population;
        });
    }

    function graphData(id, data, names) {
        var ctx = document.getElementById(id).getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: names,
                datasets: [{
                    label: '# of Votes',
                    data: data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

    // get news on page load
    getNews();

    // Call to Covid news api
    function getNews() {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://covid-19-news.p.rapidapi.com/v1/covid?lang=en&media=True&q=covid",
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "covid-19-news.p.rapidapi.com",
                "x-rapidapi-key": "7890d205b1msh01e2a11ec28f854p1c50e9jsn12a3a11721e5"
            }
        }
        // After the data comes back from the API
        $.ajax(settings).done(function (response) {
            for (var i = 0; i < 4; i++) {
                let randNum = Math.floor(Math.random() * 50);
                // Populate articles and links
                $(".card .card-body .card-title").eq(i).html(response.articles[randNum].title);
                $(".card .card-body .card-text").eq(i).html(response.articles[randNum].summary);
                $(".card .card-body .btn-primary").eq(i).attr("href", response.articles[randNum].link);
            }

        });
    }

<<<<<<< HEAD

=======
  /************************
   * BULMA BUTTONS FOR HTML
   ************************/
    $('.activate').click(function () {
    $('.modal').addClass('is-active');
    });

    $('.modal-close').click(function () {
    $('.modal').removeClass('is-active');
    });

    // function countryCovid(country) {
    //     for (var i = 0; i < 4; i++) {
    //         country = country.replace(" ", "-");
    //     }
    //     console.log(country);
    //     $.ajax({
    //             url: `https://api.covid19api.com/country/${country}?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z`,
    //             method: 'GET',
    //         })
    //         // After the data comes back from the API
    //         .then(function (response) {
    //             console.log(response);
    //         });
    // }
>>>>>>> 0febe4d6c470f73a42421762bef1c3c8f65b1a7a
});