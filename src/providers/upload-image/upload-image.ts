import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker,ImagePickerOptions} from '@ionic-native/image-picker/ngx';

/*
 Generated class for the UploadImageProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */

@Injectable()
export class UploadImageProvider {
  constructor(private camera: Camera,private imagePicker: ImagePicker) { }

    selectFromAlbum():Promise<any>{
        const options: ImagePickerOptions = {
            maximumImagesCount:1,
            width:100,
            height:100,
            quality:50
        };
        return new Promise((resolve, reject) => {
        this.imagePicker.getPictures(options).then((results) => {
            resolve(results);
        }, (err) => {
            reject(err)
        });
        })
  }
  takePicture():Promise<any>{
      const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    return new Promise((resolve, reject) => {
      this.camera.getPicture(options).then((results) => {
        resolve(results);
      }, (err) => {
        reject(err)
      });
    });
  }
}