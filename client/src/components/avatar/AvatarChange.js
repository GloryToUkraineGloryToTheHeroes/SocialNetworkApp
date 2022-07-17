import React from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

const storageName = 'userData'

export class AvatarChange extends React.Component {
 
  constructor(props) {
    super(props)
      this.state = {
        uploadStatus: false
      }
    this.handleUploadImage = this.handleUploadImage.bind(this);
  }
     
  handleUploadImage(ev) {
    
    ev.preventDefault()

    const data = new FormData()
    data.append('file', this.uploadInput.files[0])
    data.append('filename', '')

    const storageData = JSON.parse(localStorage.getItem(storageName))
    data.append('id', storageData.userId)

    

    axios.post('/files/avatar', data)
      .then(function (response) {
        this.setState({ imageURL: `//localhost:5000/${data.file}`, uploadStatus: true })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  
  deleteImage(e){
    e.preventDefault()

    const storageData = JSON.parse(localStorage.getItem(storageName))

    const data = {id: storageData.userId}
    /*
    fetch('/files/avatar/delete', {
      method: 'POST',
      body: data
    })
    */

    axios.post('/files/avatar/delete', data)
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
    
  }

  
  render() {
    return(
      <div className="container">
        <form onSubmit={this.handleUpload}>
          <div className='avatar-change-div'><b className='avatar-change-b'>Change avatar</b></div>
          
 
          <div class="file-field input-field" style={{display: 'flex'}}>
            <div class='avatar-change-button'>
              <b>File</b>
              <input ref={(ref) => { this.uploadInput = ref; }} accept='image/*' type="file" />
            </div>
            <div class="file-path-wrapper">
              <input class="file-path validate" type="text" />
            </div>
          </div>

          <p>
            <button className='avatar-change-button-upload' onClick={this.handleUploadImage}>
              <NavLink to='/account'><b className='avatar-change-b-upload'>Upload</b></NavLink>
            </button>          
            <button className='avatar-change-button-upload' onClick={this.deleteImage}>
              <NavLink to='/account'><b className='avatar-change-b-upload'>Delete</b></NavLink>
            </button>
          </p>

          
 
        </form>
      </div>
    )
  }
}


/*


<div className="form-group">
            <input className="form-control" ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Optional name for the file" />
          </div>



<div>
            <input ref={(ref) => { this.uploadInput = ref; }} accept='image/*' type="file" />
          </div>

*/