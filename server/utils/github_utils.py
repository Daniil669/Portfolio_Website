import requests
import os
import dotenv
import base64
from bs4 import BeautifulSoup
import markdown

dotenv.load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

GITHUB_URL = "https://api.github.com"

ignored_repos = ("keymaster", "Exam_1_185_2020", "informatics_185_2020", "AaDS_1_185_2021")


def fetch_repos(gith_type):
    if gith_type == "uni":
        prof_name = os.environ.get("GITHUB_UNI_USERNAME", "")
        token = os.environ.get("GITHUB_UNI_TOKEN", "")
    elif gith_type == "pers":
        prof_name = os.environ.get("GITHUB_PERSONAL_USERNAME", "")
        token = os.environ.get("GITHUB_PERSONAL_TOKEN", "")
    else:
        return {'status': False, 'error': 'Source type is not specified.', 'code': 400}
    
    header = {
        "Authorization": f"token {token}",
        "Accept": "application/vnd.github+json"
    }

    try:
        response = requests.get(GITHUB_URL+f"/users/{prof_name}/repos", headers=header)
        repos = response.json() # just dicts
        final_data = return_data_format(repos, header, prof_name)
        return {'status': True, 'data': final_data, 'code': response.status_code}
    except Exception as e:
        return {'status': False, 'error': str(e), 'code': 500}

def fetch_repo_languages(repo, header, username):
    try:
        response = requests.get(GITHUB_URL+f"/repos/{username}/{repo}/languages", headers=header)
        if response.status_code != 200:
            print("languages not success")
            return []
        data = response.json()
        return list(data.keys()) if data else []
    except Exception as e:
        print(str(e))
        return []


def fetch_parse_readme(repo, header, username):
    try:
        response = requests.get(GITHUB_URL+f"/repos/{username}/{repo}/readme", headers=header)
        if response.status_code != 200:
            print(f"No read me for {repo}")
            return ""
        response_json = response.json()
        data = base64.b64decode(response_json['content']).decode('utf-8')
        html_format = markdown.markdown(data)
        soup = BeautifulSoup(html_format, "html.parser")
        description = soup.find("p")
        if description:
            return description.get_text()
        return ""
    except Exception as e:
        print(str(e))
        return ""

def return_data_format(repos, header, prof_name):
    global ignored_repos
    return_data = []
    for repo in repos:
        if repo['name'] in ignored_repos:
            continue
        languages = fetch_repo_languages(repo['name'], header, prof_name)
        description = fetch_parse_readme(repo['name'], header, prof_name)
        final_repo_info = {
            'name': repo['name'],
            'main language': repo['language'], # fallback for languages
            'languages': languages, # fallback for techstack
            'description': description,
            'source code': repo['html_url'],
            'created': repo['created_at'],
            'last update': repo['updated_at'],
            'demo': ""
        }
        return_data.append(final_repo_info)
    return return_data