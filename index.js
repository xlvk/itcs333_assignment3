async function fetchStudentData() {
    const url = "https://data.gov.bh/api/explore/v2.1/catalog/datasets/01-statistics-of-students-nationalities_updated/records?where=colleges%20like%20%22IT%22%20AND%20the_programs%20like%20%22bachelor%22&limit=100";

    try {
        const response = await fetch(url);
        
        // Check if the response is ok
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Check if we got the desired data
        if (!data.results || data.results.length === 0) {
            throw new Error("No data found");
        }
        
        return data.results;
        
    } catch (error) {
        console.error("Error fetching data:", error.message);
        throw error;
    }
}


// function to populate the table with the data
async function populateTable() {
    const tableBody = document.getElementById("tableBody");
    try {
        const data = await fetchStudentData();
        tableBody.innerHTML = data.map(item => `
            <tr>
                <td>${item.year}</td>
                <td>${item.semester}</td>
                <td>${item.the_programs}</td>
                <td>${item.nationality}</td>
                <td>${item.colleges}</td>
                <td>${item.number_of_students}</td>
            </tr>
        `).join('');
    } catch (error) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center">Error loading data: ${error.message}</td>
            </tr>`;
    }
}

// Call the function to populate the table
document.addEventListener("DOMContentLoaded", populateTable);