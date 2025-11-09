from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
from dotenv import load_dotenv
import psycopg2
from groq import Groq
import vanna as vn

load_dotenv()

app = FastAPI()

# Initialize Groq client
groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# Database connection
def get_db_connection():
    return psycopg2.connect(
        host=os.getenv("DB_HOST", "localhost"),
        database=os.getenv("DB_NAME", "invoice_analytics"),
        user=os.getenv("DB_USER", "username"),
        password=os.getenv("DB_PASSWORD", "password"),
        port=os.getenv("DB_PORT", "5432")
    )

class QuestionRequest(BaseModel):
    question: str

@app.post("/generate-sql")
async def generate_sql(request: QuestionRequest):
    try:
        # Database schema context
        schema_context = """
        Database Schema:
        - vendors: id, name, createdAt, updatedAt
        - invoices: id, invoiceNumber, vendorId, invoiceDate, dueDate, totalAmount, status, category, description
        - line_items: id, invoiceId, description, quantity, unitPrice, totalPrice, category
        - payments: id, invoiceId, amount, paymentDate, paymentMethod, reference
        
        Relationships:
        - invoices.vendorId -> vendors.id
        - line_items.invoiceId -> invoices.id
        - payments.invoiceId -> invoices.id
        """
        
        # Use Groq to generate SQL
        prompt = f"""
        {schema_context}
        
        Generate a PostgreSQL query for this question: {request.question}
        
        Return only the SQL query, no explanations.
        """
        
        completion = groq_client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="mixtral-8x7b-32768",
            temperature=0.1
        )
        
        sql_query = completion.choices[0].message.content.strip()
        
        # Execute the query
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(sql_query)
        results = cursor.fetchall()
        columns = [desc[0] for desc in cursor.description]
        
        cursor.close()
        conn.close()
        
        return {
            "sql": sql_query,
            "results": [dict(zip(columns, row)) for row in results],
            "columns": columns
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)