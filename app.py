import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from fuzzywuzzy import fuzz
import numpy as np
class ErrorClassifier:
    def __init__(self, csv_file):
        try:
            self.df = pd.read_csv(csv_file)
            self.vectorizer = TfidfVectorizer()
            self.tfidf_matrix = self.vectorizer.fit_transform(self.df['EventTemplate'])
        except Exception as e:
            raise

    def preprocess_text(self, text):
        return text.replace('<*>', '.*')
        
    def fuzzy_match_score(self, str1, str2):
        return fuzz.ratio(str1, str2) / 100.0
        
    def semantic_similarity(self, query):
        query_vector = self.vectorizer.transform([query])
        return cosine_similarity(query_vector, self.tfidf_matrix).flatten()
        
    def combined_similarity(self, query, word_weight=0.8, semantic_weight=0.2):
        query = self.preprocess_text(query)
        fuzzy_scores = np.array([self.fuzzy_match_score(query, event) for event in self.df['EventTemplate']])
        semantic_scores = self.semantic_similarity(query)
        return word_weight * fuzzy_scores + semantic_weight * semantic_scores
        
    def find_top_matches(self, query, n=1):
        combined_scores = self.combined_similarity(query)
        top_indices = combined_scores.argsort()[-n:][::-1]
        return self.df.iloc[top_indices]

