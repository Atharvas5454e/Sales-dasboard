# app.py
from flask import Flask, jsonify
import mysql.connector

app = Flask(__name__)

def get_db_connection():
    connection = mysql.connector.connect(
        host='localhost',
        user='root',
        password='avs123',
        database='retail_db'
    )
    return connection

@app.route('/api/total_sales', methods=['GET'])
def total_sales():
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT SUM(UnitPrice * Quantity) AS TotalSales FROM sales")
    result = cursor.fetchone()
    connection.close()
    return jsonify({'total_sales': result[0]})

@app.route('/api/sales_by_category', methods=['GET'])
def sales_by_category():
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("""
        SELECT c.CategoryName, SUM(s.UnitPrice * s.Quantity) AS Sales
        FROM sales s
        JOIN products p ON s.StockCode = p.StockCode
        JOIN categories c ON p.CategoryID = c.CategoryID
        GROUP BY c.CategoryName
    """)
    results = cursor.fetchall()
    connection.close()
    return jsonify(results)

@app.route('/api/sales_trends', methods=['GET'])
def sales_trends():
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("""
        SELECT DATE(InvoiceDate) AS Date, SUM(UnitPrice * Quantity) AS Sales
        FROM sales
        GROUP BY DATE(InvoiceDate)
        ORDER BY Date
    """)
    results = cursor.fetchall()
    connection.close()
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
