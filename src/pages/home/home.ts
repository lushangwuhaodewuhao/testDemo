import {Component} from '@angular/core';
import { ActionSheetController,AlertController} from 'ionic-angular';
import { UploadImageProvider } from '../../providers/upload-image/upload-image';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  base64Image;
  imageUrl:string;


constructor(public actionSheetCtrl:ActionSheetController,public alertCtrl:AlertController,private upload:UploadImageProvider) { }


    takePhoto(){
        this.upload.takePicture().then(result=>{
            this.base64Image = 'data:image/jpeg;base64,' + result;
        }, (err) => {
            alert('照相失败');
        });
    }

    chooseFromAlbum(){
        this.upload.selectFromAlbum().then((results) => {
          this.imageUrl = results[0];
        }, (err) => {
            alert('选择照片失败')
        });
    }
    presentActionSheet() {
        let actionSheet = this.actionSheetCtrl.create({
            buttons: [{
                text: '拍照',
                role: 'takePhoto',
                handler: () => {
                    this.takePhoto();
                }
            }, {
                text: '从相册选择',
                role: 'chooseFromAlbum',
                handler: () => {
                    this.chooseFromAlbum();
                }
            }, {
                text: '取消',
                role: 'cancel',
                handler: () => {
                    console.log("cancel");
                }
            }]
        });
        actionSheet.present();
    }

    presentActionSheet2() {
        let actionSheet = this.actionSheetCtrl.create({
            buttons: [{
                text: '提示弹框1',
                role: 'takePhoto',
                handler: () => {
                    this.ionicAlert();
                }
            }, {
                text: '提示弹框2',
                role: 'chooseFromAlbum',
                handler: () => {
                    this.ionicAlert2();
                }
            }, {
                text: '取消',
                role: 'cancel',
                handler: () => {
                    console.log("cancel");
                }
            }]
        });

        actionSheet.present();
    }
    ionicAlert(){
        let alert = this.alertCtrl.create();
        alert.setTitle('标题');
        for(var z in [1,2,3,4,5,6,7,8]){
            alert.addInput({
                type: 'checkbox',
                label: 'Blue 23333'+z,
                value: 'blue 23333',
                checked: false
            });
        }
        alert.addButton('取消');
        alert.addButton({
            text: '好的',
            handler: data => {
                console.log(this);
                console.log(data);
            }
        });
        alert.present();
    }

    ionicAlert2(){
        let alert = this.alertCtrl.create({
            title: '弹框',
            subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
            buttons: ['好的']
        });
        alert.present();
    }
}
