package controllers

import (
	"fmt"
	"go-mysql/app/models"
	"net/http"
	"strconv"

	"gorm.io/gorm"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

type PostController struct {
	DB *gorm.DB
}

func NewPostController(db *gorm.DB) *PostController {
	return &PostController{DB: db}
}

// Validation based on defined validate in models
func ValidateModel(model any, c *gin.Context) (message []string) {
	validate := validator.New()
	err := validate.Struct(model)
	if err != nil {
		var errorsMap []string
		for _, e := range err.(validator.ValidationErrors) {
			errorsMap = append(errorsMap, e.Error())
		}
		c.JSON(http.StatusBadRequest, gin.H{"error": errorsMap})
		return errorsMap
	}
	return nil
}

// [POST] Controller to create articles
func (h *PostController) CreatePost(c *gin.Context) {
	var post models.Post
	err := c.BindJSON(&post)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := ValidateModel(post, c); err != nil {
		return
	}

	result := h.DB.Create(&post)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return

	}
	c.JSON(http.StatusCreated, post)
}

// [GET] Controller to get all articles
func (h *PostController) GetPosts(c *gin.Context) {
	var posts []models.Post
	limitQuery := c.Query("limit")
	offsetQuery := c.Query("offset")
	statusQuery := c.Query("status")

	limit, err := strconv.Atoi(limitQuery)
	if err != nil {
		limit = 10 // Default limit if not provided
	}

	offset, err := strconv.Atoi(offsetQuery)
	if err != nil {
		offset = 0 // Default offset if not provided
	}
	fmt.Print(limit, offset)
	query := h.DB.Model(&models.Post{})
	if statusQuery != "" {
		query = query.Where("status = ?", statusQuery)
	}

	var total int64
	query.Count(&total)
	query = query.Limit(limit).Offset(offset)

	result := query.Find(&posts)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error})
		return
	}

	c.JSON(http.StatusOK, gin.H{"total": total, "limit": limit, "offset": offset, "data": posts})
}

// [GET] Controller to get articles by id
func (h *PostController) GetPostByID(c *gin.Context) {
	id := c.Param("id")
	var post models.Post
	result := h.DB.First(&post, id)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Post not found"})
		return
	}
	c.JSON(http.StatusOK, post)
}

// [PUT] Controller to update article by id
func (h *PostController) UpdatePost(c *gin.Context) {
	id := c.Param("id")
	var post models.Post

	if err := ValidateModel(post, c); err != nil {
		return
	}

	if err := c.BindJSON(&post); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	result := h.DB.Model(&models.Post{}).Where("id = ?", id).Updates(post)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Post not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Article updated successfully"})
}

// [DELETE] Controller to delete article by id
func (h *PostController) DeletePost(c *gin.Context) {
	id := c.Param("id")
	var post models.Post

	result := h.DB.Delete(&post, id)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Post not found"})
		return
	}
	c.JSON(http.StatusNoContent, gin.H{"message": "Article deleted successfully"})
}
