//  This code establishes associations (relationships) between the User, Post, and Comment models.

const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

Post.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
    foreignKey: 'postId',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignkey: 'userId',
    onDelete: 'CASCADE'
});

module.exports = {
    User,
    Comment,
    Post
};