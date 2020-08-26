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

  $.ajax({
    url: 'https://api.covid19api.com/summary',
    method: 'GET',
  })
    // After the data comes back from the API
    .then(function (response) {
      covidQuery = response;
      for (var i = 0; i < response.Countries.length; i++) {
        countriesList.push(response.Countries[i].Country);
      }

      $('#country').autocomplete({
        source: countriesList,
      });
      getGlobalPop();
      GlobalTotalConfirmed = response.Global.TotalConfirmed;
    });

  $('#searchBtn').on('click', function (event) {
    event.preventDefault();
    countryQuery = $(this).siblings('#country').val();
    idx = covidQuery.Countries.findIndex((x) => x.Country === countryQuery);
    // console.log(covidQuery.Countries[idx]);
    TotalConfirmed = covidQuery.Countries[idx].TotalConfirmed;
    NewConfirmed = covidQuery.Countries[idx].NewConfirmed;
    getCountryPopulation(countryQuery);
  });

  function getGlobalPop() {
    var settings = {
      async: true,
      crossDomain: true,
      url: 'https://world-population.p.rapidapi.com/worldpopulation',
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'world-population.p.rapidapi.com',
        'x-rapidapi-key': '7890d205b1msh01e2a11ec28f854p1c50e9jsn12a3a11721e5',
      },
    };

    $.ajax(settings).done(function (response) {
      worldPopulation = response.body.world_population;
      // console.log(response);
    });
  }

  function getCountryPopulation(query) {
    var settings = {
      async: true,
      crossDomain: true,
      url: `https://world-population.p.rapidapi.com/population?country_name=${query}`,
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'world-population.p.rapidapi.com',
        'x-rapidapi-key': '7890d205b1msh01e2a11ec28f854p1c50e9jsn12a3a11721e5',
      },
    };
    // console.log(settings);
    $.ajax(settings).done(function (response) {
      countryPopulation = response.body.population;
    });
  }

  var ctx = document.getElementById('global-chart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });

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
});
