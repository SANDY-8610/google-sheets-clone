from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:@localhost/google-sheets-db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

class Sheet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cell = db.Column(db.String(10), nullable=False, unique=True)
    value = db.Column(db.Text, nullable=False)
    format = db.Column(db.JSON, nullable=False, default={})

with app.app_context():
    db.create_all()  # Creates table if not exists

spreadsheet_data = {}

@app.route("/", methods=["GET"])
def home():
    return "Flask Backend Running!"  # Test route

@app.route("/data", methods=["GET"])
def get_data():
    """Fetches all spreadsheet data."""
    return jsonify(spreadsheet_data)

@app.route("/update", methods=["POST"])
def update_cell():
    """Updates a single cell."""
    data = request.json
    cell = data.get("cell")
    value = data.get("value")

    if cell:
        spreadsheet_data[cell] = value
        return jsonify({"message": "Cell updated", "data": spreadsheet_data})

    return jsonify({"error": "Invalid request"}), 400

@app.route("/save", methods=["POST"])
def save_data():
    """Saves spreadsheet data to MySQL."""
    data = request.json["data"]
    try:
        for cell, value in data.items():
            existing = Sheet.query.filter_by(cell=cell).first()
            if existing:
                existing.value = value
            else:
                db.session.add(Sheet(cell=cell, value=value, format={}))
        db.session.commit()
        return jsonify({"message": "Saved to database"})
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
