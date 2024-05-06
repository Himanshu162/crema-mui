import  { useState } from 'react';
import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import EditIcon from '@mui/icons-material/Edit';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import PropTypes from 'prop-types';
import './music.css';
import MyDrawer from './MyDrawer';
import { BotProvider } from '@crema/eOfficeBot/BotContext';
import Bot from '@crema/eOfficeBot/Component/Bot';

function Tab({ label, isActive, onClick }) {
  return (
    <button  style={{marginRight:'10px'}} className={isActive ? 'active' : ''} onClick={onClick}>
      {label==='Video'?<VideoCameraFrontIcon/>:<AudioFileIcon/>} {label}
      {console.log(label)}
    </button>
    
  );
}

Tab.propTypes = {
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};


const index = () => {
 
  const [audioFiles, setAudioFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [currentTab, setCurrentTab] = useState('audio');
  const [showPopup, setShowPopup] = useState(false);
  const [songInfo, setSongInfo] = useState({
    name: '',
    description: '',
    author: '',
    file: null,
  });

  const [editSongIndex, setEditSongIndex] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSongInfo((prevSongInfo) => ({ ...prevSongInfo, file }));
  };

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  const handlePlay = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const container = document.createElement('div');
      container.className = 'video-container';
      container.style.position = 'fixed';
      container.style.bottom = '27px';
      container.style.right = '50px';
  
      if (currentTab === 'audio') {
        const audio = new Audio(reader.result);
        audio.play();
      } 
      else if (currentTab === 'video') {
        const video = document.createElement('video');
        video.src = reader.result;
        video.controls = true;
        video.style.maxWidth = '550px';
        container.appendChild(video);
        document.body.appendChild(container);
        video.addEventListener('ended', () => {
          document.body.removeChild(container);
        });
  
        video.play();
      }
    };
    reader.readAsDataURL(file);
  };
  

  const handleDelete = (file) => {
    if (currentTab === 'audio') {
      setAudioFiles((prevAudioFiles) =>
        prevAudioFiles.filter((audioFile) => audioFile.file !== file)
      );
    } else {
      setVideoFiles((prevVideoFiles) =>
        prevVideoFiles.filter((videoFile) => videoFile.file !== file)
      );
    }
  };
  
  const handlePopupSubmit = () => {
    if (!songInfo.name || !songInfo.description || !songInfo.author || !songInfo.file) {
      alert('Please fill in all fields and select a file.');
      return;
    }

  const newSong = { ...songInfo };

    if (editSongIndex !== null) {
      if (currentTab === 'audio') {
        setAudioFiles((prevAudioFiles) => {
          const updatedAudioFiles = [...prevAudioFiles];
          updatedAudioFiles[editSongIndex] = newSong;
          return updatedAudioFiles;
        });
      } 
      else if (currentTab === 'video') 
      {
        setVideoFiles((prevVideoFiles) => {
        const updatedVideoFiles = [...prevVideoFiles];
        updatedVideoFiles[editSongIndex] = newSong;
        return updatedVideoFiles;
        
       });
      }
      setEditSongIndex(null); 
    } 
    else 
      {
        if (newSong.file.type.startsWith('audio')) {
          setAudioFiles((prevAudioFiles) => [...prevAudioFiles, newSong]);
        } 
        else if (newSong.file.type.startsWith('video')) {
          setVideoFiles((prevVideoFiles) => [...prevVideoFiles, newSong]);
        }
      }

    setShowPopup(false);
    setSongInfo({ name: '', description: '', author: '', file: null });
  };

  const handleEdit = (index) => {
    const songToEdit = currentTab === 'audio' ? audioFiles[index] : videoFiles[index];
    setSongInfo({ ...songToEdit });
    setEditSongIndex(index);
    setShowPopup(true);
  };

  const handleImageClick = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <>
     
      {
      /* <BotProvider>
          <Bot />
        </BotProvider> */
      }
      
      <div className="upld" >
        <label className="btn2" onClick={() => setShowPopup(true)}>
          <strong>
            <h2> {editSongIndex !== null ? 'Edit File' : 'Add File'}</h2>
          </strong>
          <CloudUploadIcon style={{ fontSize: 70, marginTop: 10, color: 'blue' }} />
        </label>
      </div>
      {/* <MyDrawer/> */}
      <div className="tabs" >
        <Tab
          label="Audio"
          isActive={currentTab === 'audio'}
          onClick={() => handleTabChange('audio')}
        />
        <Tab
          label="Video"
          isActive={currentTab === 'video'}
          onClick={() => handleTabChange('video')}
        />
      </div>

      <div className="file-list" >
        {currentTab === 'audio' && (
          <div >
            <table >
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Artist</th>
                  <th>Description</th>
                  <th>Controls</th>
                </tr>
              </thead>
              <tbody>
                {audioFiles.map((song, index) => (
                  <tr key={index}>
                    <td>{song.name}</td>
                    <td>{song.author}</td>
                    <td>{song.description}</td>
                    <td>
                    <Stack direction="row" spacing={2}>
                      <Button variant="contained" startIcon={<PlayCircleIcon/>}  onClick={() => handlePlay(song.file)}>Play</Button>
                      <Button variant="contained" startIcon={<DeleteIcon />} onClick={() => handleDelete(song.file)}>Delete</Button>
                      <Button variant="contained" startIcon={<EditIcon/>}  onClick={() => handleEdit(index)}>Edit</Button>
                    </Stack>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {currentTab === 'video' && (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Artist</th>
                  <th>Description</th>
                  <th>Controls</th>
                </tr>
              </thead>
              <tbody>
                {videoFiles.map((song, index) => (
                  <tr key={index}>
                    <td>{song.name}</td>
                    <td>{song.author}</td>
                    <td>{song.description}</td>
                    <td>
                    <Stack direction="row" spacing={2}>
                      <Button variant="contained" startIcon={<PlayCircleIcon/>} onClick={() => handlePlay(song.file)}>Play</Button>
                      <Button variant="contained" startIcon={<DeleteIcon />} onClick={() => handleDelete(song.file)}>Delete</Button>
                      <Button variant="contained" startIcon={<EditIcon/>} onClick={() => handleEdit(index)}>Edit</Button>
                    </Stack>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={() => setShowPopup(false)}> &times; </span>
            <h2>{editSongIndex !== null ? 'Edit Song' : 'Upload Song'}</h2>
            
            <div style={{ position: 'absolute', top: 100, left: 450 }}>
              <div style={{ width: '190px', height: '120px', cursor: 'pointer', border:'4px dotted black', textAlign:'center'  }} onClick={handleImageClick}><strong>Upload</strong><br></br><CloudUploadIcon/></div>
              
              <input id="fileInput" type="file" name="files" accept="audio/*,video/*" onChange={handleFileChange} style={{ display: 'none' }} />
              
            </div>

            <div style={{ textAlign:'left'}}>
              <label>Title</label><br/>
              <input className="dinp" type="text" value={songInfo.name} onChange={(e) => setSongInfo({ ...songInfo, name: e.target.value })}/><br/>
              <label>Artist</label><br/>
              <input className="dinp" type="text" value={songInfo.author} onChange={(e) => setSongInfo({ ...songInfo, author: e.target.value })}/><br/>
              <label>Description</label><br/>
              <textarea cols="20" rows="6" className="dinp"  type="text" value={songInfo.description} onChange={(e) => setSongInfo({ ...songInfo, description: e.target.value })} /><br/>
              <Button variant="contained" color="success" id="btnup" onClick={handlePopupSubmit} >{editSongIndex !== null ? 'Edit' : 'Submit'}</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default index
