
# Github Organization Explorer

This app helps us to find the most popular repositories of an Organization or a regular user, on the basis of number of forks. Besides that we can see, the oldest forkers of that specific repositories.

Technologies used are React, React-bootstrap, Axios & Github API.


## Demo

The project is live at https://ritulkumawat.github.io/github-orgs-explorer/ on Github Pages. 


## Run Locally

Make sure that you have installed git, node & npm and 
it is enabled globally

Open your terminal & clone the project

```bash
  git clone https://github.com/RitulKumawat/Github-Organization-Explorer.git
```

Go to the project directory

```bash
cd Github-Organization-Explorer
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

Open http://localhost:3000 on your browser

### Some Important Points

1. The Github API allows only 60 requests per hour for a specific IP address.
2. The maximum number of repos you can get is 1000, as it is limited by the Github.
3. In every request, we can get maximum of 100 repos. So for getting 1000 repos - 10 requests are used
