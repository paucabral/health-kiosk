# HIGH GROUNDS HEALTH KIOSK
A self-service health kiosk that performs differential diagnosis and provide recommendations for the user, as well as locate the nearby health facilities.

## Features
- :bar_chart: **Vital Signs** - Multiple sensors for measuring vital signs.
- :page_with_curl: **Differential Diagnosis** - Multiple sensors for measuring vital signs.
- :beetle: **Disease Information** - Shows disease information including the precautions to take.
- :hospital: **Nearby Facilities** - Locates the nearest facilities where the kiosk is deployed.

## Developers
- Jose Paulo C. Cabral | BS Computer Engineering | Systems Administration  | qjpccabral@tip.edu.ph
- Joshua Albert T. Lopez | BS Computer Engineering | Intelligent Systems  | qjatlopez@tip.edu.ph
- Reinhold E. Lucana | BS Computer Engineering | Systems Administration  | qrelucana@tip.edu.ph
- John Edward Sam T. Matienzo | BS Computer Engineering | Systems Administration  | qjestmatienzo@tip.edu.ph

## Creating a Development Environment
To run a development environment, simply follow the following steps:
1. Clone the repository on the intended local machine.
    ```
    $ git clone https://github.com/paucabral/health-kiosk.git
    ```
2. Create the respective `.env` files for both the backend and frontend applications. The respective `.env.sample` file for each can be used as a template for the environment variables needed inside each application.
3. Afterwards, run the `run-dev.sh` script from a `bash` shell to automate the process of installing the dependencies and running the respective applications. The backend server is a *Django* web application which runs on port `8000` while the frontend server is a *React* web application that runs on port `3000`.
    ```
    $ bash run-dev.sh
    ```