# belly-button-challenge
Module 14 challenge with JavaScript and Plotly

## Instructions/Premise

In this assignment, you will build an interactive dashboard to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

## Summary

The `index.html` file loads D3 and Plotly for deployment of the `app.js` script to load, format and dynamically change the study data, allowing for viewing of the data for each participant. 

A bar graph shows that person's top 10 microbe species alongside their demographic information. There is also a bubble chart showing all sample data, as well as a gauge chart to showcase how often they washed per week.

These information modules are all updated by the reader through the dropdown menu. 

A few quality-of-life additions have been made beyond the project instructions -- mostly around the formatting of the demographic information to be more readable by passing the keys to a function before populating the div tag.

The project is deployed to GitHub Pages at https://seanard1.github.io/belly-button-challenge/

## Citations

- This was used to find and research color scales. https://plotly.com/javascript/colorscales/

- Color selection on the gauge plot. https://community.plotly.com/t/plotly-colours-list/11730/2

- Tutoring session with Bootcamp's Kyle Goode really helped to get over the initial barrier of how to start this code. 