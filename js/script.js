/***************************
 * URL to COVID 19 API Documentation:
 * https://documenter.getpostman.com/view/10808728/SzS8rjbc?version=latest#071be6ab-ebcc-40dc-be8b-9209ab7caca5
 * Recommend: 'By Country All Status'
 ****************************/

$(document).ready(function () {
    //COVID 19 API
    let worldPopulation = 7794798739;
    let countryPopulation;
    let countryQuery;
    let countryCode;
    let covidQuery;
    let GlobalTotalConfirmed;
    let GlobalNewConfirmed;
    let TotalConfirmed;
    let NewConfirmed;
    // let globalCount; Don't need this because it's in the variable covidQuery
    let countriesList = [];
    let countryCodeList = [];

    // call to Covid api
    $.ajax({
            url: 'https://api.covid19api.com/summary',
            method: 'GET',
        })
        // After the data comes back from the API
        .then(function (response) {
            // console.log(response);
            covidQuery = response;
            for (var i = 0; i < response.Countries.length; i++) {
                countriesList.push(response.Countries[i].Country);
                countryCodeList.push(response.Countries[i].CountryCode);
            }

            $("#country").autocomplete({
                source: countriesList,
                change: function (event, ui) {
                    if (!ui.item) {
                        //http://api.jqueryui.com/autocomplete/#event-change -
                        // The item selected from the menu, if any. Otherwise the property is null
                        //so clear the item for force selection
                        $("#country").val("");
                        $("#country").attr("placeholder", "Please Select a Country from the drop down list.");
                    }
                }
            });

            // getGlobalPop(); // disabled to hardcode population
            GlobalNewConfirmed = response.Global.NewConfirmed;
            GlobalTotalConfirmed = response.Global.TotalConfirmed;
            graphData("global-chart", [TotalConfirmed, GlobalTotalConfirmed, NewConfirmed, GlobalNewConfirmed], ["Country Total Confirmed", "Global Total Confirmed", "Country New Confirmed", "Global New Confirmed"]);

        });

    // On search button click
    $("#searchBtn").on("click", function (event) {
        event.preventDefault();
        countryQuery = $(this).siblings("#country").val();
        idx = covidQuery.Countries.findIndex(x => x.Country === countryQuery);
        TotalConfirmed = covidQuery.Countries[idx].TotalConfirmed;
        countryCode = covidQuery.Countries[idx].CountryCode;
        NewConfirmed = covidQuery.Countries[idx].NewConfirmed;
        // Not alike data
        // graphData("global-chart", [TotalConfirmed, NewConfirmed], ["Country Total Confirmed", "Country New Confirmed"]);
        // graphData("country-chart", [GlobalNewConfirmed, GlobalTotalConfirmed], ["Global New Confirmed", "Global Total Confirmed"]);
        // Alike data

        graphData("global-chart", [TotalConfirmed, GlobalTotalConfirmed, NewConfirmed, GlobalNewConfirmed], ["Country Total Confirmed", "Global Total Confirmed", "Country New Confirmed", "Global New Confirmed"]);

        getCountryPopulation(countryCode);

    })



    // Call to get global population
    // function getGlobalPop() {
    //     var worldPopulation;
    //     var settings = {
    //         "async": true,
    //         "crossDomain": true,
    //         "url": "https://world-population.p.rapidapi.com/worldpopulation",
    //         "method": "GET",
    //         "headers": {
    //             "x-rapidapi-host": "world-population.p.rapidapi.com",
    //             "x-rapidapi-key": "7890d205b1msh01e2a11ec28f854p1c50e9jsn12a3a11721e5"
    //         }
    //     }
    //     $.ajax(settings)
    //         .done(function (response) {
    //             worldPopulation = response.body.world_population;
    //             console.log('success');
    //         })
    //         .fail(function () {
    //             worldPopulation = 7794798739;
    //             console.log('fail')
    //         })
    //         .always(function () {
    //             console.log('always')
    //             console.log(worldPopulation)
    //         });
    // }





    // Call to get country population from query
    function getCountryPopulation(query) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://world-geo-data.p.rapidapi.com/countries/" + query + "?language=en%252Cru%252Czh%252Ces%252Car%252Cfr%252Cfa%252Cja%252Cpl%252Cit%252Cpt%252Cde&format=json",
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "world-geo-data.p.rapidapi.com",
                "x-rapidapi-key": "7890d205b1msh01e2a11ec28f854p1c50e9jsn12a3a11721e5"
            }
        }

        $.ajax(settings).done(function (response) {
            countryPopulation = response.population;

        });
    }



    // graph display
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

    function truncate(text, word_count) {
        return text.split(" ").slice(0, word_count).join(" ");
    }

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
            let randNum = Math.floor(Math.random() * 46);

            for (var i = 0; i < 4; i++) {
                // Populate articles and links
                $(".card .card-body .card-title").eq(i).html(response.articles[randNum + i].title);
                $(".card .card-body .card-text").eq(i).html(truncate(response.articles[randNum + i].summary, 50) + "...");
                $(".card .card-body .btn-primary").eq(i).attr("href", response.articles[randNum + i].link);
            }

        });
    }

    /***************************************
     * Button control for Symptom description
     ***************************************/
    $('.activate').on('click', function () {
        $('.modal').addClass('is-active');
    });
    $('.modal-close').on('click', function () {
        $('.modal').removeClass('is-active');
    });


});