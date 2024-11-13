import { useState, useEffect } from "react";
import PostCard from "../../components/postCard/PostCard";
import api from "../../helper/api";
import Loader from "../../components/loader/Loader";
import { Chip } from "@nextui-org/react";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // Fetch posts from the backend
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts");
        // await new Promise((res) => setTimeout(res, 1000));
        const data = response.data.data.posts;
        setPosts(data);
        setAlert(false);
        setIsLiked(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [isLiked,alert]);

  const [likeResponse, setLikeResponse] = useState([])
  const token = localStorage.getItem("token");

  async function postLike(postId) {
        if(!token){
          console.log("login required")
          return;
        }
        const response = await api.post('/likes', {
          onModel: "Post",
          likeableId: postId,
        },
        {
          headers: {
            "x-access-token": token,
          },
        });
        if(!response){
          console.log("something is wrong with API")
          return;
        }
        setLikeResponse(response.data )
        setIsLiked(true);
    }

    console.log(alert)

  return (
    <div>
      <div className="max-w-[100vw] min-h-screen h-full bg-[#858585]">
      {isLiked && <Chip className={`text-md p-5 fixed top-[10%] left-[44%] ${likeResponse.liked? "bg-green-600":"bg-red-600"}  transition-all animate-appearance-in z-50`}>{likeResponse.message} !</Chip>}
        <div className="w-[80vw] p-5 mx-auto grid grid-cols-4 gap-5 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {loading ? (
            <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
              <Loader />
            </div> // Show loading message or spinner
          ) : (
            posts.map((post) => (
              <PostCard
                key={post._id}
                id={post._id}
                caption={post.caption}
                images={post.image}
                likes={post.likes}
                comments={post.comments}
                setAlert={setAlert}
                alert={alert}
                isLiked={isLiked}
                setIsLiked={setIsLiked}
                postLike={postLike}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
