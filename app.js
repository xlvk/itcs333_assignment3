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

// Example usage with async/await
async function init() {
    try {
        const results = await fetchStudentData();
        console.log(results);
    } catch (error) {
        console.error(error);
    }
}

init();
