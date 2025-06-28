import requests
import os
import dotenv
import base64
import beautifulsoup4

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
        final_data = return_data_format(repos, header)
        return {'status': True, 'data': final_data, 'code': response.status_code}
    except Exception as e:
        return {'status': False, 'error': str(e), 'code': 500}

def fetch_repo_languages(header):
    try:
        languages = []
        response = requests.get(GITHUB_URL+"/repos/{username}/{repo}/languages")
        for language in response.keys():
            languages.append(language)
        return languages
    except Exception as e:
        return ""


def fetch_parse_readme(header):
    pass

def return_data_format(repos, header):
    global ignored_repos
    return_data = []
    for repo in repos:
        if repo['name'] in ignored_repos:
            continue
        languages = fetch_repo_languages(header)
        description_techstack = fetch_parse_readme(header)
        final_repo_info = {
            'name': repo['name'],
            'main language': repo['language'],
            'languages': languages,
            'tech stack': description_techstack['techstach'] if description_techstack['techstack'] else "",
            'description': description_techstack['description'],
            'source code': repo['html_url'],
            'created': repo['created_at'],
            'last update': repo['updated_at'],
            'demo': ""
        }
        return_data.append(final_repo_info)
    return return_data