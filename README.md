# Articles Page with Go, MySQL, and ReactJS

### Description
The articles page is a dynamic web application built with Golang, MySQL, and React. The backend, powered by Golang and MySQL, handles article data management, including CRUD operations, publishing, and status changes (draft, published, trash). The frontend, built with React, provides a user-friendly interface to view a list of articles, their details, and manage their statuses. Users can easily switch between published, draft, and trashed articles, enabling efficient content management.

### Documentation
- [Backend - README](backend/README.md) | [Postman Collection](go-mysql-articles.postman_collection.json)
- [Frontend - README](frontend/README.md)
![simulation](simulation.gif)


### Project Structure
```
root
├── backend  # Go-MySQL
│   ├── app
│   |    ├──controllers
│   |    └──models
│   ├── config
│   ├── routes
│   ├── main.go
│   └── ...
├── frontend  # ReactJS
│   ├── src
│   │   ├── routes
│   │   ├── store
│   │   ├── pages
│   │   ├── api
│   │   └── ...
│   ├── public
│   ├── package.json
│   └── ...
└── ...
```