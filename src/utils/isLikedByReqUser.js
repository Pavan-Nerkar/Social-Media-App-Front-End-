export const isLikedByReqUser = (reqUserId, post) => {
  if (!post || !Array.isArray(post.liked)) {
    return false; // prevent crash if post or post.liked is missing
  }
  return post.liked.some(user => user.id === reqUserId);
};
