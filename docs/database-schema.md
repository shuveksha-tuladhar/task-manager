# Task Manager

## Database Design

A MongoDB-based **Task Management System** with well-structured collections for handling users, lists, and individual tasks.

## Collections

### 1. Users Collection

Stores user details including profile information and associated lists.

```json
{
  "_id": ObjectId("67e70326de9957df819ceb17"),
  "name": "Alice Dawson",
  "email": "alice@example.com",
  "password": "hashed_password",
  "createdAt": ISODate("2025-03-28T20:14:30.765Z"),
  "updatedAt": ISODate("2025-03-28T20:14:30.765Z")
}
```

### 2. Lists Collection

Represents different task lists associated with a user.

```json
{
  "_id": ObjectId("67ef7a90ffc95f2ea2bc226e"),
  "name": "List 1",
  "userId": ObjectId("67e70326de9957df819ceb17"),
  "canDelete": true,
  "createdAt": ISODate("2025-03-09T10:05:00Z"),
  "createdAt": ISODate("2025-04-04T06:22:08.142Z")
}
```

### 3. Tasks Collection

Stores individual task details, including assignments and statuses.

```json
{
  "_id": ObjectId("67ec29b482ee070adc7a63a1"),
  "title": "New Task Title 1",
  "listId": ObjectId("67ef7a90ffc95f2ea2bc226e"),
  "userId": ObjectId("67e70326de9957df819ceb17"),
  "assignedTo": ObjectId("67e70326de9957df819ceb17"),
  "completed": false,
  "createdAt": ISODate("2025-04-01T18:00:20.378Z"),
  "priority": "medium",
  "updatedAt": ISODate("2025-04-08T00:54:16.727Z"),
  "isStarred": false
}
```

## Entities

### 1. **User (Users Collection)**

- A user can create and manage multiple task lists.
- A user can create tasks and be assigned tasks.
- Each user has a unique set of tasks and lists tied to their account.

### 2. **List (Lists Collection)**

- Represents a group of tasks.
- Each list belongs to a single user.
- A list contains multiple tasks.

### 3. **Task (Tasks Collection)**

- A task belongs to a specific list.
- A task can be marked as complete or incomplete.
- A task can be starred to indicate importance.

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

## Key Features

1. **My Day** – Displays tasks planned for today.
2. **Important** – Highlights tasks marked as important/starred.
3. **Tasks** – The main list containing all tasks.
4. **Custom Lists** – Allows users to create personal task lists (e.g., "My App Planner").
