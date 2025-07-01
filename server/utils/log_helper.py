import logging
import os


def logger_setup(name, log_file):
    log_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'logs')
    os.makedirs(log_path, exist_ok=True)
    logger = logging.getLogger(name)
    log_file_path = os.path.join(log_path, log_file)
    logger_output = logging.FileHandler(log_file_path)

    frmt = logging.Formatter("%(name)s: %(asctime)s | %(levelname)s | %(filename)s:%(lineno)s | %(process)d >>> %(message)s")
    logger_output.setFormatter(frmt)
    logger.setLevel(logging.INFO)
    logger.addHandler(logger_output)
    return logger


app_logger = logger_setup("app", "app.log")
routes_logger = logger_setup("routes", "routes.log")
utils_logger = logger_setup("utils", "utils.log")