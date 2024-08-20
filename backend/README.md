# Go-MySQL API

### Description

This project demonstrates a simple CRUD (Create, Read, Update, Delete) application built with Golang and the official MongoDB driver. It allows you to manage a articles, including their details, links, and start/end dates.

### Models:
Represents a post with details below.

```golang
type Post struct {
	ID        uint       `gorm:"type:int;AUTO_INCREMENT;primaryKey" json:"id"`
	Title     string     `gorm:"type:varchar(200)" json:"title" validate:"omitempty,min=20"`
	Category  string     `gorm:"type:varchar(100)" json:"category" validate:"omitempty,min=3"`
	Status    string     `gorm:"type:varchar(100)" json:"status" validate:"omitempty,oneof=publish draft trash"`
	Content   string     `gorm:"type:text" json:"content" validate:"omitempty,min=200"`
	CreatedAt *time.Time `gorm:"type:timestamp;default:CURRENT_TIMESTAMP()" json:"created_at"`
	UpdatedAt *time.Time `gorm:"type:timestamp;default:CURRENT_TIMESTAMP()" json:"updated_at"`
}
```

### Prerequisites:
- Golang (version 1.16 or later)
- Local or Cloud MySQL server

### Installation:
- Clone this repository.
- Install dependencies using `go mod download`.
- Add file `.env` with these variables
```golang
PORT=8080

DB_HOST=...
DB_PORT=3306
DB_USER=...
DB_PASSWORD=...
DB_NAME=posts
```

### Running the Application:
- Compile and run the application: `go run main.go`

### API Endpoints:

- `GET /articles`: Retrieves all article.
- `GET /articles/{id}`: Retrieves a specific article by ID.
- `GET /articles/?limit={limit}&offset={offset}`: Retrieves articles by limit and offset.
- `GET /articles/?status={status}`: Filter articles by status.
- `POST /articles`: Creates a new article. (Payload should be a JSON object representing the Post struct)
- `PUT /articles/{id}`: Updates an existing article. (Payload should be a JSON object with updated Post information)
- `DELETE /articles/{id}`: Deletes an existing article.