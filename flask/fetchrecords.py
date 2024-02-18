import sqlite3

# Connect to the SQLite database
conn = sqlite3.connect('example.db')

# Create a cursor object using the cursor method
cursor = conn.cursor()

# SQL query to fetch the latest record for a specific agentId
query = """
SELECT * FROM records 
WHERE agentId='agent1qghwhyknxm46h0wsecjcunnja5tfzcyjqjz6m2pl0snmka68hytd5qnysv5' 
ORDER BY id DESC;
"""

# Execute the query
cursor.execute(query)

# Fetch one record
row = cursor.fetchall()

# Print the row
print(row)

# Close the database connection
conn.close()
