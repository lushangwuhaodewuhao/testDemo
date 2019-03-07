import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";
import { CameraPreview,CameraPreviewPictureOptions,CameraPreviewOptions } from "@ionic-native/camera-preview/ngx";


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  cameraStarted: boolean = false;
  picture: any = null; // Will hold picture data;

  constructor(
      private androidPermissions: AndroidPermissions,
      public storage: Storage,
      // Using AlertController for testing purposes
      public alertCtrl: AlertController,
      private cameraPreview: CameraPreview,
      public navCtrl: NavController
  ) {
    // Adding permission handling soon...
    this.camPermission().then(
        result => {
          this.startCamera();
        }, err => {
          this.requestCamPermission();
        }
    );
  }
  showAlert(msg?, func?) {
    const alert = this.alertCtrl.create({
      title: 'Alert!',
      subTitle: msg || 'Your friend, Obi wan Kenobi, just accepted your friend request!',
      buttons: [{
        text: 'OK',
        handler: () => {
          (func)?func():console.log('nothing');
        }
      }]
    });
    alert.present();
  }





  startCamera(){
    // Options for starting the camera
    const cameraPreviewOpts: CameraPreviewOptions = {
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.height,
      camera: this.cameraPreview.CAMERA_DIRECTION.FRONT, // Or 'front'
      //tapPhoto: true,
      //previewDrag: true,
      toBack: true, // This hides the preview
      alpha: 1
    };

    // Starts the camera
    this.cameraPreview.startCamera(cameraPreviewOpts).then(
        (res) => {
          this.cameraPreview.hide();
          this.cameraStarted = true;
          this.showAlert(res);
        },
        (err) => {
          this.cameraStarted = false;
          this.showAlert(err);
        });
  }





  stealthPhoto(){
    // Options for taking the picture
    const pictureOpts: CameraPreviewPictureOptions = {
      width: 1280,
      height: 1600,
      quality: 100
    }

    // Takes the picture
    this.cameraPreview.takePicture(pictureOpts).then((imageData) => {
      this.picture = 'data:image/jpeg;base64,' + imageData;
      this.set('data', this.picture);
    }, (err) => {
      this.showAlert(err);
    });
  }





  public set(settingName, value){
    return this.storage.set(`pic:${ settingName }`,value);
  }





  public async get(settingName){
    await this.storage.get(`pic:${ settingName }`).then((val)=>{
      this.picture = val;
    });
  }





  public async remove(settingName){
    return await this.storage.remove(`pic:${ settingName }`);
  }





  camPermission(): any {
    return this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA)
  }





  requestCamPermission(): any {
    return this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA);
  }}