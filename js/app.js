// const data = [3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 10, 10, 10, 10, 11];

function get_results(data) {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  let frequency = [...new Set(data)];
  let filtered_data = [];
  let absolute_frecuency = [];
  let measures_of_central_tendency = [];
  let means_dispersion = [];
  let accumulator = 0;

  let total_amount_of_data = data.reduce(reducer);
  let arithmetic_average = total_amount_of_data / data.length;
  let median = get_median(data);
  let array_element_multiplication = data.reduce((p,c)=>p*c);
  let decimal_exponent = ((100 / data.length) / 100);
  let geometric_mean = Math.pow(array_element_multiplication, decimal_exponent);
  let square_mean = get_square_mean(data);
  let mean_deviation = get_mean_deviation(data, arithmetic_average);
  let variance = get_variance(data, arithmetic_average);
  let typical_deviation = Math.sqrt(variance);
  let coefficient_of_variation = ( typical_deviation / arithmetic_average ) * 100;
  
  frequency.map(frequency => {

    let filter;

    filter = data.filter(item => item === frequency);

    accumulator = accumulator + filter.length;

    absolute_frecuency.push(filter.length);

    filtered_data.push({
      'number': frequency,
      'absolute_frecuency': filter.length,
      'accumulated_absolute_frequency': filter.length / data.length,
      'relative_frequency': (filter.length / data.length) * 100,
      'cumulative_relative_frequency': accumulator
    });

  });

  let moda = frequency[get_index_moda(absolute_frecuency)];

  measures_of_central_tendency = [
    {
      name: 'Media aritmética',
      value: arithmetic_average
    },
    {
      name: 'Mediana',
      value: median
    },
    {
      name: 'Moda',
      value: moda
    },
    {
      name: 'Media geométrica',
      value: geometric_mean
    },
    {
      name: 'Media cuadrática',
      value: square_mean
    }
  ];

  means_dispersion = [
    {
      name: 'Desviación media',
      value: mean_deviation
    },
    {
      name: 'Varianza',
      value: variance
    },
    {
      name: 'Desviación típica',
      value: typical_deviation
    },
    {
      name: 'Coeficiente de variación',
      value: coefficient_of_variation
    }
  ];


  generate_table(filtered_data);
  generate_table_measures_of_central_tendency(measures_of_central_tendency);
  generate_table_means_dispersion(means_dispersion);

  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: frequency,
      datasets: [{
        label: '# Frecuencia Absoluta',
        data: absolute_frecuency,
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

function generate_table(array) {
  let tbody = document.querySelector('#distribution');
  let html = ``;
  array.map(item => {

    html += `
      <tr>
        <td>${item.number}</td>
        <td>${item.absolute_frecuency}</td>
        <td>${item.accumulated_absolute_frequency}</td>
        <td>${item.relative_frequency}</td>
        <td>${item.cumulative_relative_frequency}</td>
      </tr>
    `;

  });

  tbody.innerHTML = html;

}

function generate_table_measures_of_central_tendency(array) {
  let tbody = document.querySelector('#trend');
  let html = ``;
  array.map(item => {

    html += `
      <tr>
        <th>${item.name}</th>
        <td>${item.value}</td>
      </tr>
    `;

  });

  tbody.innerHTML = html;
}

function generate_table_means_dispersion(array) {
  let tbody = document.querySelector('#dispersion');
  let html = ``;
  array.map(item => {

    html += `
      <tr>
        <th>${item.name}</th>
        <td>${item.value}</td>
      </tr>
    `;

  });

  tbody.innerHTML = html;
}

function check_text(e) {
  let txt = /[a-z]/gi.test(e.value);
  if (txt) {
    alert('Ingresa únicamente números: 1,2,3,4,5');
    e.value = "";
  };
};

function data_array_number(data_text) {
  if (data_text) {
    let data_array_text = data_text.split(',');
    let data = data_array_text.map(item => {
      if(item) {
        return parseInt(item);
      }
    });
    return data;
  }else {
    return []
  }
}

function get_median(array) {
  let values = array;
  values.sort((a, b) => a - b);``
  let lowMiddle = Math.floor((values.length - 1) / 2);
  let highMiddle = Math.ceil((values.length - 1) / 2);
  let median = (values[lowMiddle] + values[highMiddle]) / 2;
  return median;
}

function get_square_mean(array) {
  let sum_elements = 0;
  array.map(item => {

    sum_elements = sum_elements + (item * item);

  });

  return Math.sqrt(sum_elements / array.length);

}

function get_index_moda(array) {
  let moda = Math.max(...array);
  let index_moda = array.indexOf(moda);
  return index_moda;
}

function get_mean_deviation(array, arithmetic_average) {
  let mean_deviation = 0;
  let sumatory = 0;
  array.map(item => {
    sumatory = sumatory + ( Math.abs( item - arithmetic_average ) );
  });
  mean_deviation = sumatory / array.length;
  return mean_deviation;
}

function get_variance(array, arithmetic_average) {

  let variance = 0;
  let sumatory = 0;
  array.map(item => {
    let subtraction = Math.abs( item - arithmetic_average );
    sumatory = sumatory + ( Math.pow(subtraction, 2) );
  });
  variance = sumatory / array.length;
  return variance;

}

document.querySelector('#data').addEventListener('change', function () {
  let input_data = document.querySelector('#data');
  let data = data_array_number(input_data.value);
  document.querySelector('#count_data').textContent = data.length;
});

document.querySelector('#btn_action').addEventListener('click', function () {
  let label_error = document.querySelector('.label-validate');
  let results = document.querySelector('.results');
  let input_data = document.querySelector('#data');

  if (input_data.value) {
    label_error.classList.remove('animate__fadeIn');
    label_error.classList.add('animate__fadeOut');

    results.classList.remove('display-none');
    results.classList.add('animate__fadeIn');

    let data = data_array_number(input_data.value);

    get_results(data);


  } else {
    label_error.classList.remove('display-none');
    label_error.classList.add('animate__fadeIn');
  }

});

