User Table:

UserID (Primary Key)
Username
Email
Password (Hashed)
Bio
ProfilePictureURL
Category Table:

CategoryID (Primary Key)
CategoryName
Post Table:

PostID (Primary Key)
Title
Content
CreatedAt
UpdatedAt
UserID (Foreign Key referencing UserID of the author)
CategoryID (Foreign Key referencing CategoryID)
IsPublished (Boolean)
Comment Table:

CommentID (Primary Key)
PostID (Foreign Key referencing PostID)
UserID (Foreign Key referencing UserID of the commenter)
Content
CreatedAt
Like Table:

LikeID (Primary Key)
PostID (Foreign Key referencing PostID)
UserID (Foreign Key referencing UserID of the user who liked)
Actions:

User Sign Up and Sign In: Users can sign up with their details and sign in with their credentials.

Creating and Editing Posts: Users can create new posts and edit their existing posts.

Categorizing Posts: Users can assign categories to their posts.

Publishing Posts: Users can choose to publish or unpublish their posts.

Viewing Posts: Users can view all posts, filter by category, and search for posts.

Commenting on Posts: Users can leave comments on posts.

Liking Posts: Users can like posts.

Viewing User Profiles: Users can view profiles of other users.