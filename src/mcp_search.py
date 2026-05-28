"""
Shared BM25 search for AnchorFact MCP stdio and HTTP interfaces.
"""

import math
import re
from collections import defaultdict

K1 = 1.5
B = 0.75


def tokenize(text: str) -> list[str]:
    words = re.split(r"[\W_]+", str(text or "").lower())
    return [word for word in words if len(word) > 1]


class BM25Index:
    def __init__(self):
        self.documents: list[dict] = []
        self.doc_lengths: list[int] = []
        self.avgdl = 0.0
        self.inverted_index: dict[str, dict[int, int]] = defaultdict(dict)
        self.n = 0
        self._built = False

    def build(self, articles: list[dict]) -> None:
        self.documents = articles
        self.doc_lengths = []
        self.inverted_index = defaultdict(dict)
        self.n = len(articles)
        if self.n == 0:
            self._built = True
            return

        total_len = 0
        for index, article in enumerate(articles):
            tokens = tokenize(article.get("title", "")) + tokenize(article.get("description", ""))
            self.doc_lengths.append(len(tokens))
            total_len += len(tokens)
            term_counts: dict[str, int] = {}
            for token in tokens:
                term_counts[token] = term_counts.get(token, 0) + 1
            for term, count in term_counts.items():
                self.inverted_index[term][index] = count

        self.avgdl = total_len / self.n if self.n else 0.0
        self._built = True

    def search(self, query: str, confidence_min: str = "medium", limit: int = 5) -> list[dict]:
        if not self._built or self.n == 0:
            return []

        confidence_rank = {"high": 3, "medium": 2, "low": 1}
        min_rank = confidence_rank.get(confidence_min, 1)
        query_terms = tokenize(query)
        if not query_terms:
            return []

        candidates: set[int] = set()
        for term in query_terms:
            candidates.update(self.inverted_index.get(term, {}).keys())

        scores: list[tuple[float, dict]] = []
        for doc_id in candidates:
            article = self.documents[doc_id]
            confidence = article.get("confidence", "low")
            if confidence_rank.get(confidence, 0) < min_rank:
                continue

            doc_len = self.doc_lengths[doc_id] or 1
            score = 0.0
            for term in query_terms:
                postings = self.inverted_index.get(term, {})
                if doc_id not in postings:
                    continue
                df = len(postings)
                idf = math.log((self.n - df + 0.5) / (df + 0.5) + 1.0)
                tf = postings[doc_id]
                tf_score = (tf * (K1 + 1)) / (tf + K1 * (1 - B + B * doc_len / self.avgdl))
                score += idf * tf_score

            if score > 0:
                score += 0.3 if confidence == "high" else 0.15 if confidence == "medium" else 0
                scores.append((score, article))

        scores.sort(key=lambda item: item[0], reverse=True)
        return [article for _, article in scores[:limit]]
