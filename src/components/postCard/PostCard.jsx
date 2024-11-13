/* eslint-disable react/prop-types */
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import CommentModel from "../commentModel/CommentModel";


export default function PostCard({caption,images,likes,comments,id,setAlert,alert, postLike}) {
  return (
    <Card className="py-3 max-w-[300px] mx-auto">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large ">{caption}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl min-h-[200px] max-h-[200px]"
          src={`${images}`}
          width={270}
        />
      </CardBody>
      <div className="px-3 flex items-center justify-between">
      <small className="text-default-500 cursor-pointer hover:text-slate-100" onClick={()=>postLike(id)}>Likes <span>{likes.length}</span></small>
      <small className="text-default-500 hover:text-slate-100"><CommentModel id={id} comments={comments} setAlert={setAlert} alert={alert}/></small>
      </div>
    </Card>
  );
}