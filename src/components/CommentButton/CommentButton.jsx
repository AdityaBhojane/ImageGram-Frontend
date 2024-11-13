/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Button,  Chip,  Input, Spacer } from "@nextui-org/react";
import api from "../../helper/api";
import Loader from "../../components/loader/Loader";

function CommentButton({ id, comments,setAlert,alert }) {
  const [replyContent, setReplyContent] = useState({});
  const [content, setContent] = useState("");
  const [comment, setComment] = useState([]);
  const [loading, setLoading] = useState(false);


  const token = localStorage.getItem("token");
  // console.log(comments)
  useEffect(() => {
    if (!comments || comments.length === 0) return;
  
    const fetchComments = async () => {
      try {
        setLoading(true);
        const query = comments.map((id) => `commentIds=${id}`).join("&");
        const response = await api.get(`/posts/comments?${query}`, {
          headers: { "Content-Type": "application/json" },
        });
        
        setComment(response.data.data || []);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchComments();
  }, [comments]); 
  

  // console.log(comment);

  // Function to handle new comment submission
  const handleCommentSubmit = async () => {
    try {
      const response = await api.post(
        "/comments",
        {
          onModel: "Post",
          content,
          commentableId: id,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      if (response.data.success) {
        setAlert(true);
        setContent("");
      }
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  // Function to handle reply submission
  const handleReplySubmit = async (parentCommentId) => {
    console.log(token)
    try {
      const response = await api.post(
        "/comments",
        {
          content: replyContent[parentCommentId],
          onModel: "Comment",
          commentableId: parentCommentId,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      if (response.data.success) {
        setReplyContent((prev) => ({ ...prev, [parentCommentId]: "" }));
      }
    } catch (error) {
      console.error("Error creating reply:", error);
    }
  };

  
  return (
    <>
   {loading?  <Loader/>:<div className="w-full h-[400px] overflow-scroll" style={{ maxWidth: "600px", margin: "auto", padding: "1rem" }}>
    <div className="">
      <h3>Comments</h3>
      {alert && <Chip color="success" className="text-md p-5 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] transition-all z-50">Comment Added !</Chip>}
      {/* Comment input */}
      <Input
        clearable
        bordered
        fullWidth
        labelPlaceholder="Write a comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Spacer y={1} />
      <Button auto onPress={handleCommentSubmit}>
        Submit Comment
      </Button>
    </div>

      <Spacer y={2} />

      {/* Displaying comments */}
      {comment?.map((comment) => (
        <div
          key={comment._id}
          className="border border-gray-300 rounded-lg p-4 mb-5"
        >
          <div className="mb-3">
            <p>{comment.content}</p>
            <button
              className="text-xs text-blue-500 hover:underline mt-2 flex items-center gap-2"
              onClick={() => {
                setReplyContent((prev) => ({ ...prev, [comment._id]: "" }));
              }}
              disabled
            >
              Reply <span className="text-[#ccc] text-[10px]"><i>(This option available soon ...)</i></span>
            </button>
          </div>

          {/* Replies */}
          {comment.replies?.map((reply) => (
            <div key={reply._id} className="pl-4 mt-2 border-l border-gray-200">
              <div className="bg-gray-100 p-2 rounded-lg">
                <p>{reply.content}</p>
              </div>
            </div>
          ))}

          {/* Reply input (only shown when clicking reply) */}
          {replyContent[comment._id] !== undefined && (
            <div className="pl-4 mt-2">
              <input
                type="text"
                placeholder="Write a reply..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                value={replyContent[comment._id]}
                onChange={(e) =>{
                  console.log("id-" ,comment._id)
                  setReplyContent((prev) => ({
                    ...prev,
                    [comment._id]: e.target.value,
                  }))}
                }
              />
              <div className="mt-2">
                <button
                  className="px-3 py-1 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onClick={() => handleReplySubmit(comment._id)}
                >
                  Submit Reply
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>}
    </>
  );
}

export default CommentButton;
