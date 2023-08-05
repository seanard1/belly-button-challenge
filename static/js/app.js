// Read in source data

const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

function titleCase(word) {
  // https://www.samanthaming.com/pictorials/how-to-capitalize-a-string/
  return word.charAt(0).toUpperCase() + word.slice(1);
};


function formatDemo(input) {
  var demoInfo = input;

  if (demoInfo === 'm' || demoInfo === 'M') {
    demoInfo = 'Male';
  } else if (demoInfo === 'f' || demoInfo === 'F') {
    demoInfo = 'Female';
  } else if (demoInfo === 'i' || demoInfo === 'I') {
    demoInfo = 'Concave';
  } else if (demoInfo === 'o' || demoInfo === 'O') {
    demoInfo = 'Convex';
  };
  
  return demoInfo;
};

function formatKeys(key) {
  var demoKey = key;

  if (demoKey === 'bbtype') {
    demoKey = 'Curvature';
  } else if (demoKey === 'wfreq') {
    demoKey = 'Wash Frequency';
  } else if (demoKey === 'id') {
    demoKey = demoKey.toUpperCase();
  } else {
    demoKey = titleCase(demoKey);
  };

  return demoKey;
};


function changeOutput (sample){
  d3.json(url).then(function(data) {

    // Bar chart
    let subject = data.samples.filter(test => test.id == sample)[0];
    let sampleValues = subject.sample_values.slice(0,10).reverse();
    let otuIDs = subject.otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();;
    let otuLabels = subject.otu_labels.slice(0,10).reverse();
    let traceBar = {
      y: otuIDs,
      x: sampleValues,
      text: otuLabels,
      type: 'bar',
      orientation: 'h'
    };
    let layoutBar = {
      title: 'Top OTUs found (limit 10)',
      xaxis: { title: "Sample Values"}
    };
    
    let dataBar = [traceBar];
    Plotly.newPlot("bar", dataBar, layoutBar);


  // Bubble Chart 
    let allOTUs = subject.otu_ids;
    let allValues = subject.sample_values;
    let traceBubble = {
      x: allOTUs,
      y: allValues,
      mode: "markers",
      marker: {
        size: allValues,
        color: allOTUs,
        // https://plotly.com/javascript/colorscales/
        colorscale: "Picnic"
      },
      text: subject.otu_labels
      };

    let layoutBubble = {
      title: 'All Samples',
      xaxis:{title: 'OTU IDs'},
      yaxis:{title: 'Sample Values'},
      height: 600,
      width: 1250
    };

    let dataBubble = [traceBubble];

    Plotly.newPlot("bubble", dataBubble, layoutBubble);


  // Demographics
    let metadata = data.metadata.filter(test => test.id == sample)[0];
    let metadataPanel = d3.select("#sample-metadata").html("");

    for (key in metadata){
      metadataPanel.append("h6").text(`${formatKeys(key.toLowerCase())}: ${formatDemo(metadata[key])}`);
    };


  // Gauge Chart
    var dataGauge = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: parseInt(metadata.wfreq),
        title: { text: "Wash Frequency (per week)" },
        type: "indicator",
        mode: "gauge+number",
        // https://community.plotly.com/t/plotly-colours-list/11730/2
        gauge: { axis: { range: [null, 9]}, bar: { color: '#1f77b4'}}
      }
    ];
  
    var layoutGauge = { width: 600, height: 500, margin: { t: 0, b: 0 } };

    Plotly.newPlot('gauge', dataGauge, layoutGauge);

  });
};


function optionChanged(id) {
  changeOutput(id);
};


function init (){
  d3.json(url).then(function(data) {

    let dropDown = d3.select("#selDataset");

    let nameList = data.names;
    for (let n = 0; n < nameList.length; n++) {
     dropDown.append("option").text(nameList[n]).property("value", nameList[n]);
    };  
  });

  changeOutput(940);
};


init();
