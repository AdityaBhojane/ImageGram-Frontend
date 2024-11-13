import { useEffect, useState } from 'react';
import { Input, Button, Card, Spacer, Chip } from '@nextui-org/react';
import api from '../../helper/api';

const CreatePost = () => {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [success, setSuccess] = useState(false)

  const token = localStorage.getItem('token');
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!caption || !image) {
      alert('Please add both a caption and an image');
      return;
    };
    if(caption.length <5){
      alert("caption length greater than 5")
      return;
    }
    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('image', image);

    try {
      setIsLoading(true);
      await api.post('/posts', formData, {
        headers: {
          'x-access-token': token,
          'Content-Type': 'multipart/form-data',
        },
      });
      setIsLoading(false);
      setSuccess(true);
      setCaption('');
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.error('Error creating post:', error);
    }
  };

  useEffect(()=>{
    if(caption || imagePreview){
      setIsError(false)
    }
  },[caption, imagePreview]);
  
  useEffect(()=>{
    setTimeout(()=>{
      setSuccess(false);
    },1000);
    return ()=> clearTimeout();
  },[success])


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {success && <Chip color="success" className="text-md p-5 absolute top-[20%] left-[50%] -translate-x-[50%] -translate-y-[50%] transition-all z-50">Post Added !</Chip>}
      <Card className="p-10 w-[400px]" css={{ mw: '400px', padding: '20px' }}>
        <h3>Create New Post</h3>
        <form onSubmit={handleSubmit}>
          <Input clearable className='mb-5' underlined label="Caption" value={caption} onChange={(e) => setCaption(e.target.value)} fullWidth required />
          <Spacer y={1} />
          <Input type="file" className='my-2' label="Upload Image" accept="image/*" onChange={handleImageUpload} fullWidth required />
          {imagePreview && <img src={imagePreview} alt="Image Preview" style={{ maxWidth: '100%', borderRadius: '8px' }} />}
          <Spacer y={1.5} />
          <Button type="submit" className={`${isError? "bg-danger":"bg-primary"} mt-2`} fullWidth isLoading={isLoading}>
            {isError? "Something is wrong !":"Post"}
          </Button>
        </form>
        <div className="text-center">
          <p className="text-[12px] text-[#CCC] mt-5">
            Only JPG/PNG format allowed
          </p>
        </div>
      </Card>
    </div>
  );
};

export default CreatePost;
