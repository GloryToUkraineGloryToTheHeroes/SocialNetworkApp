import React from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

/*

add description to post

*/


const storageName = 'userData'

export class AddPost extends React.Component {
 
    constructor(props) {
      super(props)
        this.state = {
          uploadStatus: false
        }
      this.handleUploadImage = this.handleUploadImage.bind(this);
    }

    /*
    
    description
    
    */

    
       
    handleUploadImage(ev) {
      
      

      ev.preventDefault()
  
      const data = new FormData()
      const inputFileName = ''
      data.append('file', this.uploadInput.files[0])
      data.append('filename', inputFileName)
  
      const storageData = JSON.parse(localStorage.getItem(storageName))
      data.append('id', storageData.userId)
  
      
  
      axios.post('/files/posts/upload', data)
        .then(function (response) {// eslint-disable-next-line
          this.setState({ imageURL: `//localhost:5000/${data.file}`, uploadStatus: true })
        })
        .catch(function (error) {// eslint-disable-next-line
          console.log(error)
        })
    }
  
    
    render() {
      return(
        <div className="container">
          <div className='avatar-change-div'><b className='avatar-change-b'>Add post</b></div>
          <form onSubmit={this.handleUpload}>
            
   
            <div className="file-field input-field" style={{display: 'flex'}}>
              <div class='avatar-change-button'>
                <b>File</b>
                <input ref={(ref) => { this.uploadInput = ref }} accept='image/*' type="file" />
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
              </div>
            </div>
  
            <div className='add-post-main'>
              <button className='add-post-div-main' onClick={this.handleUploadImage}>
                <NavLink to='/account'>
                  <div className='add-post-div-b'><b className='avatar-change-b-upload'>Upload</b></div>
                </NavLink>
              </button>          
              
            </div>
  
            
   
          </form>
        </div>
      )
    }
  }

















/*

deleteImage(e){
      e.preventDefault()
  
      const storageData = JSON.parse(localStorage.getItem(storageName))
  
      const data = {id: storageData.userId}
  
      axios.post('/files/avatar/delete', data)
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
      
    }

<button className="btn btn-success" onClick={this.deleteImage}>
                <NavLink to='/account' >Delete</NavLink>
              </button>

*/