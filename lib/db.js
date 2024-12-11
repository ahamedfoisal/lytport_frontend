import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

class Database {
    constructor() {
        // Initialize database connection settings from environment variables
        this.connection = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            port: process.env.DB_PORT,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }

    // Method to execute a query with parameters
    async query(sql, params) {
        try {
            const [results] = await this.connection.execute(sql, params);
            return results;
        } catch (error) {
            console.error('Database query error:', error);
            throw error;
        }
    }

    async getAll(table) {
      try {
          const query = `SELECT * FROM ${table}`;
          const [rows] = await this.connection.execute(query);
          return rows;
      } catch (error) {
          console.error(`Error fetching data from ${table}:`, error);
          throw error;
      }
  }
  
    // Close the database connection pool
    async close() {
        try {
            await this.connection.end();
        } catch (error) {
            console.error('Error closing database connection:', error);
        }
    }
}

// Export an instance of the Database class as default
const db = new Database();
export default db;
