package models

import (
	"time"
)

type Post struct {
	ID        uint       `gorm:"type:int;AUTO_INCREMENT;primaryKey" json:"id"`
	Title     string     `gorm:"type:varchar(200)" json:"title" validate:"omitempty,min=20,max=200"`
	Category  string     `gorm:"type:varchar(100)" json:"category" validate:"omitempty,min=3,max=100"`
	Status    string     `gorm:"type:varchar(100)" json:"status" validate:"omitempty,oneof=publish draft trash,max=100"`
	Content   string     `gorm:"type:text" json:"content" validate:"omitempty,min=200"`
	CreatedAt *time.Time `gorm:"type:timestamp;default:CURRENT_TIMESTAMP()" json:"created_at"`
	UpdatedAt *time.Time `gorm:"type:timestamp;default:CURRENT_TIMESTAMP()" json:"updated_at"`
}
