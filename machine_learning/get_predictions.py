import findspark
findspark.init()
from pyspark.ml.recommendation import ALS, ALSModel
from pyspark.sql import SparkSession
# import findspark
# findspark.init()

spark = SparkSession.builder.appName(
    'DifferentialDiagnosisSystem').getOrCreate()

MODEL_PATH = './model/model_recommender'
model = ALSModel.load(MODEL_PATH)

SPARSE_MATRIX_CSV = './dataset/symptoms-disease-weighted-rank-count_sparse-matrix.csv'
SYMPTOMS_CSV = './dataset/symptoms_id.csv'
DIAGNOSIS_CSV = './dataset/diseases_id.csv'

diff = spark.read.csv(SPARSE_MATRIX_CSV, header=True, inferSchema=True)
sym = spark.read.csv(SYMPTOMS_CSV, header=True, inferSchema=True)
dia = spark.read.csv(DIAGNOSIS_CSV, header=True, inferSchema=True)

df = diff.join(sym, ['syd'], how='inner')
df = df.join(dia, ['did'], how='inner')
# df.show(4)
df_pandasDf = df.toPandas()

# Prediction
print('Symptoms: pain chest, palpitation, shortness of breath, sweat')
sydId1 = 'pain chest'
sydId2 = 'palpitation'
sydId3 = 'shortness of breath'
sydId4 = 'sweat'
df1a = df.filter((df['symptom'] == sydId1) | (df['symptom'] == sydId2) |
                 (df['symptom'] == sydId3) | (df['symptom'] == sydId4)).select('syd', 'symptom', 'did', 'disease', 'wei').orderBy('wei', ascending=False)
df1a.show()

# recommendations = model.transform(df1a).orderBy('prediction', ascending=False)
# print('Recommendations: ')
# recommendations_df = recommendations.toPandas()
# print(recommendations_df.head())

# model.recommendForAllUsers(10).show()
model.transform(df).show()
