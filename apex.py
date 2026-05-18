import os
from playwright.sync_api import sync_playwright
from flask import Flask, request, send_from_directory

app = Flask(__name__, static_folder=".", static_url_path="")



@app.route("/")
def index():
    return send_from_directory(".", "apex.html")

@app.route("/scrape")
def scrape():
    url = request.args.get("url")
    with sync_playwright() as p:

        url = request.args.get("url") 
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        page.goto(url)
        page.wait_for_load_state()

        html = page.content()
        browser.close()
    
    return html

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)