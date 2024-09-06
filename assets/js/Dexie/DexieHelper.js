class DexieHelper {
    debug = false;

    constructor(dbName, schema, debug = false) {
        this.db = new Dexie(dbName);

        // Initialize the database with the provided schema
        this.db.version(1).stores(schema);
        this.debug = debug;
    }

    // Add data to a specific table
    async create(table, data) {
        try {
            const id = await this.db[table].add(data);
            if (this.debug) console.log(`Record added to ${table} with id: ${id}`);
            return id;
        } catch (error) {
            if (this.debug) console.error(`Error adding data to ${table}:`, error);
            throw error;
        }
    }

    // Retrieve data by ID from a specific table
    async readById(table, id) {
        try {
            const data = await this.db[table].get(id);
            if (this.debug) console.log(`Data retrieved from ${table}:`, data);
            return data;
        } catch (error) {
            if (this.debug) console.error(`Error retrieving data from ${table}:`, error);
            throw error;
        }
    }

    // Retrieve all records from a specific table
    async readAll(table) {
        try {
            const data = await this.db[table].toArray();
            if (this.debug) console.log(`All data from ${table}:`, data);
            return data;
        } catch (error) {
            if (this.debug) console.error(`Error retrieving all data from ${table}:`, error);
            throw error;
        }
    }

    // Retrieve data from one table based on a relation to another table
    async readByRelation(table, foreignKey, relatedTable, relatedKey, value) {
        try {
            // Get the related entity by the key
            const relatedItem = await this.db[relatedTable].where(relatedKey).equals(value).first();
            if (!relatedItem) {
                throw new Error(`${relatedTable} with ${relatedKey} = ${value} not found`);
            }

            // Retrieve data from the main table using the foreign key
            const data = await this.db[table].where(foreignKey).equals(relatedItem.id).toArray();
            if (this.debug) console.log(`Data from ${table} related to ${relatedTable}:`, data);
            return data;
        } catch (error) {
            if (this.debug) console.error(`Error retrieving related data from ${table}:`, error);
            throw error;
        }
    }

    // Update a record in a specific table by ID
    async update(table, id, newData) {
        try {
            await this.db[table].update(id, newData);
            if (this.debug) console.log(`Record in ${table} with id ${id} updated.`);
        } catch (error) {
            if (this.debug) console.error(`Error updating record in ${table}:`, error);
            throw error;
        }
    }

    // Delete a record by ID from a specific table
    async deleteById(table, id) {
        try {
            await this.db[table].delete(id);
            if (this.debug) console.log(`Record with id ${id} deleted from ${table}`);
        } catch (error) {
            if (this.debug) console.error(`Error deleting record from ${table}:`, error);
            throw error;
        }
    }

    // Delete a record by providing a field-value pair
    async deleteByField(table, fieldValueObj) {
        try {
            const field = Object.keys(fieldValueObj)[0];  // Get the field name (e.g., unit_id)
            const value = fieldValueObj[field];  // Get the field value (e.g., 244)

            // Find the first record matching the field and value
            const record = await this.db[table].where(field).equals(value).first();

            if (record) {
                // Delete the record by its primary key (id)
                await this.deleteById(table, record.id);
                if (this.debug) console.log(`Record with ${field} = ${value} deleted from ${table}`);
            } else {
                if (this.debug) console.log(`No record found in ${table} with ${field} = ${value}`);
            }
        } catch (error) {
            if (this.debug) console.error(`Error deleting record from ${table}:`, error);
            throw error;
        }
    }

    // Upsert: Update if exists, otherwise insert
    async upsert(table, uniqueField, data) {
        try {
            // Check if record with unit_id exists
            const existingRecord = await this.db[table].where(uniqueField).equals(data[uniqueField]).first();

            if (existingRecord) {
                // Update the existing record
                await this.db[table].update(existingRecord.id, data);
                if (this.debug) console.log(`Record in ${table} with ${uniqueField} = ${data[uniqueField]} updated.`);
            } else {
                // Insert a new record
                await this.create(table, data);
                if (this.debug) console.log(`New record inserted into ${table}`);
            }
        } catch (error) {
            if (this.debug) console.error(`Error upserting data in ${table}:`, error);
            throw error;
        }
    }
}

// Example usage

// Define the schema with relationships (e.g., users and orders)
const schema = {
    my_units: "++id, unit_id, quantity"
};

// Instantiate DexieHelper
const dbHelper = new DexieHelper("HeroscapeBuilder", schema);

// Create example records
// async function runExample() {
//     // Create users
//     const userId1 = await dbHelper.create("users", { name: "John Doe", email: "john@example.com" });
//     const userId2 = await dbHelper.create("users", { name: "Jane Smith", email: "jane@example.com" });

//     // Create orders for the users
//     await dbHelper.create("orders", { userId: userId1, product: "Laptop", quantity: 1 });
//     await dbHelper.create("orders", { userId: userId2, product: "Keyboard", quantity: 2 });

//     // Read data
//     const allUsers = await dbHelper.readAll("users");
//     const ordersForJohn = await dbHelper.readByRelation("orders", "userId", "users", "name", "John Doe");

//     console.log("All Users:", allUsers);
//     console.log("Orders for John Doe:", ordersForJohn);

//     // Update a record
//     await dbHelper.update("users", userId1, { email: "john.doe@example.com" });

//     // Delete a record
//     await dbHelper.delete("users", userId2);
// }

// // Run the example
// runExample();
