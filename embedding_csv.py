import pandas as pd
from sentence_transformers import SentenceTransformer

# Initialize the SentenceTransformer model
model = SentenceTransformer('all-mpnet-base-v2')

def vectorize_multiple_columns(input_csv, columns_to_vectorize, output_csv):
    """
    Vectorize multiple columns in a CSV file and save the vectorized version.

    Args:
        input_csv (str): Path to the input CSV file.
        columns_to_vectorize (list): List of column names to vectorize.
        output_csv (str): Path to save the output CSV with vectorized embeddings.

    Returns:
        None
    """
    # Load the CSV file
    df = pd.read_csv(input_csv)

    # Ensure the specified columns exist
    for col in columns_to_vectorize:
        if col not in df.columns:
            raise ValueError(f"Column '{col}' not found in the input CSV.")

    # Vectorize each specified column
    for col in columns_to_vectorize:
        print(f"Vectorizing column '{col}' in {input_csv}...")
        df[f'{col}_embedding'] = df[col].apply(lambda x: model.encode(str(x)).tolist())

    # Save the updated CSV
    df.to_csv(output_csv, index=False)
    print(f"Vectorized CSV saved to {output_csv}")

# Example Usage
if __name__ == "__main__":
    vectorize_multiple_columns(
        input_csv="./data/moudjahid_metrics.csv",
        columns_to_vectorize=["impressions", "engagement_rate"],  # Specify the columns to vectorize
        output_csv="vectorized_instagram_data.csv"
    )

    vectorize_multiple_columns(
        input_csv="./data/influencer_data.csv",
        columns_to_vectorize=["captions_y", "name"],  # Specify the columns to vectorize
        output_csv="vectorized_influencer_data.csv"
    )