## Task Manager
A lightweight and user-friendly to-do list application with secure authentication. This application helps user to stay organized and keep track of daily tasks.

### Features
Authentication
- User registration, login, and logout functionality
- Secure session management and route protection

Task Management
- Add new tasks and list
- Edit task detail
- Mark tasks as completed or incomplete
- Delete tasks permanently
- Real-time UI updates for seamless interaction
- Mark important tasks as starred for quick access

User-Specific Data
- Tasks are associated with individual user accounts
- Data is securely stored and retrieved from MongoDB

## Database Schema
This application uses MongoDB as its NoSQL database and Mongoose as the ODM for schema modeling. The full schema can be viewed [here](https://github.com/shuveksha-tuladhar/task-manager/edit/main/README.md),

| Collection | Description |
|-----------------|-------------|
| `Users`         | Stores user information such as name, email, and password. |
| `Lists`         | Represents task groups or categories. Each list is associated with a single user. |
| `Tasks`         | Contains individual tasks, including status (complete/incomplete) and importance. |



## Technology Used
Frontend

- TypeScript with React.js
- Zustand for state management
- Tailwind CSS for utility-first styling
- DaisyUI for accessible and customizable UI components

Backend
- Node.js with Express.js for server-side development
- MongoDB for database management
- Mongoose for elegant MongoDB object modeling

## Getting Started
- Clone this repository
    ```
    https://github.com/shuveksha-tuladhar/task-manager
    ```
- Set Up environment variable
  - Create a *.env* file in backend folder
    
  ```
  MONGO_URI=mongodb://localhost:27017/task_manager
  JWT_SECRET=secret_example
  PORT=4000
  ```

  - Create a *.env* file in frontend folder
  ```
  VITE_API_BASE_URL=http://localhost:4000
  ```
**Frontend**
- Change directory to frontend
```
cd frontend
```
- Install node libraries
```
npm install
```
- Run the frontend server
```
npm run dev
```

**Backend**
- Change the directory to backend.
```
cd backend
```
- Install node libraries
```
npm install
```
- Run the backend server on the port 4000
```
npm run dev
```
