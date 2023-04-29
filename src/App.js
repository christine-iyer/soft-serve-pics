import { useState, useEffect } from 'react'
import axios from 'axios'
const url = 'cloudinary://145837185735489:j3d6-pGzyptW6ao3uvKCpSW6Gh4@dqjhgnivi';
const preset = 'crystal';

export default function App() {
  const [file, setFile] = useState()
  const [description, setDescription] = useState("")
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const onChange = e => {
    setImage(e.target.files[0]);
  };

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', preset);
    try {
      setLoading(true);
      const res = await axios.post(url, formData);
      const imageUrl = res.data.secure_url;
      const image = await axios.post('http://localhost:3001/upload', {
        imageUrl
      });
      setLoading(false);
      setImage(image.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    async function fetchImage() {
      const image = await axios.get('http://localhost:3001/getLatest');
      setImage(image.data);
    }
    fetchImage();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="App">
      <form onSubmit={onSubmit}>
      <input type='file' name='image' onChange={onChange} />

   


        <input className='file-path validate' type='text' 
        />
        <button onClick={onSubmit} className='btn center'>
          upload
        </button>
      </form>
      {/* { image && <img src={image}>} */}
    </div>
  )
}