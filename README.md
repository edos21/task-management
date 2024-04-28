# Task Management Project

## Table of Contents
- [Preview](#preview)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

## Preview

### List View
![Captura de pantalla 2024-04-28 a la(s) 18 42 04](https://github.com/edos21/task-management/assets/1489489/7c9c4bb0-7951-4411-b936-8295764170b9)

### Add Task View
![Captura de pantalla 2024-04-28 a la(s) 18 42 30](https://github.com/edos21/task-management/assets/1489489/2b8852d6-3389-497c-8058-7fdd356201fb)

## Technologies used
### Backend
- Python (Flask)
- SQLite (As database manager)
- Flask Migrate (To perform migrations)
- SQLAlchemy and Flask SQLAlchemy (Python SQL toolkit and ORM that gives application developers the full power and flexibility of SQL)

### Frontend
- ReactJS
- Redux
- Axios
- Bootstrap

## installation
### Backend
1. Clone the repository:
```bash
   git clone https://github.com/edos21/task-management.git
```
2.Navigate to the backend directory:
```bash
   cd api
```
3.Set up a virtual environment using pyenv and pipenv:
```bash
   pyenv install 3.8.12
   pipenv install
```
4.Run the server:
```bash
   flask run
```

### Frontend
1. Navigate to the frontend directory:
```bash
   cd client
```
2. Install dependencies:
```bash
npm install
```
4. Run the development server:
```bash
npm start
```
## API Endpoints
| Endpoint | Verb | Description |
| --- | --- | --- |
| /tasks | GET | Get all tasks |
| /tasks/:id | GET | Get a single task by ID |
| /tasks | POST | Create a new task |
| /tasks/:id | PUT | Update an existing task |
| /tasks/:id | DELETE | Delete a task |

## Contributing
If you would like to contribute to this project, please open an issue or submit a pull request.



