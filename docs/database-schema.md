# Task Manager

## Database Design

A MongoDB-based **Task Management System** with well-structured collections for handling users, lists, tasks, and categories efficiently.

## Collections

### 1. Users Collection

Stores user details including profile information and associated lists.

```json
{
  "_id": ObjectId("user_id"),
  "name": "Alice Dawson",
  "email": "alice@example.com",
  "passwordHash": "hashed_password",
  "createdAt": ISODate("2025-03-09T10:00:00Z")
}
```

### 2. Lists Collection

Represents different task lists associated with a user.

```json
{
  "_id": ObjectId("list_id_1"),
  "name": "My Day",
  "userId": ObjectId("user_id"),
  "tasks": [ObjectId("task_id_1"), ObjectId("task_id_2")],
  "createdAt": ISODate("2025-03-09T10:05:00Z")
}
```

### 3. Tasks Collection

Stores individual task details, including assignments and statuses.

```json
{
  "_id": ObjectId("task_id_1"),
  "listId": ObjectId("list_id_1"),
  "userId": ObjectId("user_id"),
  "assignedTo": [ObjectId("user_id_2")],
  "title": "Cook Sushi",
  "description": "Prepare and cook sushi for dinner",
  "completed": false,
  "important": true,
  "priority": "high",
  "category": ObjectId("category_id"),
  "dueDate": ISODate("2025-03-10T18:00:00Z"),
  "reminderAt": ISODate("2025-03-10T16:00:00Z"),
  "createdAt": ISODate("2025-03-09T10:10:00Z"),
  "updatedAt": ISODate("2025-03-09T10:15:00Z")
}
```

### 4. Categories Collection

Defines categories to classify tasks efficiently.

```json
{
  "_id": ObjectId("category_id"),
  "name": "Planned" // Example categories: "Planned", "Important", "Assigned"
}
```

## Entities

### 1. **User (Users Collection)**

- A user can have multiple task lists.
- A user can create and be assigned tasks.

### 2. **List (Lists Collection)**

- Represents a group of tasks.
- Each list belongs to a single user.
- A list contains multiple tasks.

### 3. **Task (Tasks Collection)**

- A task has attributes like title, description, status, due date, and priority.
- Tasks can be assigned to one or multiple users.
- Tasks can belong to predefined categories.

### 4. **Category (Categories Collection)**

- Tasks are categorized (Planned, Important, Assigned, Flagged, etc.).
- Categories help filter tasks efficiently.

## Key Relationships

1. **Users (1) → (M) Lists**
   - A user owns multiple lists.
   - Each list belongs to one user.
2. **Lists (1) → (M) Tasks**
   - A list contains multiple tasks.
   - A task belongs to one list.
3. **Users (M) → (M) Tasks**
   - A task can be assigned to multiple users.
   - A user can be assigned multiple tasks.
4. **Tasks (M) → (1) Category**
   - Each task belongs to one category.
   - Categories help classify tasks into lists like Planned, Important, etc.
5. **Tasks (1) → (1) Reminder**
   - A task can have a single reminder.

## Key Features

1. **My Day** – Displays tasks planned for today.
2. **Important** – Highlights tasks marked as important.
3. **Planned** – Shows tasks with due dates.
4. **Assigned to Me** – Lists tasks assigned to the user.
5. **Tasks** – The main list containing all tasks.
6. **Custom Lists** – Allows users to create personal task lists (e.g., "My App Planner").


