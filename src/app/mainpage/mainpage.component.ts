import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ThemePalette } from '@angular/material/core';
import { DeviceService } from '../service/device.service';



@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {

  currentDevice: any;
  listDevice: any;
  color: ThemePalette = 'primary';
  checked = true;
  sliderdata: any;

  public level: string;
  public state: string;
  public OS: boolean;
  constructor(private http: HttpClient, private deviceService: DeviceService) {

  }

  ngOnInit(): void {
      this.getDevice();
 }

  // tslint:disable-next-line: typedef
  getDevice(){
    return this.http.get<any>('http://localhost:3000/register-device/').subscribe(
       (data: any) => {
          this.listDevice = data;
       }
     );
  }

  setDeviceStatus(status: any): void{
     const data = {
        level: this.currentDevice.level,
        state: this.currentDevice.state,
        OS: status
     };

     this.deviceService.updateDevice(this.currentDevice.id, data).subscribe(
        res => {
           this.currentDevice.OS = status;
           console.log(res);
        },
        error => {
           console.log(error);
        }
     );
  }

}
