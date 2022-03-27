import pandas as pd

def getPredictions(symptoms):
  # Loading the generated prediction results from the model.
  RECOMMENDATIONS_PATH = './result/recommendations_df.csv'
  recommendations_df = pd.read_csv(RECOMMENDATIONS_PATH)

  # Finding entries where entries from the symptoms list appears.
  results = recommendations_df[recommendations_df['symptom'].isin(
      symptoms)].sort_values(by=['symptom'], ascending=False)

  # Narrowing the data frame search results to disease and prediction columns and summing the prediction values of same disease names.
  result_df = recommendations_df[['disease', 'prediction']]
  df = result_df.groupby('disease')[
      'prediction'].sum().sort_values(ascending=False)

  # Converting the data to dictionary.
  output = df.to_dict()

  return output
