from flask import Flask, jsonify, request, render_template
from flask_cors import CORS  # 支持跨域請求
import json
import random
app = Flask(__name__)
CORS(app)  # 啟用跨域支持
# 讀取名言 JSON 文件
def load_quotes():
    try:
        with open("data/quotes.json", "r", encoding="utf-8") as file:
            return json.load(file)
    except FileNotFoundError:
        return []  # 如果文件未找到，返回空列表
@app.route('/')
def index():
    # 渲染主頁模板
    return render_template('index.html')
@app.route('/api/random', methods=['GET'])
def random_quote():
    quotes = load_quotes()
    if not quotes:
        return jsonify({"error": "No quotes available"}), 404
    return jsonify(random.choice(quotes))
@app.route('/api/category/<category>', methods=['GET'])
def category_quote(category):
    quotes = load_quotes()
    filtered = [q for q in quotes if q.get("category", "").lower() == category.lower()]
    if not filtered:
        return jsonify({"error": "No quotes found for this category"}), 404
    return jsonify(random.choice(filtered))
@app.route('/api/search/<keyword>', methods=['GET'])
def search_quote(keyword):
    quotes = load_quotes()
    filtered = [q for q in quotes if keyword.lower() in q.get("text", "").lower()]
    if not filtered:
        return jsonify({"error": "No quotes found matching the keyword"}), 404
    return jsonify(filtered)
@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Resource not found"}), 404
if __name__ == '__main__':
    app.run(debug=True)