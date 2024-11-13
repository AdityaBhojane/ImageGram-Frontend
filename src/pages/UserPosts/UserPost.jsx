/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import api from "../../helper/api";
import UserPostsCard from "../../components/userPosts/UserPostsCard";
import Loader from "../../components/loader/Loader";

function UserPosts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [isDelete, setIsDelete] = useState(false)

    async function deletePost(postId) {
        try {
          const response = await api.delete(`/posts/${postId}`, {
            headers: {
              "x-access-token": token,
              "Content-Type": "application/json",
            },
          });
    
          if (response.data.success) {
            console.log("Post deleted successfully");
            setIsDelete(pre => !pre)
          } else {
            console.log("Failed to delete post");
          }
        } catch (error) {
          console.error(
            "Error deleting post:",
            error.response?.data || error.message
          );
        }
      }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await api.get("/posts/user", {
          headers: {
            "x-access-token": token,
            "Content-Type": "application/json",
          },
        });
        if (response.data && response.data.posts) {
          setPosts(response.data.posts);
          setLoading(false);
        } else {
          setError("No posts found.");
        }
      } catch (error) {
        setError(
          "Error fetching posts: " +
            (error.response?.data?.message || error.message)
        );
        console.error("Error fetching posts:", error);
      }
    };

    if (token) {
      fetchPosts();
    } else {
      setError("Token is missing.");
    }
  }, [token,isDelete]);

 
  return (
    <div className="max-w-[100vw] min-h-screen h-full bg-[#858585]">
      <div className="w-[80vw] p-5 mx-auto grid grid-cols-4 gap-5 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {loading ? (
          <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
          <Loader />
        </div> // Show loading message or spinner
        ) : (
          posts?.map((post) => (
            <UserPostsCard
              key={post._id}
              id={post._id}
              caption={post.caption}
              images={post.image}
              likes={post.likes}
              comments={post.comments}
              deletePost={deletePost}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default UserPosts;
