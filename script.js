/******w**************
    
    Assignment 4 Javascript
    Name: Khoi Dong 
    Date: Oct 10, 2023
    Description: Ajax, Json and Open Data

*********************/

function getOrderBy() {
    let orderByDoc = document.getElementById("orderBy").value;

    let orderBy = "";
    if (orderByDoc.includes("park")) {
        orderBy += "park_name";
    }
    if (orderByDoc.includes("Asc")) {
        orderBy += " ASC";
    }
    if (orderByDoc.includes("Desc")) {
        orderBy += " DESC";
    }
    return `&$order=${orderBy}`;
}

function getWhere() {
    let parkName = document.getElementById("searchParkName").value;
    let where = "";

    if (!(parkName.trim() == null || parkName.trim().length == 0)) {
        where = `$where=lower(park_name) LIKE lower('%${parkName}%') `;
    }

    return where;
}

function getURL() {
    let limit = `&$limit=${document.getElementById("limitSearch").value}`;

    $return_value = "https://data.winnipeg.ca/resource/tx3d-pfxq.json?" + getWhere() + getOrderBy() + limit;
    return $return_value;
}

function displayResults() {
    let results = document.getElementById("output").innerHTML;
    let url = getURL();
    url = encodeURI(url);

    fetch(url)
        .then(function (result) {
            return result.json();
        })
        .then(function (data) {
            document.getElementById("output").innerHTML = "";
            var table = document.getElementById("output");

            for (let park of data) {
                let row = table.insertRow(table.rows.length);
                row.insertCell(0).innerHTML = park.park_name;
                row.insertCell(1).innerHTML = park.location_description;
                row.insertCell(2).innerHTML = park.neighbourhood;
                row.insertCell(3).innerHTML = park.area_in_hectares;
            }

            let searchResults = table.rows.length;
            if (searchResults == 0) {
                document.getElementById("table-caption").innerHTML = "No result found";
                document.getElementById("numberOfResults").innerHTML = "No result";
            } else {
                document.getElementById("numberOfResults").innerHTML = "Displaying top " + searchResults + " Results";
            }
        });
}
