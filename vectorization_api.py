
from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import matplotlib.pyplot as plt
import matplotlib
from openai import OpenAI
from fpdf import FPDF
matplotlib.use('Agg')
import os
from dotenv import load_dotenv

from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
# Initialize Flask app and SentenceTransformer model
app = Flask(__name__)
model = SentenceTransformer('all-mpnet-base-v2')

# Set your OpenAI API key

client = OpenAI(api_key=os.getenv("NEXT_PUBLIC_OPENAI_API_KEY"))
# Function to find relevant rows based on cosine similarity
def find_relevant_rows(embedding, data_csv, embedding_columns, top_n=3):
    df = pd.read_csv(data_csv)

    for col in embedding_columns:
        if col in df.columns:
            # Convert string embeddings to numpy arrays
            df[col] = df[col].apply(eval).apply(np.array)
        else:
            raise ValueError(f"Column '{col}' not found in the CSV.")

    results = {}
    for col in embedding_columns:
        similarities = df[col].apply(lambda x: cosine_similarity([embedding], [x])[0][0])
        df['similarity'] = similarities
        top_rows = df.nlargest(top_n, 'similarity')

        # top_rows[col] = top_rows[col].apply(lambda x: x.tolist())
        # results[col] = top_rows.to_dict(orient='records')
        top_rows[col] = top_rows[col].apply(lambda x: x.tolist())
        top_rows = top_rows.applymap(
            lambda x: x.tolist() if isinstance(x, np.ndarray) else x
        )

        results[col] = top_rows.to_dict(orient='records')

    # file = open("relevantrows.log","w")
    # file.write(str(results))
    return results

# Function to analyze Instagram data
def analyze_instagram_data(insights):
    """
    Analyze Instagram data to identify trends in impressions and engagement.

    Args:
        insights (dict): Instagram insights grouped by embedding type.

    Returns:
        dict: Analysis summary and visualizations.
    """
    summary = {}
    impressions_data = insights["impressions_embedding"]
    top_impressions = sorted(impressions_data, key=lambda x: x["similarity"], reverse=True)
    summary["top_impressions"] = top_impressions[:3]

    engagement_data = insights["engagement_rate_embedding"]
    top_engagement = sorted(engagement_data, key=lambda x: x["similarity"], reverse=True)
    summary["top_engagement"] = top_engagement[:3]

    labels = ["Impressions", "Engagement"]
    values = [len(top_impressions), len(top_engagement)]
    plt.bar(labels, values, color=["blue", "green"])
    plt.title("Content Performance Trends")
    plt.xlabel("Metrics")
    plt.ylabel("Frequency")
    plt.savefig("content_performance.png")
    plt.close()
    file = open("test.log","w")
    file.write(str(summary))
    return summary


def generate_graphs(instagram_analysis, output_folder="graphs"):
    """
    Generate graphs based on Instagram analysis.

    Args:
        instagram_analysis (dict): Analysis of Instagram data.
        output_folder (str): Folder to save the generated graphs.

    Returns:
        list: Paths to the generated graph images.
    """
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Impressions vs. Engagement bar graph
    impressions = [item["impressions"] for item in instagram_analysis["top_impressions"]]
    engagement = [item["engagement_rate"] for item in instagram_analysis["top_engagement"]]
    labels = [f"Post {i+1}" for i in range(len(impressions))]

    plt.figure(figsize=(8, 5))
    plt.bar(labels, impressions, label="Impressions", alpha=0.7)
    plt.bar(labels, engagement, label="Engagement Rate", alpha=0.7)
    plt.title("Top Impressions and Engagement")
    plt.xlabel("Posts")
    plt.ylabel("Metrics")
    plt.legend()
    impressions_graph_path = os.path.join(output_folder, "impressions_vs_engagement.png")
    plt.savefig(impressions_graph_path)
    plt.close()

    return [impressions_graph_path]

def generate_html_report(report, graphs):
    """
    Generate an HTML report with graphs.

    Args:
        report (str): The GPT-generated report text.
        graphs (list): List of paths to the generated graph images.

    Returns:
        str: Path to the generated HTML file.
    """
    html_content = f"""
    <html>
    <head>
        <title>Social Media Analysis Report</title>
        <style>
            body {{
                font-family: Arial, sans-serif;
                margin: 30px;
                line-height: 1.6;
            }}
            h1 {{
                text-align: center;
                color: #333;
            }}
            h2 {{
                color: #333;
            }}
            .section {{
                margin-bottom: 30px;
            }}
            .graph {{
                margin-top: 20px;
                text-align: center;
            }}
            .graph img {{
                max-width: 100%;
                height: auto;
            }}
        </style>
    </head>
    <body>
        <h1>Social Media Insights Report</h1>

        <div class="section">
            <h2>Report</h2>
            <div>{report}</div>
        </div>

        <div class="section">
            <h2>Graphs</h2>
            {''.join([f'<div class="graph"><img src="{graph}" alt="Top Impressions and Engagement"></div>' for graph in graphs])}
        </div>
    </body>
    </html>
    """

    output_file = "report.html"
    with open(output_file, "w") as file:
        file.write(html_content)

    return output_file
# Function to analyze influencer data
def analyze_influencer_data(insights):
    """
    Analyze Influencer data to identify top influencers and strategies.

    Args:
        insights (dict): Influencer insights grouped by embedding type.

    Returns:
        dict: Analysis summary.
    """

    
    summary = {}
    captions_data = insights["captions_y_embedding"]
    top_captions = sorted(captions_data, key=lambda x: x["similarity"], reverse=True)
    summary["top_captions"] = top_captions[:3]

    names_data = insights["name_embedding"]
    top_influencers = sorted(names_data, key=lambda x: x["similarity"], reverse=True)
    summary["top_influencers"] = top_influencers[:3]

    return summary

# Function to generate report using OpenAI
def generate_gpt_report(user_input, instagram_analysis, influencer_analysis):
    """
    Generate a report using OpenAI GPT model.

    Args:
        user_input (str): User's input query.
        instagram_analysis (dict): Instagram data analysis.
        influencer_analysis (dict): Influencer data analysis.

    Returns:
        str: Generated report.
    """
    # Extract specific fields from the analysis
    impressions_list = [item.get('impressions', 'N/A') for item in instagram_analysis["top_impressions"]]
    engagement_list = [item.get('engagement_rate', 'N/A') for item in instagram_analysis["top_engagement"]]
    captions_list = [item.get('content', 'N/A') for item in influencer_analysis["top_captions"]]
    influencers_list = [item.get('name', 'N/A') for item in influencer_analysis["top_influencers"]]

    prompt = f"""
    User Input: {user_input}

    Instagram Analysis:
    - Top Impressions: {impressions_list}
    - Top Engagement: {engagement_list}

    Influencer Analysis:
    - Top Captions: {captions_list}
    - Top Influencers: {influencers_list}

   refer to graph that talks about {impressions_list} and {engagement_list} as fig1 every time you mention it.

    Write a 500-word report summarizing in HTML format <div>content<div> this html will be included in a bigger page. so don't write hmtl``` or any other sentence.
    Also no title needed directly start with first point:
    1. Summary of content, Observations and trends.
    2. Recommendations to improve social media engagement.
    3. Actionable strategies inspired by top influencers.
    4. Ideas for future ideas
    5.  Conclusion
    from here and there create dumby graphs using Jinja2 style to explain some points and refer to get.
    """
   
    # file = open("file.log","w")
    # file.write(str(impressions_list))
    # New API format for chat completions
    response = client.chat.completions.create(
        model="gpt-4o-mini",  # Replace with your model (e.g., "gpt-4o" or "gpt-4")
        messages=[
            {"role": "system", "content": "You are a helpful assistant skilled at writing professional reports in HTML format."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=2000
    )
    
    # Extract the response content
   
    return response.choices[0].message.content
# Function to generate a PDF


def generate_pdf(report, output_file="report.pdf"):
    """
    Generate a PDF report with Unicode support using ReportLab.

    Args:
        report (str): The report content as a string.
        output_file (str): The output PDF file name.

    Returns:
        str: The path to the generated PDF file.
    """
    c = canvas.Canvas(output_file, pagesize=letter)
    text = c.beginText(50, 750)  # Starting position (x, y)
    text.setFont("Helvetica", 12)

    # Add the report content
    for line in report.split("\n"):
        text.textLine(line)

    c.drawText(text)
    c.save()
    return output_file

def generate_pdf_with_graphs(report, graphs, output_file="report_with_graphs.pdf"):
    """
    Generate a PDF report with graphs.

    Args:
        report (str): The report content as a string.
        graphs (list): List of paths to graph images.
        output_file (str): The output PDF file name.

    Returns:
        str: The path to the generated PDF file.
    """
    c = canvas.Canvas(output_file, pagesize=letter)
    text = c.beginText(50, 750)  # Starting position
    text.setFont("Helvetica", 12)

    # Add the report content
    for line in report.split("\n"):
        text.textLine(line)

    c.drawText(text)

    # Add graphs to the PDF
    for idx, graph_path in enumerate(graphs):
        c.drawImage(graph_path, 50, 500 - idx * 300, width=500, height=250)  # Adjust positions dynamically

    c.save()
    return output_file

@app.route("/vectorize", methods=["POST"])
def vectorize():
    """
    Endpoint to vectorize user input and retrieve relevant data from pre-vectorized CSVs.
    """
    try:
        data = request.json
        user_input = data.get("userInput", "")

        if not user_input:
            return jsonify({"error": "User input is required"}), 400

        embedding = model.encode(user_input, convert_to_tensor=False).tolist()

        ig_results = find_relevant_rows(
            embedding=embedding,
            data_csv="vectorized_instagram_data.csv",
            embedding_columns=["impressions_embedding", "engagement_rate_embedding"],
            top_n=5
        )

        influencer_results = find_relevant_rows(
            embedding=embedding,
            data_csv="vectorized_influencer_data.csv",
            embedding_columns=["captions_y_embedding", "name_embedding"],
            top_n=5
        )

        instagram_analysis = analyze_instagram_data(ig_results)
        influencer_analysis = analyze_influencer_data(influencer_results)

        report = generate_gpt_report(user_input, instagram_analysis, influencer_analysis)
        #graphs = generate_graphs(instagram_analysis)
        #pdf_path = generate_pdf_with_graphs(report, graphs)
        # Generate graphs
        graphs = generate_graphs(instagram_analysis)

        # # Generate HTML report
        report_path = generate_html_report(report, graphs)

        #pdf_path = generate_pdf(report, output_file="report.pdf")
        return jsonify({
            "embedding": embedding,
            "instagram_insights": ig_results,
            "influencer_insights": influencer_results,
            "report": report_path,
            
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=False)