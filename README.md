# HackNYU-UkraineRussiaNews

## How to set up environment
* Inside `/venv-app`, create a virtual environment with the following command: `python3 -m venv venv`.
* Activate the virtual environment with `source venv/bin/activate`.
* If you have an older version of pip, then do python3 -m pip install --upgrade pip.
* If you have successfully activated the virtual environment, you should see a `"venv"` tag in your terminal. 
* Install required packages using `pip install -r requirements.txt`
* If you want to install any additional libraries, install them into the environment using `pip install <package-name>`. Save your dependencies into `requirements.txt` using `pip freeze > requirements.txt`. 

## How to Open app
* Inside `/server`, run the backend using `python3 app.py` or `flask run`.
* Inside  `/client`, first install any client dependences with `npm i`. Run the web app with `npm start`
* There you go! You a React app will open on your browser, and feel free to explore with our app offers!