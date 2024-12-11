// import fs from 'fs'; // File system module to read CSV files
// import csv from 'csv-parser'; // CSV parser to read file content
// import db from './lib/db.js'; // Adjust the path to the Database module

// /**
//  * Function to create a table and insert data from a CSV file
//  * @param {string} tableName - The name of the table to create
//  * @param {string} csvFilePath - The path of the CSV file
//  */
// async function createTableFromCSV(tableName, csvFilePath) {
//     try {
//         const rows = [];
//         const headers = new Set();

//         // Read the CSV file
//         await new Promise((resolve, reject) => {
//             fs.createReadStream(csvFilePath)
//                 .pipe(csv())
//                 .on('data', (row) => {
//                     rows.push(row);
//                     Object.keys(row).forEach((header) => headers.add(header));
//                 })
//                 .on('end', resolve)
//                 .on('error', reject);
//         });

//         if (rows.length === 0) {
//             console.error('CSV file is empty. No data to insert.');
//             return;
//         }

//         // // Drop the table if it exists
//         // const dropTableSQL = `DROP TABLE IF EXISTS \`${tableName}\``;
//         // await db.query(dropTableSQL);

//         // console.log(`Table "${tableName}" dropped if it existed.`);

//         // Create table dynamically
//         const columns = Array.from(headers)
//             .map((header) => `\`${header}\` TEXT`)
//             .join(', ');

//         const createTableSQL = `CREATE TABLE \`${tableName}\` (${columns})`;
//         await db.query(createTableSQL);

//         console.log(`Table "${tableName}" created successfully.`);

//         // Prepare data for bulk insertion
//         const columnNames = Array.from(headers).map((header) => `\`${header}\``).join(', ');
//         const values = rows.map((row) =>
//             Array.from(headers).map((header) => row[header] || null)
//         );

//         // Construct placeholders for each row
//         const placeholders = values
//             .map((row) => `(${row.map(() => '?').join(', ')})`)
//             .join(', ');

//         const insertSQL = `INSERT INTO \`${tableName}\` (${columnNames}) VALUES ${placeholders}`;
//         const flattenedValues = values.flat(); // Flatten array of arrays for query parameters

//         await db.query(insertSQL, flattenedValues);

//         console.log(`Data inserted into "${tableName}" successfully.`);
//     } catch (error) {
//         console.error('Error creating table from CSV:', error);
//     }
// }

// createTableFromCSV('user_posts', './gold_data/user_post.csv');
// // createTableFromCSV('user_reels', './gold_data/user_reel.csv');


// /**
//  * Function to get the list of all tables in the database.
//  * @returns {Promise<string[]>} - A promise that resolves to an array of table names.
//  */
// async function getTables() {
//     try {
//         const query = `
//             SELECT table_name 
//             FROM information_schema.tables 
//             WHERE table_schema = ?`;
//         const results = await db.query(query, [process.env.DB_DATABASE]); // Pass database name from environment variable
//         return results.map((row) => row.TABLE_NAME);
//     } catch (error) {
//         console.error('Error fetching table list:', error);
//         throw error;
//     }
// }

// /**
//  * Function to fetch all data from a given table.
//  * @param {string} tableName - The name of the table to fetch data from.
//  * @returns {Promise<object[]>} - A promise that resolves to an array of rows from the table.
//  */
// async function getTableData(tableName) {
//     try {
//         const query = `SELECT * FROM \`${tableName}\``; // Use backticks to handle table names with special characters
//         const results = await db.query(query);
//         console.log(results, tableName);
//         return results;
//     } catch (error) {
//         console.error(`Error fetching data from table "${tableName}":`, error);
//         throw error;
//     }
// }

// // Example usage:
// // (async () => {
// //     try {
// //         // Get list of tables
// //         const tables = await getTables();
// //         console.log('Tables:', tables);

// //         // Fetch data from a specific table
// //         if (tables.length > 0) {
// //             const tableName = tables[0]; // Example: fetch data from the first table
// //             const tableData = await getTableData('user_posts');
// //             console.log(`Data from table "${tableName}":`, tableData);
// //         }
// //     } catch (error) {
// //         console.error('Error:', error);
// //     } finally {
// //         await db.close();
// //         console.log('Database connection closed.');
// //     }
// // })();



import fs from 'fs'; // File system module to read CSV files
import csv from 'csv-parser'; // CSV parser to read file content
import db from './lib/db.js'; // Adjust the path to the Database module

/**
 * Function to insert data in chunks to prevent too many placeholders error
 * @param {string} tableName - The name of the table
 * @param {string} csvFilePath - The path of the CSV file
 * @param {number} chunkSize - Number of rows per batch
 */
async function createTableFromCSVInChunks(tableName, csvFilePath, chunkSize = 1000) {
    try {
        const rows = [];
        const headers = new Set();

        // Read the CSV file
        await new Promise((resolve, reject) => {
            fs.createReadStream(csvFilePath)
                .pipe(csv())
                .on('data', (row) => {
                    rows.push(row);
                    Object.keys(row).forEach((header) => headers.add(header));
                })
                .on('end', resolve)
                .on('error', reject);
        });

        if (rows.length === 0) {
            console.error('CSV file is empty. No data to insert.');
            return;
        }

        // Create table dynamically
        const columns = Array.from(headers)
            .map((header) => `\`${header}\` TEXT`)
            .join(', ');

        const createTableSQL = `CREATE TABLE IF NOT EXISTS \`${tableName}\` (${columns})`;
        await db.query(createTableSQL);
        console.log(`Table "${tableName}" created successfully.`);

        // Prepare for bulk insertion
        const columnNames = Array.from(headers).map((header) => `\`${header}\``).join(', ');

        // Insert data in chunks
        for (let i = 0; i < rows.length; i += chunkSize) {
            const chunk = rows.slice(i, i + chunkSize);
            const values = chunk.map((row) =>
                Array.from(headers).map((header) => row[header] || null)
            );
            const placeholders = values
                .map((row) => `(${row.map(() => '?').join(', ')})`)
                .join(', ');
            const insertSQL = `INSERT INTO \`${tableName}\` (${columnNames}) VALUES ${placeholders}`;
            const flattenedValues = values.flat();

            await db.query(insertSQL, flattenedValues);
            console.log(`Inserted ${chunk.length} rows into "${tableName}" (Chunk ${Math.floor(i / chunkSize) + 1}).`);
        }

        console.log(`All data inserted into "${tableName}" successfully.`);
    } catch (error) {
        console.error('Error creating table from CSV in chunks:', error);
    }
}

// Usage
createTableFromCSVInChunks('top_captions_per_day', './gold_data/top_captions_per_day.csv', 500);
