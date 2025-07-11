import requests
import os
import dotenv
import base64
from bs4 import BeautifulSoup
import markdown
import aiohttp
import asyncio
from utils.log_helper import utils_logger

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
        utils_logger.warning("Warning in fetch_repos: Source type is not specified.")
        return {'status': False, 'error': 'Source type is not specified.', 'code': 400}
    
    header = {
        "Authorization": f"token {token}",
        "Accept": "application/vnd.github+json"
    }

    try:
        response = requests.get(GITHUB_URL+f"/users/{prof_name}/repos", headers=header)
        utils_logger.info("Request to get GitHub repos has been made.")
        repos = response.json() # just dicts

        #loop.run_until_complete
        final_data = asyncio.run(return_data_format(repos, header, prof_name))

        # final_data = return_data_format(repos, header, prof_name) 
        return {'status': True, 'data': final_data, 'code': response.status_code}
    except Exception as e:
        utils_logger.error(f"Error in fetch_repo: {e} ")
        return {'status': False, 'error': str(e), 'code': 500}

async def fetch_repo_languages(repo, username, session):
    try:
        #replace requests with session.get
        async with session.get(GITHUB_URL+f"/repos/{username}/{repo}/languages") as response:
            utils_logger.info("Request to get languages has been made.")
            if response.status != 200:
                utils_logger.warning("Warning in fetch_repo_languages. Languages not success.")
                return []
            data = await response.json()
            return list(data.keys()) if data else []
    except Exception as e:
        utils_logger.error(f"Error in fetch_repo_languages: f{str(e)}")
        return []


async def fetch_parse_readme(repo, username, session):
    try:
        #replace requests with session.get
        async with session.get(GITHUB_URL+f"/repos/{username}/{repo}/readme") as response:
            utils_logger.info("Request to get GitHub repos readme has been made.")
            if response.status != 200:
                utils_logger.warning(f"Warning in fetch_parse_readme. No read me for {repo}")
                return ""
            response_json = await response.json()
            data = base64.b64decode(response_json['content']).decode('utf-8')
            html_format = markdown.markdown(data)
            soup = BeautifulSoup(html_format, "html.parser")
            description = soup.find("p")
            if description:
                return description.get_text()
            return ""
    except Exception as e:
        utils_logger.error(f"Error in fetch_parse_readme: str(e)")
        return ""

async def return_data_format(repos, header, prof_name):
    global ignored_repos
    return_data = []
    #create clientsession
    async with aiohttp.ClientSession(headers=header) as session:

        for repo in repos:
            if repo['name'] in ignored_repos:
                continue

            languages_task = asyncio.create_task(fetch_repo_languages(repo['name'], prof_name, session))
            description_task = asyncio.create_task(fetch_parse_readme(repo['name'], prof_name, session))
            languages, description = await asyncio.gather(languages_task, description_task)

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