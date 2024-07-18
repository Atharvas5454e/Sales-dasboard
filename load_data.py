import pandas as pd
import mysql.connector

# Load the dataset
df = pd.read_csv("C:\Users\athar\Desktop\Shinde\csv retail.csv")

# Clean the data
df = df.dropna(subset=['CustomerID', 'InvoiceDate', 'StockCode', 'Description', 'Quantity', 'UnitPrice'])
df['InvoiceDate'] = pd.to_datetime(df['InvoiceDate'])

# Connect to the database
connection = mysql.connector.connect(
    host='localhost',
    user='root',  # Replace with your MySQL username
    password='avs123',  # Replace with your MySQL password
    database='retail_db'
)
cursor = connection.cursor()

# Insert data into sales table
for _, row in df.iterrows():
    cursor.execute("""
        INSERT INTO sales (InvoiceNo, StockCode, Description, Quantity, InvoiceDate, UnitPrice, CustomerID, Country)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """, (row['InvoiceNo'], row['StockCode'], row['Description'], row['Quantity'], row['InvoiceDate'], row['UnitPrice'], row['CustomerID'], row['Country']))

connection.commit()
connection.close()
