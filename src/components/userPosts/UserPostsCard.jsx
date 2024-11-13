/* eslint-disable react/prop-types */
import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";

export default function UserPostsCard({ id, caption, images, likes, comments, deletePost }) {
    
  

  return (
    <Card className="p-4 ">
      <CardHeader className="px-4 flex-col items-start overflow-hidden">
        <h4 className="font-bold text-large">{caption}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={`${images}`}
          width={270}
        />
      </CardBody>
      <div className="px-4">
        <div className="flex items-center justify-between">
          <small className="text-default-500">Likes : {likes.length}</small>
          <small className="text-default-500">
            Comments : {comments.length}
          </small>
        </div>
        <div className="text-center">
          <Button onClick={()=> deletePost(id)} className="w-full h-8 mt-5" color="danger">Delete </Button>
        </div>
      </div>
    </Card>
  );
}
