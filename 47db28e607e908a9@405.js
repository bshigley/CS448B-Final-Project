function _1(md){return(
md`# `
)}

function _bqResults202412040142281733276625218(__query,FileAttachment,invalidation){return(
__query(FileAttachment("bq-results-20241204-014228-1733276625218.csv"),{from:{table:"bq-results-20241204-014228-1733276625218"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _convertTZ(){return(
function convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
}
)}

function _baseball_data(FileAttachment){return(
FileAttachment("bq-results-20241204-014228-1733276625218.csv").csv()
)}

function _venue_data(FileAttachment){return(
FileAttachment("Team_venue_info.csv").csv()
)}

function _team_venue_info(__query,FileAttachment,invalidation){return(
__query(FileAttachment("Team_venue_info.csv"),{from:{table:"Team_venue_info"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _8()
{
  const venueToTimezone = {
  "Rogers Centre": "America/Toronto",
  "Fenway Park": "America/New_York", 
  "Yankee Stadium": "America/New_York",
  "Citi Field": "America/New_York",
  "PNC Park": "America/New_York",
  "Citizens Bank Park": "America/New_York", 
  "Nationals Park": "America/New_York",
  "Oriole Park at Camden Yards": "America/New_York",
  "Turner Field": "America/New_York",
  "Marlins Park": "America/New_York",
  "Tropicana Field": "America/New_York",
  "Progressive Field": "America/New_York",
  "Great American Ball Park": "America/New_York",
  "Comerica Park": "America/Detroit",
  "Miller Park": "America/Chicago",
  "Target Field": "America/Chicago",
  "Wrigley Field": "America/Chicago",
  "U.S. Cellular Field": "America/Chicago",
  "Busch Stadium": "America/Chicago",
  "Kauffman Stadium": "America/Chicago",
  "Globe Life Park in Arlington": "America/Chicago",
  "Minute Maid Park": "America/Chicago",
  "Coors Field": "America/Denver",
  "Chase Field": "America/Phoenix",
  "Dodger Stadium": "America/Los_Angeles",
  "PETCO Park": "America/Los_Angeles",
  "Angel Stadium of Anaheim": "America/Los_Angeles",
  "AT&T Park": "America/Los_Angeles",
  "Oakland Coliseum": "America/Los_Angeles",
  "Safeco Field": "America/Los_Angeles"

  }

  return venueToTimezone
}


function _convertToLocalTime(venue_data){return(
function convertToLocalTime(utcDate, venue) {
   const venueRow = venue_data.find(v => v.Venue === venue);
   const tz = venueRow ? venueRow.Tstring : "UTC";
   
   try {
     const date = new Date(utcDate);
     const localDate = new Date(date.toLocaleString('en-US', {
       timeZone: tz
     }));
     
     return localDate.toLocaleString('en-US', {
       year: 'numeric',
       month: 'short',
       day: 'numeric',
       hour: 'numeric',
       minute: 'numeric',
       hour12: true
     });
   } catch(e) {
     console.error(`Error converting time for venue ${venue}: ${e}`);
     return utcDate;
   }
 }
)}

function _data(baseball_data,convertToLocalTime)
{
 var processedData = baseball_data.map(row => ({
   ...row,
   localGameTime: convertToLocalTime(row.createdAt, row.venueName)
 }))

  return processedData
}


function _11(__query,data,invalidation){return(
__query(data,{from:{table:"data"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation,"data")
)}

function _12(venue_data)
{
 function convertToLocalTime(utcDate, venue) {
   const venueRow = venue_data.find(v => v.Venue === venue);
   const tz = venueRow ? venueRow.Tstring : "UTC";
   
   try {
     // Parse the UTC date string
     const utcDateTime = new Date(utcDate);
     
     // Convert directly to the target timezone
     const options = {
       timeZone: tz,
       year: 'numeric',
       month: 'numeric',
       day: 'numeric',
       hour: 'numeric',
       minute: 'numeric',
       hour12: false,
       timeZoneName: 'short'
     };
     
     // Format the date
     return utcDateTime.toLocaleString('en-US', options);
     
   } catch(e) {
     console.error(`Error converting time for venue ${venue}: ${e}`);
     return utcDate;
   }
 }
}


function _convertToLocalTime2(venue_data){return(
function convertToLocalTime2(utcDate, venue) {
  const venueRow = venue_data.find(v => v.Venue === venue);
  if (!venueRow || !venueRow.Tstring) {
    console.error(`No timezone found for venue: ${venue}`);
    return null;
  }
  
  try {
    // Input format is "YYYY-MM-DD HH:mm:ss UTC"
    // Remove "UTC" and create a proper ISO string
    const cleanDate = utcDate.replace(" UTC", "").trim();
    const isoString = cleanDate.replace(" ", "T") + "Z";
    
    // Create Date object from ISO string
    const utcDateTime = new Date(isoString);
    
    // Verify we have a valid date
    if (isNaN(utcDateTime.getTime())) {
      console.error(`Invalid date created from: ${utcDate}`);
      return null;
    }
    
    // Convert to local time with the venue's timezone
    const options = {
      timeZone: venueRow.Tstring,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    
    const localDateTime = utcDateTime.toLocaleString('en-US', options);
    
    // Return in format "YYYY-MM-DD HH:mm:ss" plus the timezone string
    return localDateTime.replace(',', '') + ' ' + venueRow.Tstring;
    
  } catch(e) {
    console.error(`Error converting time for venue ${venue}: ${e}`);
    console.error('Input date:', utcDate);
    console.error('Venue timezone:', venueRow?.Tstring);
    return null;
  }
}
)}

function _data1(baseball_data,convertToLocalTime2)
{
  var processedData = baseball_data.map(row => ({
    ...row,
    localGameTime: convertToLocalTime2(row.createdAt, row.venueName)
  }))
  return processedData
}


function _15(__query,data1,invalidation){return(
__query(data1,{from:{table:"data1"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation,"data1")
)}

function _data2(venue_data,convertToLocalTime2,baseball_data)
{
  function addLatLong(baseballRow) {
    const venueRow = venue_data.find(v => v.Venue === baseballRow.venueName);
    
    return {
      ...baseballRow,
      venueLat: venueRow ? venueRow.Lat : null,
      venueLong: venueRow ? venueRow.Long : null,
      localGameTime: convertToLocalTime2(baseballRow.createdAt, baseballRow.venueName)
    };
  }
  var processedData = baseball_data.map(row => addLatLong(row))
  return processedData
}


function _17(__query,data2,invalidation){return(
__query(data2,{from:{table:"data2"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation,"data2")
)}

async function _topojson(require){return(
await require("topojson-client@3")
)}

async function _geography(topojson)
{
  const us_response = await fetch("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json");
  const us_topology = await us_response.json();
  const us_states = topojson.feature(us_topology, us_topology.objects.states);
  
  const canada_response = await fetch("https://gist.githubusercontent.com/Brideau/2391df60938462571ca9/raw/f5a1f3b47ff671eaf2fb7e7b798bacfc6962606a/canadaprovtopo.json");
  const canada_topology = await canada_response.json();
  const canada_provinces = topojson.feature(canada_topology, canada_topology.objects.canadaprov);
  
  const geo = {
    us: us_states,
    canada: canada_provinces
  };
  
  return geo;
}


function _20(d3,data2,venue_data,geography)
{
  const width = 900;
  const height = 600;
  const graphHeight = 300;
  const margin = {top: 50, right: 50, bottom: 50, left: 70};
  const mapPadding = 50;  // Added padding constant
  
  // Create container div with flexbox
  const container = d3.create("div")
    .style("display", "flex")
    .style("flex-direction", "column")
    .style("gap", "20px");
  
  // Aggregate home runs by venue
  var homeRunsByVenue = d3.rollup(data2,
    v => v.length, 
    d => d.venueName 
  );

  var homeRunsByVenueDayNight = d3.rollup(data2,
    v => ({
      total: v.length,
      day: d3.sum(v, d => d.dayNight === 'D' ? 1 : 0),
      night: d3.sum(v, d => d.dayNight === 'N' ? 1 : 0)
    }),
    d => d.venueName
  );
  
  var mapData = Array.from(homeRunsByVenue, ([venueName, count]) => {
    const venueInfo = venue_data.find(v => v.Venue === venueName);
    const dayNightStats = homeRunsByVenueDayNight.get(venueName);
    return {
      venue: venueName,
      count: count,
      lat: venueInfo?.Lat,
      long: venueInfo?.Long,
      dayHRs: dayNightStats.day,
      nightHRs: dayNightStats.night,
      dayPct: (dayNightStats.day / count * 100).toFixed(1),
      nightPct: (dayNightStats.night / count * 100).toFixed(1)
    };
  });

  // Process time data with proper timezone handling
  const timeData = new Map();
  
  data2.forEach((d, index) => {
    try {
      if (!d.localGameTime) {
        console.log(`Missing localGameTime for entry ${index}`);
        return;
      }

      const parts = d.localGameTime.split(" ");
      const timePart = parts[1];
      const [hours, minutes] = timePart.split(":");
      const timeValue = Number(hours) + Number(minutes)/60;
      
      if (isNaN(timeValue)) {
        console.log(`Invalid time value for entry ${index}:`, timePart);
        return;
      }

      if (!timeData.has(d.venueName)) {
        timeData.set(d.venueName, new Map());
      }
      
      // Round to nearest hour for clearer visualization
      const roundedTime = Math.round(timeValue);
      const venueMap = timeData.get(d.venueName);
      venueMap.set(roundedTime, (venueMap.get(roundedTime) || 0) + 1);
      
    } catch (e) {
      console.log(`Error processing entry ${index}:`, e);
      console.log("Problematic entry:", d);
    }
  });

  // Helper functions for jittering
  let activeJitterTimeout = null;
  let activeJitterGroup = new Set();

  function getOverlappingPoints(selectedPoint, allPoints, threshold = 20) {
    const [selectedX, selectedY] = projection([selectedPoint.long, selectedPoint.lat]);
    return allPoints.filter(point => {
      if (point === selectedPoint) return false;
      const [x, y] = projection([point.long, point.lat]);
      const dist = Math.sqrt(Math.pow(x - selectedX, 2) + Math.pow(y - selectedY, 2));
      return dist < threshold;
    });
  }

  function jitterPoint(point, index, centerPoint, radius = 20) {
    const [centerX, centerY] = projection([centerPoint.long, centerPoint.lat]);
    const spreadAngle = (20 * Math.PI) / 180;
    const baseAngle = Math.PI - spreadAngle/2;
    const angle = baseAngle + (index * (spreadAngle / 8));
    
    let jitteredX = centerX + radius * Math.cos(angle);
    let jitteredY = centerY + radius * Math.sin(angle);
    
    const padding = 10;
    jitteredX = Math.max(padding, Math.min(width - padding, jitteredX));
    jitteredY = Math.max(padding, Math.min(height - padding, jitteredY));
    
    return [jitteredX, jitteredY];
  }

  // Calculate size scale
  const maxCount = d3.max(mapData, d => d.count);
  const minCount = d3.min(mapData, d => d.count);
  const sizeScale = d3.scaleSqrt()
    .domain([minCount, maxCount])
    .range([10, 300]);

  // Create bounds as GeoJSON
  const bounds = {
    type: "MultiPoint",
    coordinates: [
      [-125, 25],
      [-70, 48]
    ]
  };

  // Create projection with adjusted size for padding
  const projection = d3.geoAlbers()
    .fitSize([width - (mapPadding * 2), height - (mapPadding * 2)], bounds);

  // Create map SVG with padding
  const mapSvg = container.append("svg")
    .attr("width", width + (mapPadding * 2))
    .attr("height", height + (mapPadding * 2))
    .style("background-color", "white");

  // Create group for map elements with padding transform
  const mapGroup = mapSvg.append("g")
    .attr("transform", `translate(${mapPadding}, ${mapPadding})`);

  // Add overlays for graph
  const backgroundOverlay = container.append("div")
    .style("position", "fixed")
    .style("top", "0")
    .style("left", "0")
    .style("width", "100%")
    .style("height", "100%")
    .style("background-color", "rgba(0, 0, 0, 0.5)")
    .style("z-index", "999")
    .style("display", "none")
    .on("click", hideGraph);

  const graphOverlay = container.append("div")
    .style("position", "absolute")
    .style("top", "50%")
    .style("left", "50%")
    .style("transform", "translate(-50%, -50%)")
    .style("background-color", "white")
    .style("padding", "20px")
    .style("border-radius", "8px")
    .style("box-shadow", "0 4px 6px rgba(0, 0, 0, 0.1)")
    .style("z-index", "1000")
    .style("display", "none")
    .style("max-width", "95%")
    .style("max-height", "95vh")
    .style("overflow", "auto");

  const closeButton = graphOverlay.append("div")
    .style("position", "absolute")
    .style("top", "10px")
    .style("right", "10px")
    .style("cursor", "pointer")
    .style("font-size", "20px")
    .style("width", "30px")
    .style("height", "30px")
    .style("display", "flex")
    .style("align-items", "center")
    .style("justify-content", "center")
    .style("border-radius", "50%")
    .style("background-color", "#f0f0f0")
    .style("transition", "background-color 0.2s")
    .html("×")
    .on("mouseover", function() {
      d3.select(this).style("background-color", "#e0e0e0");
    })
    .on("mouseout", function() {
      d3.select(this).style("background-color", "#f0f0f0");
    })
    .on("click", hideGraph);

  const graphSvg = graphOverlay.append("svg")
    .attr("width", width)
    .attr("height", graphHeight + 40);

  // Create path generator
  const path = d3.geoPath(projection);

  // Create tooltip div
  const tooltip = d3.select(document.body)
    .append("div")
    .style("position", "absolute")
    .style("visibility", "hidden")
    .style("background-color", "white")
    .style("padding", "10px")
    .style("border-radius", "5px")
    .style("box-shadow", "0 0 10px rgba(0,0,0,0.1)")
    .style("pointer-events", "none")
    .style("z-index", "10");

  // Add US map
  mapGroup.append("path")
    .datum(geography.us)
    .attr("d", path)
    .attr("fill", "#f0f0f0")
    .attr("stroke", "#ccc");

  // Add Canada map
  mapGroup.append("path")
    .datum(geography.canada)
    .attr("d", path)
    .attr("fill", "#f0f0f0")
    .attr("stroke", "#ccc");

  function hideGraph() {
    graphOverlay.style("display", "none");
    backgroundOverlay.style("display", "none");
  }

  // Function to format time for display
  function formatTime(decimal) {
    const hours = Math.floor(decimal);
    const minutes = Math.round((decimal - hours) * 60);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  }

  function updateTimeGraph(venueName) {
    graphOverlay.style("display", "block");
    backgroundOverlay.style("display", "block");
    graphSvg.selectAll("*").remove();

    const venueTimeMap = timeData.get(venueName);
    if (!venueTimeMap) {
      graphSvg.append("text")
        .attr("x", width / 2)
        .attr("y", graphHeight / 2)
        .attr("text-anchor", "middle")
        .text("No time data available for this venue");
      return;
    }

    const timeDistribution = Array.from(venueTimeMap, ([hour, count]) => ({
      hour,
      count
    })).sort((a, b) => a.hour - b.hour);

    const validTimeDistribution = timeDistribution.filter(d => 
      !isNaN(d.hour) && d.hour >= 0 && d.hour <= 24 && !isNaN(d.count)
    );

    if (validTimeDistribution.length === 0) {
      graphSvg.append("text")
        .attr("x", width / 2)
        .attr("y", graphHeight / 2)
        .attr("text-anchor", "middle")
        .text("No valid time data available for this venue");
      return;
    }

    const xScale = d3.scaleLinear()
      .domain([0, 24])
      .range([margin.left, width - margin.right]);
      
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(validTimeDistribution, d => d.count) * 1.1])
      .range([graphHeight - margin.bottom, margin.top]);

    // Create grid lines
    graphSvg.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0,${graphHeight - margin.bottom})`)
      .call(d3.axisBottom(xScale)
        .tickFormat("")
        .tickSize(-graphHeight + margin.top + margin.bottom)
        .ticks(12))
      .style("stroke-opacity", 0.1);

    graphSvg.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale)
        .tickFormat("")
        .tickSize(-width + margin.left + margin.right)
        .ticks(5))
      .style("stroke-opacity", 0.1);

    const line = d3.line()
      .x(d => xScale(d.hour))
      .y(d => yScale(d.count))
      .curve(d3.curveMonotoneX);

    graphSvg.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${graphHeight - margin.bottom})`)
      .call(d3.axisBottom(xScale)
        .tickFormat(formatTime)
        .ticks(12))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    graphSvg.append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale)
        .ticks(5)
        .tickFormat(d3.format("d")));

    // Add axis labels
    graphSvg.append("text")
      .attr("x", width / 2)
      .attr("y", graphHeight + 15)
      .attr("text-anchor", "middle")
      .text("Time of Day");

    graphSvg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -graphHeight / 2)
      .attr("y", margin.left / 2)
      .attr("text-anchor", "middle")
      .text("Number of Home Runs");

    // Add title
    graphSvg.append("text")
      .attr("x", width / 2)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text(`Home Run Distribution by Time of Day at ${venueName}`);

    // Add area fill
    graphSvg.append("path")
      .datum(validTimeDistribution)
      .attr("fill", "steelblue")
      .attr("fill-opacity", 0.1)
      .attr("stroke", "none")
      .attr("d", d3.area()
        .x(d => xScale(d.hour))
        .y0(graphHeight - margin.bottom)
        .y1(d => yScale(d.count))
      );

    // Add line
    graphSvg.append("path")
      .datum(validTimeDistribution)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Add points with tooltips
    graphSvg.selectAll("circle")
      .data(validTimeDistribution)
      .join("circle")
      .attr("cx", d => xScale(d.hour))
      .attr("cy", d => yScale(d.count))
      .attr("r", 5)
      .attr("fill", "steelblue")
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .on("mouseover", function(event, d) {
        d3.select(this)
          .attr("r", 7)
          .attr("fill", "red");
        tooltip
          .style("visibility", "visible")
          .html(`Time: ${formatTime(d.hour)}<br>Home Runs: ${d.count}`);
      })
      .on("mousemove", function(event) {
        tooltip
          .style("top", (event.pageY - 10) + "px")
          .style("left", (event.pageX + 10) + "px");
      })
      .on("mouseout", function() {
        d3.select(this)
          .attr("r", 5)
          .attr("fill", "steelblue");
        tooltip
          .style("visibility", "hidden");
      });
  }

  // Add circles for each stadium with jittering
  mapGroup.selectAll("circle")
    .data(mapData)
    .join("circle")
    .attr("cx", d => projection([d.long, d.lat])[0])
    .attr("cy", d => projection([d.long, d.lat])[1])
    .attr("r", d => Math.sqrt(sizeScale(d.count) / Math.PI))
    .attr("fill", "steelblue")
    .attr("fill-opacity", 0.6)
    .attr("stroke", "white")
    .attr("stroke-width", 1)
    .attr("data-original-x", d => projection([d.long, d.lat])[0])
    .attr("data-original-y", d => projection([d.long, d.lat])[1])
    .style("cursor", "pointer")
    .on("mouseover", function(event, d) {
      if (activeJitterTimeout) {
        clearTimeout(activeJitterTimeout);
        activeJitterTimeout = null;
      }

      d3.select(this).attr("fill-opacity", 0.8);
      tooltip
        .style("visibility", "visible")
        .html(`
          <strong>${d.venue}</strong><br>
          Total: ${d.count} HRs<br>
          Day: ${d.dayHRs} (${d.dayPct}%)<br>
          Night: ${d.nightHRs} (${d.nightPct}%)
        `);

      if (!activeJitterGroup.has(d.venue)) {
        const overlapping = getOverlappingPoints(d, mapData);
        
        if (overlapping.length > 0) {
          activeJitterGroup.clear();
          activeJitterGroup.add(d.venue);
          overlapping.forEach(point => activeJitterGroup.add(point.venue));

          overlapping.forEach((point, i) => {
            const [jitteredX, jitteredY] = jitterPoint(point, i, d);
            mapGroup.selectAll("circle")
              .filter(p => p === point)
              .transition()
              .duration(300)
              .attr("cx", jitteredX)
              .attr("cy", jitteredY)
              .attr("fill-opacity", 0.8)
              .attr("data-jittered", "true");
          });
        }
      }
    })
    .on("mousemove", function(event) {
      if (activeJitterTimeout) {
        clearTimeout(activeJitterTimeout);
        activeJitterTimeout = null;
      }

      tooltip
        .style("top", (event.pageY - 10) + "px")
        .style("left", (event.pageX + 10) + "px");
    })
    .on("mouseout", function(event, d) {
      d3.select(this).attr("fill-opacity", 0.6);
      tooltip.style("visibility", "hidden");
      
      if (activeJitterTimeout) {
        clearTimeout(activeJitterTimeout);
      }
      
      activeJitterTimeout = setTimeout(() => {
        const elementAtPoint = document.elementFromPoint(event.clientX, event.clientY);
        const isOverCircle = elementAtPoint && elementAtPoint.tagName.toLowerCase() === 'circle';
        
        if (!isOverCircle) {
          activeJitterGroup.clear();
          mapGroup.selectAll("circle")
            .transition()
            .duration(300)
            .attr("cx", function() { return d3.select(this).attr("data-original-x"); })
            .attr("cy", function() { return d3.select(this).attr("data-original-y"); })
            .attr("fill-opacity", 0.6)
            .attr("data-jittered", null);
        }
      }, 500);
    })
    .on("click", function(event, d) {
      if (activeJitterTimeout) {
        clearTimeout(activeJitterTimeout);
        activeJitterTimeout = null;
      }
      updateTimeGraph(d.venue);
    });

  return container.node();
}


function _21(d3,data2,FileAttachment)
{
  const width = 900;  // Increased overall width
  const height = 800; // Increased height to accommodate taller cells
  
  // Color scheme for bars
  const timeColorScale = d3.scaleLinear()
    .domain([0, 24])
    .range(['#173F5F', '#20639B', '#3CAEA3', '#F6D55C', '#ED553B', '#173F5F'])
    .interpolate(d3.interpolateHcl);

  // Process data for players and their home run times using data2
  const playerHomeRuns = d3.rollup(data2,
    v => {
      // Initialize array for 48 half-hour intervals
      const timeData = Array(48).fill(0).map((_, interval) => {
        const hour = Math.floor(interval / 2);
        const minute = (interval % 2) * 30;
        return {
          interval: interval,
          timeString: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
          count: 0
        };
      });

      // Count home runs in each interval
      v.forEach(hr => {
        try {
          if (hr && hr.localGameTime) {
            // Extract time portion from datetime string
            const timePart = hr.localGameTime.split(' ')[1];  // Get "21:46:49" from "04/27/2016 21:46:49"
            const [hours, minutes] = timePart.split(':').map(Number);  // Get hours and minutes
            
            const interval = hours * 2 + (minutes >= 30 ? 1 : 0);
            if (interval >= 0 && interval < 48) {
              timeData[interval].count++;
            }
          }
        } catch (error) {
          console.error("Error processing entry:", hr, error);
        }
      });

      return {
        count: v.length,
        name: v[0].hitterFullName,
        timeData: timeData
      };
    },
    d => d.hitterFullName
  );

  // Create main container
   // Create main container
// Create main container
  const mainDiv = d3.create("div")
    .style("width", `${width}px`)
    .style("height", `${height}px`)
    .style("margin", "0 auto")
    .style("position", "relative")
    .style("background", "#f8fafc")
    .style("border-radius", "12px")
    .style("padding", "20px")
    .style("box-shadow", "0 4px 6px -1px rgba(0, 0, 0, 0.1)");

  mainDiv.append("h2")
    .style("text-align", "center")
    .style("margin", "0 0 20px 0")
    .style("color", "#1e293b")
    .style("font-size", "24px")
    .text("MLB Home Run Leaders");

   // Content wrapper with minimal padding
  const contentWrapper = mainDiv.append("div")
    .style("display", "flex")
    .style("flex-direction", "column")
    .style("height", "calc(100% - 60px)")
    .style("gap", "0px")
    .style("padding", "1px")
    .style("max-width", "1600px")    // Add max-width to control overall width
    .style("margin", "0 auto");

  // Grid with minimal gaps
  const grid = contentWrapper.append("div")
    .style("display", "grid")
    .style("grid-template-columns", "repeat(5, 1fr)")
    .style("gap", "4px")
    .style("flex-grow", "1")
    .style("min-height", "0")
    .style("width", "130%")          // Make grid wider than container to bring cells closer
    .style("margin-left", "-15%");   // Center the wider grid



  // Create image attachments map
  const imageAttachments = new Map([
    ["Mark Trumbo", FileAttachment("Mark Trumbo.jpeg")],
    ["Nelson Cruz", FileAttachment("Nelson Cruz.jpeg")],
    ["Edwin Encarnacion", FileAttachment("Edwin Encarnacion.jpeg")],
    ["Khris Davis", FileAttachment("Khris Davis.jpeg")],
    ["James Dozier", FileAttachment("James Dozier.jpeg")],
    ["Nolan Arenado", FileAttachment("Nolan Arenado.jpeg")],
    ["Vernon Carter", FileAttachment("Vernon Carter.jpeg")],
    ["Todd Frazier", FileAttachment("Todd Frazier.jpeg")],
    ["Kristopher Bryant", FileAttachment("Kristopher Bryant.jpeg")],
    ["Robinson Cano", FileAttachment("Robinson Cano.jpeg")],
    ["Christopher Davis", FileAttachment("Christopher Davis.jpeg")],
    ["David Ortiz", FileAttachment("David Ortiz.jpeg")],
    ["Jose Cabrera", FileAttachment("Jose Cabrera.jpeg")],
    ["Joshua Donaldson", FileAttachment("Joshua Donaldson.jpeg")],
    ["Manuel Machado", FileAttachment("Manuel Machado.jpeg")],
    ["Evan Longoria", FileAttachment("Evan Longoria.jpeg")],
    ["Carlos Santana", FileAttachment("Carlos Santana.jpeg")],
    ["Matthew Kemp", FileAttachment("Matthew Kemp.jpeg")],
    ["Frederick Freeman", FileAttachment("Frederick Freeman.jpeg")],
    ["Michael Napoli", FileAttachment("Michael Napoli.jpeg")]
  ]);

  // Function to get the image URL from FileAttachment
  async function getPlayerImageUrl(player) {
    try {
      const attachment = imageAttachments.get(player.name);
      if (attachment) {
        const imageFile = await attachment.url();
        return imageFile;
      }
      return null;
    } catch (error) {
      console.error(`Error loading image for ${player.name}:`, error);
      return null;
    }
  }

  const sortedPlayers = Array.from(playerHomeRuns.entries())
    .map(([name, data]) => ({
      name: name,
      count: data.count,
      timeData: data.timeData
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 15);

  // Create grid cells
  sortedPlayers.forEach((player, i) => {
    const cellWrapper = grid.append("div")
      .style("position", "relative")
      .style("display", "block")
      .style("width", "calc(65%)")     // Keep original cell width
      .style("padding-top", "calc(97.5%)")   // Keep original aspect ratio
      .style("margin", "0 auto");

    const cell = cellWrapper.append("div")
      .style("position", "absolute")
      .style("top", "0")
      .style("left", "0")
      .style("right", "0")
      .style("bottom", "0")
      .style("background", "white")
      .style("border", "1px solid #e2e8f0")
      .style("border-radius", "8px")
      .style("display", "flex")
      .style("flex-direction", "column")
      .style("justify-content", "flex-end")
      .style("cursor", "pointer")
      .style("transition", "all 0.3s")
      .style("overflow", "hidden")
      .style("box-shadow", "0 1px 3px 0 rgba(0, 0, 0, 0.1)");

    // Load and set the background image
    getPlayerImageUrl(player).then(imageUrl => {
      if (imageUrl) {
        cell.style("background-image", `url(${imageUrl})`)
            .style("background-size", "cover")
            .style("background-position", "center")
            .style("background-repeat", "no-repeat");
      }
    });

    // Add hover effects
    cell.on("mouseover", function() {
      d3.select(this)
        .style("transform", "translateY(-2px)")
        .style("box-shadow", "0 8px 16px -6px rgba(0, 0, 0, 0.15)");
    })
    .on("mouseout", function() {
      d3.select(this)
        .style("transform", "translateY(0)")
        .style("box-shadow", "0 1px 3px 0 rgba(0, 0, 0, 0.1)");
    })
    .on("click", function() {
      showHistogram(player);
    });

    // Add gradient overlay
    cell.append("div")
      .style("position", "absolute")
      .style("left", "0")
      .style("right", "0")
      .style("bottom", "0")
      .style("height", "40%")      // Reduced overlay height
      .style("background", "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%)")
      .style("pointer-events", "none");

    // Content container for text
    const content = cell.append("div")
      .style("position", "relative")
      .style("z-index", "1")
      .style("padding", "6px")     // Reduced padding
      .style("width", "100%")
      .style("text-align", "center");

    // Rank circle
    content.append("div")
      .style("background", `${i < 3 ? "rgba(254, 243, 199, 0.9)" : "rgba(241, 245, 249, 0.9)"}`)
      .style("color", `${i < 3 ? "#92400e" : "#64748b"}`)
      .style("border-radius", "9999px")
      .style("width", "18px")       // Slightly smaller
      .style("height", "18px")      // Slightly smaller
      .style("display", "flex")
      .style("align-items", "center")
      .style("justify-content", "center")
      .style("font-size", "10px")   // Slightly smaller
      .style("font-weight", "bold")
      .style("margin", "0 auto 3px auto")
      .text(i + 1);

    // Player name
    content.append("div")
      .style("font-weight", "bold")
      .style("font-size", "11px")  // Slightly smaller
      .style("margin-bottom", "2px")
      .style("color", "white")
      .style("text-shadow", "0 1px 2px rgba(0,0,0,0.8)")
      .text(player.name);

    // Home run count
    content.append("div")
      .style("color", "rgba(255,255,255,0.9)")
      .style("font-size", "10px")  // Slightly smaller
      .style("font-weight", "500")
      .style("text-shadow", "0 1px 2px rgba(0,0,0,0.8)")
      .text(`${player.count} HRs`);
  });


  // Function to hide histogram
  function hideHistogram() {
    svgContainer.transition()
      .duration(300)
      .style("opacity", 0)
      .on("end", function() {
        svgContainer.style("display", "none");
      });
  }

  function showHistogram(playerData) {
    createHistogram(playerData);
    svgContainer.style("display", "flex")
      .style("opacity", 0)
      .transition()
      .duration(300)
      .style("opacity", 1);
  }

  // Create SVG container
  const svgContainer = mainDiv.append("div")
    .style("position", "absolute")
    .style("top", "0")
    .style("left", "0")
    .style("width", "100%")
    .style("height", "100%")
    .style("background", "rgba(15, 23, 42, 0.9)")
    .style("backdrop-filter", "blur(4px)")
    .style("display", "none")
    .style("justify-content", "center")
    .style("align-items", "center")
    .on("click", function(event) {
      if (event.target === this) {
        hideHistogram();
      }
    });

  const histogramSvg = svgContainer.append("svg")
    .attr("width", 900)
    .attr("height", 400)
    .style("background", "white")
    .style("border-radius", "12px")
    .style("box-shadow", "0 25px 50px -12px rgba(0, 0, 0, 0.25)");

  const closeButton = svgContainer.append("button")
    .style("position", "absolute")
    .style("right", "20px")
    .style("top", "20px")
    .style("background", "white")
    .style("border", "2px solid #e2e8f0")
    .style("border-radius", "50%")
    .style("width", "36px")
    .style("height", "36px")
    .style("cursor", "pointer")
    .style("font-size", "20px")
    .style("display", "flex")
    .style("align-items", "center")
    .style("justify-content", "center")
    .style("color", "#64748b")
    .style("transition", "all 0.2s")
    .text("×")
    .on("click", hideHistogram)
    .on("mouseover", function() {
      d3.select(this)
        .style("background", "#f1f5f9")
        .style("color", "#0f172a");
    })
    .on("mouseout", function() {
      d3.select(this)
        .style("background", "white")
        .style("color", "#64748b");
    });

  function createHistogram(playerData) {
    histogramSvg.html("");

    const margin = {top: 40, right: 30, bottom: 60, left: 50};
    const histWidth = 900 - margin.left - margin.right;
    const histHeight = 400 - margin.top - margin.bottom;

    const g = histogramSvg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X scale
    const x = d3.scaleBand()
      .domain(playerData.timeData.map(d => d.timeString))
      .range([0, histWidth])
      .padding(0.2);

    // Y scale
    const y = d3.scaleLinear()
      .domain([0, Math.max(1, d3.max(playerData.timeData, d => d.count))])
      .nice()
      .range([histHeight, 0]);

    // Add subtle grid lines
    g.append("g")
      .attr("class", "grid")
      .attr("opacity", 0.1)
      .call(d3.axisLeft(y)
        .ticks(5)
        .tickSize(-histWidth)
      );

    // Add bars with enhanced styling
    g.selectAll("rect")
      .data(playerData.timeData)
      .enter()
      .append("rect")
        .attr("x", d => x(d.timeString))
        .attr("y", d => y(d.count))
        .attr("width", x.bandwidth())
        .attr("height", d => histHeight - y(d.count))
        .attr("fill", (d, i) => timeColorScale(i / 2))
        .attr("rx", 4)
        .style("filter", "drop-shadow(0 2px 2px rgba(0,0,0,0.1))")
        .on("mouseover", function(event, d) {
          d3.select(this)
            .transition()
            .duration(150)
            .attr("opacity", 0.8);

          // Create tooltip group
          const tooltip = g.append("g")
            .attr("class", "tooltip")
            .attr("transform", `translate(${x(d.timeString) + x.bandwidth()/2}, ${y(d.count) - 10})`);

          // Add tooltip background
          tooltip.append("rect")
            .attr("x", -35)
            .attr("y", -20)
            .attr("width", 70)
            .attr("height", 20)
            .attr("fill", "white")
            .attr("stroke", "#e2e8f0")
            .attr("stroke-width", 1)
            .attr("rx", 4)
            .style("filter", "drop-shadow(0 1px 2px rgba(0,0,0,0.1))");

          // Add tooltip text
          tooltip.append("text")
            .attr("text-anchor", "middle")
            .attr("y", -5)
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .style("fill", "#1e293b")
            .text(`${d.count} HR${d.count !== 1 ? 's' : ''}`);
        })
        .on("mouseout", function() {
          d3.select(this)
            .transition()
            .duration(150)
            .attr("opacity", 1);
          g.selectAll(".tooltip").remove();
        });

    // Add X axis
    g.append("g")
      .attr("transform", `translate(0,${histHeight})`)
      .call(d3.axisBottom(x)
        .tickValues(playerData.timeData
          .filter((_, i) => i % 4 === 0)
          .map(d => d.timeString)))
      .selectAll("text")
        .style("text-anchor", "end")
        .style("font-size", "11px")
        .style("fill", "#64748b")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)");

    // Add Y axis
    g.append("g")
      .call(d3.axisLeft(y)
        .ticks(5))
      .selectAll("text")
        .style("font-size", "11px")
        .style("fill", "#64748b");

    // Add title
    g.append("text")
      .attr("x", histWidth / 2)
      .attr("y", -margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .style("fill", "#1e293b")
      .text(`${playerData.name}'s Home Runs by Time of Day`);

    // Add axes labels
    g.append("text")
      .attr("x", histWidth / 2)
      .attr("y", histHeight + margin.bottom - 5)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("fill", "#64748b")
      .text("Time of Day");

    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -histHeight / 2)
      .attr("y", -margin.left + 12)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("fill", "#64748b")
      .text("Number of Home Runs");
  }

  return mainDiv.node();
}


function _22(d3,playerHomeRuns,getPlayerImageUrl)
{
  const width = 1200;
  const height = 600;
  
  // Color scheme for bars
  const timeColorScale = d3.scaleLinear()
    .domain([0, 24])
    .range(['#173F5F', '#20639B', '#3CAEA3', '#F6D55C', '#ED553B', '#173F5F'])
    .interpolate(d3.interpolateHcl);
  
  // Create main container
  const mainDiv = d3.create("div")
    .style("width", `${width}px`)
    .style("height", `${height}px`)
    .style("margin", "0 auto")
    .style("position", "relative")
    .style("background", "#f8fafc")
    .style("border-radius", "12px")
    .style("padding", "20px")
    .style("box-shadow", "0 4px 6px -1px rgba(0, 0, 0, 0.1)");

  // Create SVG container for histogram
  const svgContainer = mainDiv.append("div")
    .style("position", "absolute")
    .style("top", "0")
    .style("left", "0")
    .style("width", "100%")
    .style("height", "100%")
    .style("background", "rgba(15, 23, 42, 0.9)")
    .style("backdrop-filter", "blur(4px)")
    .style("display", "none")
    .style("justify-content", "center")
    .style("align-items", "center")
    .style("z-index", "1000")
    .on("click", function(event) {
      if (event.target === this) {
        hideHistogram();
      }
    });

  const histogramSvg = svgContainer.append("svg")
    .attr("width", 900)
    .attr("height", 400)
    .style("background", "white")
    .style("border-radius", "12px")
    .style("box-shadow", "0 25px 50px -12px rgba(0, 0, 0, 0.25)");

  const closeButton = svgContainer.append("button")
    .style("position", "absolute")
    .style("right", "20px")
    .style("top", "20px")
    .style("background", "white")
    .style("border", "2px solid #e2e8f0")
    .style("border-radius", "50%")
    .style("width", "36px")
    .style("height", "36px")
    .style("cursor", "pointer")
    .style("font-size", "20px")
    .style("display", "flex")
    .style("align-items", "center")
    .style("justify-content", "center")
    .style("color", "#64748b")
    .style("transition", "all 0.2s")
    .text("×")
    .on("click", hideHistogram)
    .on("mouseover", function() {
      d3.select(this)
        .style("background", "#f1f5f9")
        .style("color", "#0f172a");
    })
    .on("mouseout", function() {
      d3.select(this)
        .style("background", "white")
        .style("color", "#64748b");
    });

  function hideHistogram() {
    svgContainer.transition()
      .duration(300)
      .style("opacity", 0)
      .on("end", function() {
        svgContainer.style("display", "none");
      });
  }

  function showHistogram(playerData) {
    createHistogram(playerData);
    svgContainer.style("display", "flex")
      .style("opacity", 0)
      .transition()
      .duration(300)
      .style("opacity", 1);
  }

  function createHistogram(playerData) {
    histogramSvg.html("");

    const margin = {top: 40, right: 30, bottom: 60, left: 50};
    const histWidth = 900 - margin.left - margin.right;
    const histHeight = 400 - margin.top - margin.bottom;

    const g = histogramSvg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X scale
    const x = d3.scaleBand()
      .domain(playerData.timeData.map(d => d.timeString))
      .range([0, histWidth])
      .padding(0.2);

    // Y scale
    const y = d3.scaleLinear()
      .domain([0, Math.max(1, d3.max(playerData.timeData, d => d.count))])
      .nice()
      .range([histHeight, 0]);

    // Add subtle grid lines
    g.append("g")
      .attr("class", "grid")
      .attr("opacity", 0.1)
      .call(d3.axisLeft(y)
        .ticks(5)
        .tickSize(-histWidth)
      );

    // Add bars
    g.selectAll("rect")
      .data(playerData.timeData)
      .enter()
      .append("rect")
        .attr("x", d => x(d.timeString))
        .attr("y", d => y(d.count))
        .attr("width", x.bandwidth())
        .attr("height", d => histHeight - y(d.count))
        .attr("fill", (d, i) => timeColorScale(i / 2))
        .attr("rx", 4)
        .style("filter", "drop-shadow(0 2px 2px rgba(0,0,0,0.1))")
        .on("mouseover", function(event, d) {
          d3.select(this)
            .transition()
            .duration(150)
            .attr("opacity", 0.8);

          const tooltip = g.append("g")
            .attr("class", "tooltip")
            .attr("transform", `translate(${x(d.timeString) + x.bandwidth()/2}, ${y(d.count) - 10})`);

          tooltip.append("rect")
            .attr("x", -35)
            .attr("y", -20)
            .attr("width", 70)
            .attr("height", 20)
            .attr("fill", "white")
            .attr("stroke", "#e2e8f0")
            .attr("stroke-width", 1)
            .attr("rx", 4)
            .style("filter", "drop-shadow(0 1px 2px rgba(0,0,0,0.1))");

          tooltip.append("text")
            .attr("text-anchor", "middle")
            .attr("y", -5)
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .style("fill", "#1e293b")
            .text(`${d.count} HR${d.count !== 1 ? 's' : ''}`);
        })
        .on("mouseout", function() {
          d3.select(this)
            .transition()
            .duration(150)
            .attr("opacity", 1);
          g.selectAll(".tooltip").remove();
        });

    // Add axes
    g.append("g")
      .attr("transform", `translate(0,${histHeight})`)
      .call(d3.axisBottom(x)
        .tickValues(playerData.timeData
          .filter((_, i) => i % 4 === 0)
          .map(d => d.timeString)))
      .selectAll("text")
        .style("text-anchor", "end")
        .style("font-size", "11px")
        .style("fill", "#64748b")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)");

    g.append("g")
      .call(d3.axisLeft(y)
        .ticks(5))
      .selectAll("text")
        .style("font-size", "11px")
        .style("fill", "#64748b");

    // Add title and labels
    g.append("text")
      .attr("x", histWidth / 2)
      .attr("y", -margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .style("fill", "#1e293b")
      .text(`${playerData.name}'s Home Runs by Time of Day`);

    g.append("text")
      .attr("x", histWidth / 2)
      .attr("y", histHeight + margin.bottom - 5)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("fill", "#64748b")
      .text("Time of Day");

    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -histHeight / 2)
      .attr("y", -margin.left + 12)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("fill", "#64748b")
      .text("Number of Home Runs");
  }

  mainDiv.append("h2")
    .style("text-align", "center")
    .style("margin", "0 0 20px 0")
    .style("color", "#1e293b")
    .style("font-size", "24px")
    .text("MLB Home Run Leaders");

  // Create container for rows
  const container = mainDiv.append("div")
    .style("height", "calc(100% - 60px)")
    .style("position", "relative")
    .style("display", "flex")
    .style("flex-direction", "column")
    .style("gap", "4px");  // Vertical gap between rows

  // Calculate dimensions for each cell
  const cellWidth = width / 5.2;  // Slightly more than 5 to account for gaps
  const cellHeight = cellWidth * 1.5;  // Maintain 426:640 aspect ratio
  
  // Process and sort players
  const sortedPlayers = Array.from(playerHomeRuns.entries())
    .map(([name, data]) => ({
      name: name,
      count: data.count,
      timeData: data.timeData
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 15);

  // Create rows
  const numRows = 3;
  const numCols = 5;
  
  for (let row = 0; row < numRows; row++) {
    const rowDiv = container.append("div")
      .style("display", "flex")
      .style("justify-content", "flex-start")  // Align cells to start
      .style("gap", "4px")  // Horizontal gap between cells
      .style("height", `${cellHeight}px`);

    // Add cells to each row
    for (let col = 0; col < numCols; col++) {
      const playerIndex = row * numCols + col;
      if (playerIndex >= sortedPlayers.length) break;
      
      const player = sortedPlayers[playerIndex];
      
      const cellWrapper = rowDiv.append("div")
        .style("width", `${cellWidth}px`)
        .style("height", "100%")
        .style("position", "relative");

      const cell = cellWrapper.append("div")
        .style("position", "absolute")
        .style("top", "0")
        .style("left", "0")
        .style("width", "100%")
        .style("height", "100%")
        .style("background", "white")
        .style("border", "1px solid #e2e8f0")
        .style("border-radius", "8px")
        .style("display", "flex")
        .style("flex-direction", "column")
        .style("justify-content", "flex-end")
        .style("cursor", "pointer")
        .style("transition", "all 0.3s")
        .style("overflow", "hidden");

      // Load and set the background image
      getPlayerImageUrl(player).then(imageUrl => {
        if (imageUrl) {
          cell.style("background-image", `url(${imageUrl})`)
              .style("background-size", "cover")
              .style("background-position", "center")
              .style("background-repeat", "no-repeat");
        }
      });

      // Add hover effects
      cell.on("mouseover", function() {
        d3.select(this)
          .style("transform", "translateY(-2px)")
          .style("box-shadow", "0 8px 16px -6px rgba(0, 0, 0, 0.15)");
      })
      .on("mouseout", function() {
        d3.select(this)
          .style("transform", "translateY(0)")
          .style("box-shadow", "0 1px 3px 0 rgba(0, 0, 0, 0.1)");
      })
      .on("click", function() {
        showHistogram(player);
      });

      // Add gradient overlay
      cell.append("div")
        .style("position", "absolute")
        .style("left", "0")
        .style("right", "0")
        .style("bottom", "0")
        .style("height", "40%")
        .style("background", "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%)")
        .style("pointer-events", "none");

      // Content container for text
      const content = cell.append("div")
        .style("position", "relative")
        .style("z-index", "1")
        .style("padding", "6px")
        .style("width", "100%")
        .style("text-align", "center");

      // Rank circle
      content.append("div")
        .style("background", `${playerIndex < 3 ? "rgba(254, 243, 199, 0.9)" : "rgba(241, 245, 249, 0.9)"}`)
        .style("color", `${playerIndex < 3 ? "#92400e" : "#64748b"}`)
        .style("border-radius", "9999px")
        .style("width", "18px")
        .style("height", "18px")
        .style("display", "flex")
        .style("align-items", "center")
        .style("justify-content", "center")
        .style("font-size", "10px")
        .style("font-weight", "bold")
        .style("margin", "0 auto 3px auto")
        .text(playerIndex + 1);

      // Player name
      content.append("div")
        .style("font-weight", "bold")
        .style("font-size", "11px")
        .style("margin-bottom", "2px")
        .style("color", "white")
        .style("text-shadow", "0 1px 2px rgba(0,0,0,0.8)")
        .text(player.name);

      // Home run count
      content.append("div")
        .style("color", "rgba(255,255,255,0.9)")
        .style("font-size", "10px")
        .style("font-weight", "500")
        .style("text-shadow", "0 1px 2px rgba(0,0,0,0.8)")
        .text(`${player.count} HRs`);
    }
  }
  

  return mainDiv.node();
}


function _23(d3,FileAttachment,playerHomeRuns)
{
  const width = 1000;
  const height = 800;
  
  // Color scheme for bars
  const timeColorScale = d3.scaleLinear()
    .domain([0, 24])
    .range(['#173F5F', '#20639B', '#3CAEA3', '#F6D55C', '#ED553B', '#173F5F'])
    .interpolate(d3.interpolateHcl);
  
  // Create image attachments map
  const imageAttachments = new Map([
    ["Mark Trumbo", FileAttachment("Mark Trumbo.jpeg")],
    ["Nelson Cruz", FileAttachment("Nelson Cruz.jpeg")],
    ["Edwin Encarnacion", FileAttachment("Edwin Encarnacion.jpeg")],
    ["Khris Davis", FileAttachment("Khris Davis.jpeg")],
    ["James Dozier", FileAttachment("James Dozier.jpeg")],
    ["Nolan Arenado", FileAttachment("Nolan Arenado.jpeg")],
    ["Vernon Carter", FileAttachment("Vernon Carter.jpeg")],
    ["Todd Frazier", FileAttachment("Todd Frazier.jpeg")],
    ["Kristopher Bryant", FileAttachment("Kristopher Bryant.jpeg")],
    ["Robinson Cano", FileAttachment("Robinson Cano.jpeg")],
    ["Christopher Davis", FileAttachment("Christopher Davis.jpeg")],
    ["David Ortiz", FileAttachment("David Ortiz.jpeg")],
    ["Jose Cabrera", FileAttachment("Jose Cabrera.jpeg")],
    ["Joshua Donaldson", FileAttachment("Joshua Donaldson.jpeg")],
    ["Manuel Machado", FileAttachment("Manuel Machado.jpeg")],
    ["Evan Longoria", FileAttachment("Evan Longoria.jpeg")],
    ["Carlos Santana", FileAttachment("Carlos Santana.jpeg")],
    ["Matthew Kemp", FileAttachment("Matthew Kemp.jpeg")],
    ["Frederick Freeman", FileAttachment("Frederick Freeman.jpeg")],
    ["Michael Napoli", FileAttachment("Michael Napoli.jpeg")]
  ]);

  // Create main container
  const mainDiv = d3.create("div")
    .style("width", `${width}px`)
    .style("height", `${height}px`)
    .style("margin", "0 auto")
    .style("position", "relative")
    .style("background", "#f8fafc")
    .style("border-radius", "12px")
    .style("padding", "20px")
    .style("box-shadow", "0 4px 6px -1px rgba(0, 0, 0, 0.1)");

  mainDiv.append("h2")
    .style("text-align", "center")
    .style("margin", "0 0 20px 0")
    .style("color", "#1e293b")
    .style("font-size", "24px")
    .text("MLB Home Run Leaders");

  const grid = mainDiv.append("div")
    .style("display", "grid")
    .style("grid-template-columns", "repeat(5, 1fr)")
    .style("grid-template-rows", "repeat(4, 1fr)")
    .style("gap", "20px")
    .style("padding", "15px")
    .style("height", "calc(100% - 60px)")
    .style("box-sizing", "border-box");

  // Function to get the image URL from FileAttachment
  async function getPlayerImageUrl(player) {
    try {
      const attachment = imageAttachments.get(player.name);
      if (attachment) {
        const imageFile = await attachment.url();
        return imageFile;
      }
      return null;
    } catch (error) {
      console.error(`Error loading image for ${player.name}:`, error);
      return null;
    }
  }

  // Process and sort players
  const sortedPlayers = Array.from(playerHomeRuns.entries())
    .map(([name, data]) => ({
      name: name,
      count: data.count,
      timeData: data.timeData
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20);

  // Create grid cells
  sortedPlayers.forEach((player, i) => {
    const cell = grid.append("div")
      .style("background", "white")
      .style("border", "1px solid #e2e8f0")
      .style("border-radius", "12px")
      .style("display", "flex")
      .style("flex-direction", "column")
      .style("justify-content", "center")
      .style("align-items", "center")
      .style("padding", "16px")
      .style("cursor", "pointer")
      .style("transition", "all 0.3s")
      .style("min-height", "110px")
      .style("box-shadow", "0 1px 3px 0 rgba(0, 0, 0, 0.1)")
      .style("position", "relative")
      .style("overflow", "hidden");

    // Load and set the background image
    getPlayerImageUrl(player).then(imageUrl => {
      if (imageUrl) {
        cell.style("background-image", `url(${imageUrl})`)
            .style("background-size", "cover")
            .style("background-position", "center 20%")
            .style("background-repeat", "no-repeat");
      }
    });

    // Add overlay
    cell.append("div")
      .style("position", "absolute")
      .style("top", "0")
      .style("left", "0")
      .style("right", "0")
      .style("bottom", "0")
      .style("background", "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%)")
      .style("border-radius", "12px");

    // Content container
    const content = cell.append("div")
      .style("position", "relative")
      .style("z-index", "1")
      .style("display", "flex")
      .style("flex-direction", "column")
      .style("align-items", "center");

    // Add hover effects
    cell.on("mouseover", function() {
      d3.select(this)
        .style("transform", "translateY(-4px)")
        .style("box-shadow", "0 12px 24px -8px rgba(0, 0, 0, 0.15)");
    })
    .on("mouseout", function() {
      d3.select(this)
        .style("transform", "translateY(0)")
        .style("box-shadow", "0 1px 3px 0 rgba(0, 0, 0, 0.1)");
    })
    .on("click", function() {
      showHistogram(player);
    });

    // Rank circle
    content.append("div")
      .style("background", `${i < 3 ? "rgba(254, 243, 199, 0.9)" : "rgba(241, 245, 249, 0.9)"}`)
      .style("color", `${i < 3 ? "#92400e" : "#64748b"}`)
      .style("border-radius", "9999px")
      .style("width", "24px")
      .style("height", "24px")
      .style("display", "flex")
      .style("align-items", "center")
      .style("justify-content", "center")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .style("margin-bottom", "8px")
      .text(i + 1);

    // Player name
    content.append("div")
      .style("font-weight", "bold")
      .style("font-size", "16px")
      .style("text-align", "center")
      .style("margin-bottom", "8px")
      .style("color", "white")
      .style("text-shadow", "0 1px 2px rgba(0,0,0,0.8)")
      .text(player.name);

    // Home run count
    content.append("div")
      .style("color", "rgba(255,255,255,0.9)")
      .style("font-weight", "500")
      .style("text-shadow", "0 1px 2px rgba(0,0,0,0.8)")
      .text(`${player.count} HRs`);
  });

  // Function to hide histogram
  function hideHistogram() {
    svgContainer.transition()
      .duration(300)
      .style("opacity", 0)
      .on("end", function() {
        svgContainer.style("display", "none");
      });
  }

  function showHistogram(playerData) {
    createHistogram(playerData);
    svgContainer.style("display", "flex")
      .style("opacity", 0)
      .transition()
      .duration(300)
      .style("opacity", 1);
  }

  // Create SVG container
  const svgContainer = mainDiv.append("div")
    .style("position", "absolute")
    .style("top", "0")
    .style("left", "0")
    .style("width", "100%")
    .style("height", "100%")
    .style("background", "rgba(15, 23, 42, 0.9)")
    .style("backdrop-filter", "blur(4px)")
    .style("display", "none")
    .style("justify-content", "center")
    .style("align-items", "center")
    .on("click", function(event) {
      if (event.target === this) {
        hideHistogram();
      }
    });

  const histogramSvg = svgContainer.append("svg")
    .attr("width", 900)
    .attr("height", 400)
    .style("background", "white")
    .style("border-radius", "12px")
    .style("box-shadow", "0 25px 50px -12px rgba(0, 0, 0, 0.25)");

  const closeButton = svgContainer.append("button")
    .style("position", "absolute")
    .style("right", "20px")
    .style("top", "20px")
    .style("background", "white")
    .style("border", "2px solid #e2e8f0")
    .style("border-radius", "50%")
    .style("width", "36px")
    .style("height", "36px")
    .style("cursor", "pointer")
    .style("font-size", "20px")
    .style("display", "flex")
    .style("align-items", "center")
    .style("justify-content", "center")
    .style("color", "#64748b")
    .style("transition", "all 0.2s")
    .text("×")
    .on("click", hideHistogram)
    .on("mouseover", function() {
      d3.select(this)
        .style("background", "#f1f5f9")
        .style("color", "#0f172a");
    })
    .on("mouseout", function() {
      d3.select(this)
        .style("background", "white")
        .style("color", "#64748b");
    });

  function createHistogram(playerData) {
    histogramSvg.html("");

    const margin = {top: 40, right: 30, bottom: 60, left: 50};
    const histWidth = 900 - margin.left - margin.right;
    const histHeight = 400 - margin.top - margin.bottom;

    const g = histogramSvg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X scale
    const x = d3.scaleBand()
      .domain(playerData.timeData.map(d => d.timeString))
      .range([0, histWidth])
      .padding(0.2);

    // Y scale
    const y = d3.scaleLinear()
      .domain([0, Math.max(1, d3.max(playerData.timeData, d => d.count))])
      .nice()
      .range([histHeight, 0]);

    // Add subtle grid lines
    g.append("g")
      .attr("class", "grid")
      .attr("opacity", 0.1)
      .call(d3.axisLeft(y)
        .ticks(5)
        .tickSize(-histWidth)
      );

    // Add bars with enhanced styling
    g.selectAll("rect")
      .data(playerData.timeData)
      .enter()
      .append("rect")
        .attr("x", d => x(d.timeString))
        .attr("y", d => y(d.count))
        .attr("width", x.bandwidth())
        .attr("height", d => histHeight - y(d.count))
        .attr("fill", (d, i) => timeColorScale(i / 2))
        .attr("rx", 4)
        .style("filter", "drop-shadow(0 2px 2px rgba(0,0,0,0.1))")
        .on("mouseover", function(event, d) {
          d3.select(this)
            .transition()
            .duration(150)
            .attr("opacity", 0.8);

          // Create tooltip group
          const tooltip = g.append("g")
            .attr("class", "tooltip")
            .attr("transform", `translate(${x(d.timeString) + x.bandwidth()/2}, ${y(d.count) - 10})`);

          // Add white background rectangle
          tooltip.append("rect")
            .attr("x", -35)
            .attr("y", -20)
            .attr("width", 70)
            .attr("height", 20)
            .attr("fill", "white")
            .attr("stroke", "#e2e8f0")
            .attr("stroke-width", 1)
            .attr("rx", 4)
            .style("filter", "drop-shadow(0 1px 2px rgba(0,0,0,0.1))");

          // Add text
          tooltip.append("text")
            .attr("text-anchor", "middle")
            .attr("y", -5)
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .style("fill", "#1e293b")
            .text(`${d.count} HR${d.count !== 1 ? 's' : ''}`);
        })
        .on("mouseout", function() {
          d3.select(this)
            .transition()
            .duration(150)
            .attr("opacity", 1);
          g.selectAll(".tooltip").remove();
        });

    // Add X axis
    g.append("g")
      .attr("transform", `translate(0,${histHeight})`)
      .call(d3.axisBottom(x)
        .tickValues(playerData.timeData
          .filter((_, i) => i % 4 === 0)
          .map(d => d.timeString)))
      .selectAll("text")
        .style("text-anchor", "end")
        .style("font-size", "11px")
        .style("fill", "#64748b")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)");

    // Add Y axis
    g.append("g")
      .call(d3.axisLeft(y)
        .ticks(5))
      .selectAll("text")
        .style("font-size", "11px")
        .style("fill", "#64748b");

    // Add title
    g.append("text")
      .attr("x", histWidth / 2)
      .attr("y", -margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .style("fill", "#1e293b")
      .text(`${playerData.name}'s Home Runs by Time of Day`);

    // Add axes labels
    g.append("text")
      .attr("x", histWidth / 2)
      .attr("y", histHeight + margin.bottom - 5)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("fill", "#64748b")
      .text("Time of Day");

    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -histHeight / 2)
      .attr("y", -margin.left + 12)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("fill", "#64748b")
      .text("Number of Home Runs");
  }

  return mainDiv.node();
}


function _24(d3,data2)
{
  const width = 1000;
  const height = 800;
  
  // Color scheme for bars remains the same
  const timeColorScale = d3.scaleLinear()
    .domain([0, 24])
    .range(['#173F5F', '#20639B', '#3CAEA3', '#F6D55C', '#ED553B', '#173F5F'])
    .interpolate(d3.interpolateHcl);
  
  // Create main container with a nice background
  const mainDiv = d3.create("div")
    .style("width", `${width}px`)
    .style("height", `${height}px`)
    .style("margin", "0 auto")
    .style("position", "relative")
    .style("background", "#f8fafc")
    .style("border-radius", "12px")
    .style("padding", "20px")
    .style("box-shadow", "0 4px 6px -1px rgba(0, 0, 0, 0.1)");

  mainDiv.append("h2")
    .style("text-align", "center")
    .style("margin", "0 0 20px 0")
    .style("color", "#1e293b")
    .style("font-size", "24px")
    .text("MLB Home Run Leaders");

  // Process data for players and their home run times
  const playerHomeRuns = d3.rollup(data2,
    v => {
      const timeData = Array(48).fill(0).map((_, interval) => {
        const hour = Math.floor(interval / 2);
        const minute = (interval % 2) * 30;
        return {
          interval: interval,
          timeString: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
          count: 0
        };
      });

      v.forEach(hr => {
        try {
          if (hr && hr.localGameTime) {
            const timePart = hr.localGameTime.split(' ')[1];
            const [hours, minutes] = timePart.split(':').map(Number);
            const interval = hours * 2 + (minutes >= 30 ? 1 : 0);
            if (interval >= 0 && interval < 48) {
              timeData[interval].count++;
            }
          }
        } catch (error) {
          console.error("Error processing entry:", hr, error);
        }
      });

      return {
        count: v.length,
        name: v[0].hitterFullName,
        timeData: timeData
      };
    },
    d => d.hitterFullName
  );

  const top20Players = Array.from(playerHomeRuns, ([name, data]) => ({
    name: name,
    count: data.count,
    timeData: data.timeData
  }))
  .sort((a, b) => b.count - a.count)
  .slice(0, 20);

  const grid = mainDiv.append("div")
    .style("display", "grid")
    .style("grid-template-columns", "repeat(5, 1fr)")
    .style("grid-template-rows", "repeat(4, 1fr)")
    .style("gap", "20px")
    .style("padding", "15px")
    .style("height", "calc(100% - 60px)")
    .style("box-sizing", "border-box");

  // Function to hide the histogram
  function hideHistogram() {
    svgContainer.transition()
      .duration(300)
      .style("opacity", 0)
      .on("end", function() {
        svgContainer.style("display", "none");
      });
  }

  function showHistogram(playerData) {
    createHistogram(playerData);
    svgContainer.style("display", "flex")
      .style("opacity", 0)
      .transition()
      .duration(300)
      .style("opacity", 1);
  }

  // Create SVG container with improved styling
  const svgContainer = mainDiv.append("div")
    .style("position", "absolute")
    .style("top", "0")
    .style("left", "0")
    .style("width", "100%")
    .style("height", "100%")
    .style("background", "rgba(15, 23, 42, 0.9)")
    .style("backdrop-filter", "blur(4px)")
    .style("display", "none")
    .style("justify-content", "center")
    .style("align-items", "center")
    // Add click handler to the overlay
    .on("click", function(event) {
      // Only close if clicking the overlay itself, not its children
      if (event.target === this) {
        hideHistogram();
      }
    });

  const histogramSvg = svgContainer.append("svg")
    .attr("width", 900)
    .attr("height", 400)
    .style("background", "white")
    .style("border-radius", "12px")
    .style("box-shadow", "0 25px 50px -12px rgba(0, 0, 0, 0.25)");

  const closeButton = svgContainer.append("button")
    .style("position", "absolute")
    .style("right", "20px")
    .style("top", "20px")
    .style("background", "white")
    .style("border", "2px solid #e2e8f0")
    .style("border-radius", "50%")
    .style("width", "36px")
    .style("height", "36px")
    .style("cursor", "pointer")
    .style("font-size", "20px")
    .style("display", "flex")
    .style("align-items", "center")
    .style("justify-content", "center")
    .style("color", "#64748b")
    .style("transition", "all 0.2s")
    .text("×")
    // Add click handler to the close button
    .on("click", hideHistogram)
    .on("mouseover", function() {
      d3.select(this)
        .style("background", "#f1f5f9")
        .style("color", "#0f172a");
    })
    .on("mouseout", function() {
      d3.select(this)
        .style("background", "white")
        .style("color", "#64748b");
    });


  function createHistogram(playerData) {
    histogramSvg.html("");

    const margin = {top: 40, right: 30, bottom: 60, left: 50};
    const histWidth = 900 - margin.left - margin.right;
    const histHeight = 400 - margin.top - margin.bottom;

    const g = histogramSvg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X scale
    const x = d3.scaleBand()
      .domain(playerData.timeData.map(d => d.timeString))
      .range([0, histWidth])
      .padding(0.2);  // Increased padding for nicer bars

    // Y scale with minimum of 0
    const y = d3.scaleLinear()
      .domain([0, Math.max(1, d3.max(playerData.timeData, d => d.count))])
      .nice()
      .range([histHeight, 0]);

    // Add gradient defs
    const gradient = g.append("defs")
      .append("linearGradient")
      .attr("id", "bar-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#3b82f6");

    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#1d4ed8");

    // Add subtle grid lines
    g.append("g")
      .attr("class", "grid")
      .attr("opacity", 0.1)
      .call(d3.axisLeft(y)
        .ticks(5)
        .tickSize(-histWidth)
      );

    // Add bars with enhanced styling
    g.selectAll("rect")
      .data(playerData.timeData)
      .enter()
      .append("rect")
        .attr("x", d => x(d.timeString))
        .attr("y", d => y(d.count))
        .attr("width", x.bandwidth())
        .attr("height", d => histHeight - y(d.count))
        .attr("fill", (d, i) => timeColorScale(i / 2))  // Color based on time of day
        .attr("rx", 4)  // Rounded corners
        .style("filter", "drop-shadow(0 2px 2px rgba(0,0,0,0.1))")
        .on("mouseover", function(event, d) {
            d3.select(this)
            .transition()
            .duration(150)
            .attr("opacity", 0.8);
    
    // Create tooltip group
    const tooltip = g.append("g")
      .attr("class", "tooltip")
      .attr("transform", `translate(${x(d.timeString) + x.bandwidth()/2}, ${y(d.count) - 10})`);
    
    // Calculate text width for dynamic background sizing
    const tooltipText = `${d.count} HR${d.count !== 1 ? 's' : ''}`;
    
    // Add white background rectangle
    tooltip.append("rect")
      .attr("x", -35)  // Wider to accommodate text
      .attr("y", -20)
      .attr("width", 70)  // Wider box
      .attr("height", 20)
      .attr("fill", "white")
      .attr("stroke", "#e2e8f0")
      .attr("stroke-width", 1)
      .attr("rx", 4)  // Rounded corners
      .style("filter", "drop-shadow(0 1px 2px rgba(0,0,0,0.1))");
    
    // Add text on top of background
    tooltip.append("text")
      .attr("text-anchor", "middle")
      .attr("y", -5)
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .style("fill", "#1e293b")
      .text(tooltipText);
  })
  .on("mouseout", function() {
    d3.select(this)
      .transition()
      .duration(150)
      .attr("opacity", 1);
    g.selectAll(".tooltip").remove();
  });

    // Add X axis with styled text
    g.append("g")
      .attr("transform", `translate(0,${histHeight})`)
      .call(d3.axisBottom(x)
        .tickValues(playerData.timeData
          .filter((_, i) => i % 4 === 0)
          .map(d => d.timeString)))
      .selectAll("text")
        .style("text-anchor", "end")
        .style("font-size", "11px")
        .style("fill", "#64748b")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)");

    // Add Y axis with styled text
    g.append("g")
      .call(d3.axisLeft(y)
        .ticks(5))
      .selectAll("text")
        .style("font-size", "11px")
        .style("fill", "#64748b");

    // Add title with enhanced styling
    g.append("text")
      .attr("x", histWidth / 2)
      .attr("y", -margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .style("fill", "#1e293b")
      .text(`${playerData.name}'s Home Runs by Time of Day`);

    // Add styled axes labels
    g.append("text")
      .attr("x", histWidth / 2)
      .attr("y", histHeight + margin.bottom - 5)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("fill", "#64748b")
      .text("Time of Day");

    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -histHeight / 2)
      .attr("y", -margin.left + 12)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("fill", "#64748b")
      .text("Number of Home Runs");
  }

  // Create grid cells with enhanced styling
  top20Players.forEach((player, i) => {
    const cell = grid.append("div")
      .style("background", "white")
      .style("border", "1px solid #e2e8f0")
      .style("border-radius", "12px")
      .style("display", "flex")
      .style("flex-direction", "column")
      .style("justify-content", "center")
      .style("align-items", "center")
      .style("padding", "16px")
      .style("cursor", "pointer")
      .style("transition", "all 0.3s")
      .style("min-height", "110px")
      .style("box-shadow", "0 1px 3px 0 rgba(0, 0, 0, 0.1)")
      .on("mouseover", function() {
        d3.select(this)
          .style("transform", "translateY(-4px)")
          .style("box-shadow", "0 12px 24px -8px rgba(0, 0, 0, 0.15)");
      })
      .on("mouseout", function() {
        d3.select(this)
          .style("transform", "translateY(0)")
          .style("box-shadow", "0 1px 3px 0 rgba(0, 0, 0, 0.1)");
      })
      .on("click", function() {
        showHistogram(player);
      });

    // Rank circle
    cell.append("div")
      .style("background", `${i < 3 ? "#fef3c7" : "#f1f5f9"}`)
      .style("color", `${i < 3 ? "#92400e" : "#64748b"}`)
      .style("border-radius", "9999px")
      .style("width", "24px")
      .style("height", "24px")
      .style("display", "flex")
      .style("align-items", "center")
      .style("justify-content", "center")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .style("margin-bottom", "8px")
      .text(i + 1);

    cell.append("div")
      .style("font-weight", "bold")
      .style("font-size", "16px")
      .style("text-align", "center")
      .style("margin-bottom", "8px")
      .style("color", "#1e293b")
      .text(player.name);

    cell.append("div")
      .style("color", "#64748b")
      .style("font-weight", "500")
      .text(`${player.count} HRs`);
  });

  return mainDiv.node();
}


function _googleAllHits(__query,FileAttachment,invalidation){return(
__query(FileAttachment("google://all-hits.csv"),{from:{table:"google://all-hits"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _26(d3,alert)
{
  const rawData = [
            "0-0", "1-0", "0-1", "2-0", "1-1", "0-2", 
            "3-0", "2-1", "1-2", "2-2", "3-2"
        ];

        // Function to build the tree hierarchy
        function buildHierarchy(data) {
            const nodeMap = new Map();
            
            // First, create nodes
            data.forEach(nodeStr => {
                const [x, y] = nodeStr.split('-').map(Number);
                const key = nodeStr;
                
                if (!nodeMap.has(key)) {
                    nodeMap.set(key, {
                        name: key,
                        x: x,
                        y: y,
                        children: []
                    });
                }
            });

            // Then, connect nodes
            const nodes = Array.from(nodeMap.values());
            
            // Create root
            const root = nodeMap.get('0-0');
            
            // Build connections
            nodes.forEach(node => {
                if (node.name !== '0-0') {
                    const possibleParents = nodes.filter(p => 
                        p.x + 1 === node.x && 
                        p.y === node.y
                    );
                    
                    if (possibleParents.length > 0) {
                        const parent = possibleParents[0];
                        if (parent) {
                            parent.children.push(node);
                        }
                    }
                }
            });

            return root;
        }

        // Create the tree layout
        const svg = d3.select("svg");
        const width = +svg.attr("width");
        const height = +svg.attr("height");

        const treeLayout = d3.tree().size([width - 100, height - 100]);

        // Build the hierarchy
        const rootData = buildHierarchy(rawData);
        const root = d3.hierarchy(rootData);

        // Create the tree
        treeLayout(root);

        // Create links
        const link = svg.selectAll(".link")
            .data(root.links())
            .enter().append("path")
            .attr("class", "link")
            .attr("d", d3.linkVertical()
                .x(d => d.x)
                .y(d => d.y)
            );

        // Create nodes
        const node = svg.selectAll(".node")
            .data(root.descendants())
            .enter().append("g")
            .attr("class", "node")
            .attr("transform", d => `translate(${d.x},${d.y})`)
            .on("click", function(event, d) {
                alert(`Clicked node: ${d.data.name}`);
            });

        // Add circles to nodes
        node.append("circle")
            .attr("r", 10);

        // Add text labels to nodes
        node.append("text")
            .attr("dy", -15)
            .attr("text-anchor", "middle")
            .text(d => d.data.name);
}


function _27(d3)
{
  const chart = () => {
      const width = 1000;
    const height = 600;
    const nodeRadius = 22;
    const margin = {top: 50, right: 60, bottom: 50, left: 60};
    const levelHeight = (height - margin.top - margin.bottom) / 5;
    
    
    // Nodes and edges data remain the same
    const nodes = [
      {id: "0-0", level: 0, pos: 0.5},
      {id: "1-0", level: 1, pos: 0.35},
      {id: "0-1", level: 1, pos: 0.65},
      {id: "2-0", level: 2, pos: 0.25},
      {id: "1-1", level: 2, pos: 0.5},
      {id: "0-2", level: 2, pos: 0.75},
      {id: "3-0", level: 3, pos: 0.15},
      {id: "2-1", level: 3, pos: 0.38},
      {id: "1-2", level: 3, pos: 0.62},
      {id: "OUT", level: 3, pos: 0.85},
      {id: "BB", level: 4, pos: 0.25},
      {id: "3-1", level: 4, pos: 0.5},
      {id: "2-2", level: 4, pos: 0.75},
      {id: "3-2", level: 5, pos: 0.5}
    ];

    const edges = [
      {source: "0-0", target: "1-0", type: "ball"},
      {source: "0-0", target: "0-1", type: "strike"},
      {source: "1-0", target: "2-0", type: "ball"},
      {source: "1-0", target: "1-1", type: "strike"},
      {source: "0-1", target: "1-1", type: "ball"},
      {source: "0-1", target: "0-2", type: "strike"},
      {source: "2-0", target: "3-0", type: "ball"},
      {source: "2-0", target: "2-1", type: "strike"},
      {source: "1-1", target: "2-1", type: "ball"},
      {source: "1-1", target: "1-2", type: "strike"},
      {source: "0-2", target: "1-2", type: "ball"},
      {source: "0-2", target: "OUT", type: "strike"},
      {source: "3-0", target: "BB", type: "ball"},
      {source: "3-0", target: "3-1", type: "strike"},
      {source: "2-1", target: "3-1", type: "ball"},
      {source: "2-1", target: "2-2", type: "strike"},
      {source: "1-2", target: "2-2", type: "ball"},
      {source: "1-2", target: "OUT", type: "strike"},
      {source: "3-1", target: "BB", type: "ball"},
      {source: "3-1", target: "3-2", type: "strike"},
      {source: "2-2", target: "3-2", type: "ball"},
      {source: "2-2", target: "OUT", type: "strike"},
      {source: "3-2", target: "BB", type: "ball"},
      {source: "3-2", target: "OUT", type: "strike"}
    ];

  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "background: linear-gradient(to bottom, #f8f9fa, #ffffff)");

    // Adjusted arrow markers to be smaller and more precise
    svg.append("defs").selectAll("marker")
      .data(["ball", "strike"])
      .join("marker")
        .attr("id", d => `arrow-${d}`)
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", nodeRadius + 10)  // Adjusted to stop at circle edge
        .attr("refY", 0)
        .attr("markerWidth", 4)
        .attr("markerHeight", 4)
        .attr("orient", "auto")
      .append("path")
        .attr("fill", d => d === "ball" ? "#38a169" : "#e53e3e")
        .attr("d", "M0,-5L10,0L0,5");

    const xScale = d3.scaleLinear()
      .domain([0, 1])
      .range([margin.left, width - margin.right]);

    // Modified path generation to calculate the exact end points
    svg.append("g")
      .selectAll("path")
      .data(edges)
      .join("path")
      .attr("d", d => {
        const source = nodes.find(n => n.id === d.source);
        const target = nodes.find(n => n.id === d.target);
        const sourceX = xScale(source.pos);
        const sourceY = margin.top + source.level * levelHeight;
        const targetX = xScale(target.pos);
        const targetY = margin.top + target.level * levelHeight;
        const midY = (sourceY + targetY) / 2;
        const curveIntensity = 45;
        
        return `M ${sourceX},${sourceY}
                C ${sourceX},${midY - curveIntensity}
                  ${targetX},${midY - curveIntensity}
                  ${targetX},${targetY}`;
      })
      .attr("fill", "none")
      .attr("stroke", d => d.type === "ball" ? "#38a169" : "#e53e3e")
      .attr("stroke-width", 2)
      .attr("marker-end", d => `url(#arrow-${d.type})`);

    // Drop shadow definition
    svg.append("defs")
      .append("filter")
      .attr("id", "drop-shadow")
      .append("feDropShadow")
      .attr("dx", "0")
      .attr("dy", "1")
      .attr("stdDeviation", "2")
      .attr("flood-opacity", "0.2");

    // Node groups
    const nodeGroups = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .attr("transform", d => `translate(${xScale(d.pos)},${margin.top + d.level * levelHeight})`);

    // Node circles
    nodeGroups.append("circle")
      .attr("r", nodeRadius)
      .attr("fill", d => {
        if (d.id === "BB") return "#9ae6b4";
        if (d.id === "OUT") return "#fc8181";
        if (d.id === "0-0") return "#bee3f8";
        return "#ffffff";
      })
      .attr("stroke", d => {
        if (d.id === "BB") return "#38a169";
        if (d.id === "OUT") return "#e53e3e";
        if (d.id === "0-0") return "#3182ce";
        return "#718096";
      })
      .attr("stroke-width", 2)
      .attr("filter", "url(#drop-shadow)");

    // Node labels
    nodeGroups.append("text")
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .attr("font-size", "13px")
      .attr("font-family", "system-ui, -apple-system, sans-serif")
      .attr("font-weight", "600")
      .attr("fill", "#2d3748")
      .text(d => d.id);

    // Ball/Strike labels
    edges.filter(d => d.source === "0-0").forEach(d => {
      const source = nodes.find(n => n.id === d.source);
      const target = nodes.find(n => n.id === d.target);
      
      svg.append("text")
        .attr("x", (xScale(source.pos) + xScale(target.pos)) / 2)
        .attr("y", (margin.top + margin.top + levelHeight) / 2 - 12)
        .attr("text-anchor", "middle")
        .attr("font-family", "system-ui, -apple-system, sans-serif")
        .attr("font-size", "12px")
        .attr("font-weight", "600")
        .attr("fill", d.type === "ball" ? "#38a169" : "#e53e3e")
        .text(d.type === "ball" ? "Ball" : "Strike");
    });

    return svg.node();
  }

  return chart();
}


export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["bq-results-20241204-014228-1733276625218.csv", {url: new URL("./files/9034b6db770d4ebf25bebd0b4139b02ec618f8c28ed931b4d8834f6a1fce927691f6fdf4a6f75730c2beb99800f64d567b3c2c7c41a789b1b2fe56b46ab0adfc.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["Team_venue_info.csv", {url: new URL("./files/bf543d83922ea9c677ca8eab38d845f15a38442d0df622c2d4282939ddaf11bcb0c029a60fe70d9a9cd48a06044b171441ffad6f5a2421b761eafb27896f7ce7.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["Jose Cabrera.jpeg", {url: new URL("./files/06a69050e2d7a11dc4ca61f7a862d34ca49424091c6a12927ce2587d9e40413860ee450d33b37ec733ecc51e2a16c02d387d5e25e507f33153c3938565b56859.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["Manuel Machado.jpeg", {url: new URL("./files/76c32d8aac037b150c4d4e3ecb62143d478f35abfa6d2bb2fad2eb20c057df37eeed426165565c3599e51af7110c158e46a3e8b3fa661b7617dc8c6c2d9db215.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["Edwin Encarnacion.jpeg", {url: new URL("./files/d3fb6351646845db110957752eeafd3060f558875d348ac677f7a6194485bfb1237f5b0e3269484104ae1db4348fa0812a799e873b75e4763154199bafd2aa52.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["Nelson Cruz.jpeg", {url: new URL("./files/23bf4a96fba4c72d1fc2684decc9ada3ef291f7d6f48dd50dfe8ec82f31107a11e3855a28eccba2d59b0b15b2f3692c60df83f7b67c98bfff64a36adce5721e7.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["Christopher Davis.jpeg", {url: new URL("./files/4b0ca987d65016fb3945a5f39b5c883e958d0a8d1a0eff0be65bc569c421093e460727fc03e62c419a1de3ae651fa39d5d37ef50deade96fde0e053e4b35619e.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["Khris Davis.jpeg", {url: new URL("./files/be2eff44044f2dcf1662e63ff96997bd48524b783621e24cfa6927e211c0a851782c3cdd868c10c5480de10514e970eb48babfa3e21f4f8214cb56aa5a694078.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["Kristopher Bryant.jpeg", {url: new URL("./files/97281d6af244afcbd9e97c270ce85d9d01ab940b86bbde210184629fd1ac7d6f82d4329cce22bbd142a3440fad86df70308c0adc9004f1444ba4c543b8970e8b.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["Matthew Kemp.jpeg", {url: new URL("./files/92be10d224613cb236d5c48d2a73ea2d4c2dcae0c197f77aadac54fac5d59dff2f48d569cd9fb95eb731de3b782fa71f3426a349be08ce6078fd5fb5eae2e8fe.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["David Ortiz.jpeg", {url: new URL("./files/5e144030c6b224d0c21c926033aaba376b1983fcb7c22c83e0f7000ced0a0763c00ed91a64799bb386df21dfaeffc0b12621687662d538795577a4a73f13b9fc.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["Carlos Santana.jpeg", {url: new URL("./files/46db830f77a7ff74b52023ae8bca8dcc352b6c0d5f73d9bdf3e32917cf7dd1dfe42414188bb47871fdbf9768e07aea07dafcd8b5919bbbe0114af81a8f070cc6.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["Joshua Donaldson.jpeg", {url: new URL("./files/424c9d2cbe61e6b753e5af5ea3f5ea82f05f436e901bd438ab6a6b5d693a88bc72fa0aeb992e7c41abee9f22f1bf0f7f2ad2c32c099823f3d0479dbd4b99371f.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["Frederick Freeman.jpeg", {url: new URL("./files/7f65af69378e39194be3fd314c5904e70577943e0e8dcc149eb0348fe371caa7ede10611d168d8d5cf55a4007767f47d44f7f7db9a4de36d495aa61b81439270.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["Todd Frazier.jpeg", {url: new URL("./files/39835c04c76b1321d176a06f758623988fa4474762ede2138378ac747275b304f5c34f63435392db6b68afc50a44aeaa6bcf11f3971fe59d508bc1a022555e20.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["Michael Napoli.jpeg", {url: new URL("./files/78f9579c03a2c04b2ad249cac77cf366da2d073b20481e1ad9bf61d9d442ec65ea9d9792b3306feaa2b28ed8afd5b4f6276208a320aa4454427eb01d35e11493.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["Mark Trumbo.jpeg", {url: new URL("./files/0fddca1b96805883db71935b5876bcfde459008f2bbb2aee372351583d2db5c11ef6f70ce632b0573ab401411fb58f18b554279e2d92f251d044eab0bcd62e44.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["Vernon Carter.jpeg", {url: new URL("./files/65b2740a135abd951d138373387123f464bba638c0b1217e76202008370f1d144766d30634b14abb942579cd132aceeb9e5432e709195fc682d534517a6aab64.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["Nolan Arenado.jpeg", {url: new URL("./files/d24466c3abf7b11f363d1025becf9f525c6f3c04d45bea3c80da93b73e40396df2d21d2905bad890449f744edee50ac7f498f7a632045740096dc0ef4d683892.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["James Dozier.jpeg", {url: new URL("./files/15d7dc242395e360f745b595c6f33935fcf3f112d5aec304b1a31269bf7068c053e1b3bff6ba39570f6eebc33b114737524ec443365ea354cc2fcdced075c405.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["Evan Longoria.jpeg", {url: new URL("./files/655aeca6874063a065b7e9b1688ad53c5b131bba82375d738e936450046cb080023493bf3941de792b6c5d45c8e75dfbfef7b277485b87a5158879e1d3cfbe46.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["Robinson Cano.jpeg", {url: new URL("./files/097e73d1137db6d44ce81409a5669c3cf3f1924e0c81cfc4bb0df50c962fd6d896b65af3370233b63a65a57f035606848c2921b118969e77b5946caa7a7237b8.jpeg", import.meta.url), mimeType: "image/jpeg", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("bqResults202412040142281733276625218")).define("bqResults202412040142281733276625218", ["__query","FileAttachment","invalidation"], _bqResults202412040142281733276625218);
  main.variable(observer("convertTZ")).define("convertTZ", _convertTZ);
  main.variable(observer("baseball_data")).define("baseball_data", ["FileAttachment"], _baseball_data);
  main.variable(observer("venue_data")).define("venue_data", ["FileAttachment"], _venue_data);
  main.variable(observer("team_venue_info")).define("team_venue_info", ["__query","FileAttachment","invalidation"], _team_venue_info);
  main.variable(observer()).define(_8);
  main.variable(observer("convertToLocalTime")).define("convertToLocalTime", ["venue_data"], _convertToLocalTime);
  main.variable(observer("data")).define("data", ["baseball_data","convertToLocalTime"], _data);
  main.variable(observer()).define(["__query","data","invalidation"], _11);
  main.variable(observer()).define(["venue_data"], _12);
  main.variable(observer("convertToLocalTime2")).define("convertToLocalTime2", ["venue_data"], _convertToLocalTime2);
  main.variable(observer("data1")).define("data1", ["baseball_data","convertToLocalTime2"], _data1);
  main.variable(observer()).define(["__query","data1","invalidation"], _15);
  main.variable(observer("data2")).define("data2", ["venue_data","convertToLocalTime2","baseball_data"], _data2);
  main.variable(observer()).define(["__query","data2","invalidation"], _17);
  main.variable(observer("topojson")).define("topojson", ["require"], _topojson);
  main.variable(observer("geography")).define("geography", ["topojson"], _geography);
  main.variable(observer()).define(["d3","data2","venue_data","geography"], _20);
  main.variable(observer()).define(["d3","data2","FileAttachment"], _21);
  main.variable(observer()).define(["d3","playerHomeRuns","getPlayerImageUrl"], _22);
  main.variable(observer()).define(["d3","FileAttachment","playerHomeRuns"], _23);
  main.variable(observer()).define(["d3","data2"], _24);
  main.variable(observer("googleAllHits")).define("googleAllHits", ["__query","FileAttachment","invalidation"], _googleAllHits);
  main.variable(observer()).define(["d3","alert"], _26);
  main.variable(observer()).define(["d3"], _27);
  return main;
}
