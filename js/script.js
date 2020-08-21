/***************************
 * URL to COVID 19 API Documentation:
 * https://documenter.getpostman.com/view/10808728/SzS8rjbc?version=latest#071be6ab-ebcc-40dc-be8b-9209ab7caca5
 * Recommend: 'By Country All Status'
 ****************************/

$(document).ready(function () {
    //COVID 19 API
    let population;
    let countryQuery;
    let covidQuery;
    let caseCount;
    // let globalCount; Don't need this because it's in the variable covidQuery
    let countriesList = [];

    $.ajax({
            url: 'https://api.covid19api.com/summary',
            method: 'GET',
        })
        // After the data comes back from the API
        .then(function (response) {
            covidQuery = response;
            for (var i = 0; i < response.Countries.length; i++) {
                countriesList.push(response.Countries[i].Country)
            }

            $("#country").autocomplete({
                source: countriesList
            });
        });


    $("#searchBtn").click(function () {
        event.preventDefault();
        countryQuery = $(this).siblings("#country").val();
        idx = covidQuery.Countries.findIndex(x => x.Country === countryQuery);
        console.log(covidQuery.Countries[idx]);
    })


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
});