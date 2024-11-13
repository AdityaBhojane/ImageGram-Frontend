import { useState } from 'react';
import { Input, Button, Card, Spacer } from '@nextui-org/react';
import api from '../../helper/api';

const CreatePost = () => {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
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
    }
    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('image', image);

    try {
      const response  = await api.post('/posts', formData, {
        headers: {
          'x-access-token': token,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Post created!');
      console.log(response)
      setCaption('');
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post');
    }
  };


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card className="p-10 w-[400px]" css={{ mw: '400px', padding: '20px' }}>
        <h3>Create New Post</h3>
        <form onSubmit={handleSubmit}>
          <Input clearable underlined label="Caption" value={caption} onChange={(e) => setCaption(e.target.value)} fullWidth required />
          <Spacer y={1} />
          <Input type="file" label="Upload Image" accept="image/*" onChange={handleImageUpload} fullWidth required />
          {imagePreview && <img src={imagePreview} alt="Image Preview" style={{ maxWidth: '100%', borderRadius: '8px' }} />}
          <Spacer y={1.5} />
          <Button className="my-4" type="submit" color="primary" fullWidth>Post</Button>
        </form>
      </Card>
    </div>
  );
};

export default CreatePost;
