import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import { Button, Modal } from 'react-materialize';

export default class RecipeImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: ''
    };
  }
  handleUpload(event) {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  handleSubmit() {
    let { imagePreviewUrl } = this.state;
    Meteor.call('uploadFile', this.props.id, imagePreviewUrl, (error, data) => {
      if (error) {
        Bert.alert(
          'Sorry, there was an error uploading the photo!',
          'danger',
          'growl-top-right',
          'fa-remove'
        );
        console.log(error);
      } else {
        Bert.alert(
          'Photo uploaded successfully!',
          'success',
          'growl-top-right',
          'fa-remove'
        );
      }
    });
  }

  renderPreviewImage() {
    let image = this.state.file
      ? <img className="preview-image" src={this.state.imagePreviewUrl} />
      : <div className="preview-image-placeholder" />;
    return (
      <div className="row">
        <div className="preview-image-container col s12 m6">
          {image}
        </div>
        <div className="col s12 m6">
          <Button waves="light">
            <label htmlFor="recipe-image">
              Choose Photo
            </label>
          </Button>
          <input
            id="recipe-image"
            className="upload-image"
            type="file"
            onChange={this.handleUpload.bind(this)}
          />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="recipe-image-wrapper col s6">
        {this.props.image
          ? <img className="recipe-image" src={this.props.image} />
          : <img className="recipe-image" src="/images/stock_image.jpg" />}

        <Modal
          header="Upload photo"
          trigger={
            <span className="upload-icon">
              <a className="tooltip" data-tip="Upload Photo">
                <i className="fa fa-camera iconText fa-2x" aria-hidden="true" />
              </a>
              <ReactTooltip place="bottom" type="dark" effect="float" />
            </span>
          }
          actions={
            <div>
              <Button
                waves="light"
                modal="close"
                flat
                onClick={this.handleSubmit.bind(this)}
              >
                Upload
              </Button>
              <Button waves="light" modal="close" flat>Cancel</Button>
            </div>
          }
        >
          {this.renderPreviewImage()}
        </Modal>
      </div>
    );
  }
}
