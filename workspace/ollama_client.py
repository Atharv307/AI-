import requests
import json

class OllamaClient:
    """A simple client for interacting with a local Ollama instance."""
    def __init__(self, base_url="http://localhost:11434", model="qwen2.5:1.5b"):
        self.base_url = base_url
        self.model = model

    def chat(self, messages):
        response = requests.post(
            f"{self.base_url}/api/chat",
            json={"model": self.model, "messages": messages, "stream": False}
        )
        return response.json()["message"]["content"]

    def generate_embeddings(self, text):
        response = requests.post(
            f"{self.base_url}/api/embeddings",
            json={"model": self.model, "prompt": text}
        )
        return response.json()["embedding"]

class SimpleVectorStore:
    """A lightweight vector store for learning RAG basics."""
    def __init__(self, client):
        self.client = client
        self.store = [] # List of (text, vector)

    def add_text(self, text):
        vector = self.client.generate_embeddings(text)
        self.store.append((text, vector))

    def search(self, query, top_k=1):
        query_vec = self.client.generate_embeddings(query)
        # Simple cosine similarity (dot product for normalized vectors)
        results = []
        for text, vec in self.store:
            similarity = sum(a*b for a, b in zip(query_vec, vec))
            results.append((text, similarity))
        results.sort(key=lambda x: x[1], reverse=True)
        return results[:top_k]

if __name__ == "__main__":
    print("Ollama Client Ready. Start building!")
