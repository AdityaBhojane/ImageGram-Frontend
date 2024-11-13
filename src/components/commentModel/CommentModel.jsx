/* eslint-disable react/prop-types */
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import CommentButton from "../CommentButton/CommentButton";

export default function CommentModel({ comments, id,setAlert, alert}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button className="bg-transparent text-default-500 h-6" onPress={onOpen}>
        Comments : {comments.length}
      </Button>
      <Modal  isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent  className="bg-slate-700 text-white">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col  gap-1">
                All Comments
              </ModalHeader>
              <ModalBody>
                <CommentButton comments={comments} setAlert={setAlert} alert={alert} id={id}/>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
