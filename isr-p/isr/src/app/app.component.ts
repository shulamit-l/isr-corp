// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent {
//   title = 'isr';
// }



// import { Component } from '@angular/core';
// import { ValidatorFn } from '@angular/forms';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   templateUrl: './.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent {
//   constructor(public router: Router) {

//   }
//   title = 'ISRPROJECT';
//   item: boolean = false
//   valid = true
//   flag(val: any) {
//     if (val == 0)
//       this.item = true
//     else
//       this.item = false
//   }
//   myFunction(id: any) {
//     id = String(id).trim();
//     if (id.length > 9 || id.length < 5 || isNaN(id))
//       this.valid = false;
//   }
//   validetor() {
//     this.valid = true;
//   }

// }
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  /*-------------Declerations--------------*/
  y: string = '';
  extractBits: string = ''
  dict: any = {}
  subBin: any
  item: boolean = false
  valid = true
  subHex: any
  home: boolean = false
  card1: boolean = false;
  @ViewChild('scroller1') scroller!: ElementRef;
  travelProfile = "06EC06000020335928B11987032600000000000479EFF8C00000000000"
  arrBits = [0, 3, 15, 23, 49, 63, 77, 80, 112, 126, 156, 186, 192, 206, 212, 226, 228, 232]
  envDataStructure = ['EnvApplicationVersionNumber', 'EnvCountryId', 'EnvIssuerId', 'EnvApplicationNumber', 'EnvIssuingDate', 'EnvEndDate', 'EnvPayMethod', 'HolderBirthDate',
    'HolderCompany', 'HolderCompanyID', 'HolderIdNumber', 'HolderProf1Code', 'HolderProf1Date', 'HolderProf2Code', 'HolderProf2Date',
    'HolderLanguage', 'HolderRFU']

  constructor(public router: Router) { }

  ngOnInit(): void {
    if (this.scroller) {
      const div = this.scroller.nativeElement as HTMLDivElement;
      div.addEventListener('mouseover', e => {
        console.log('Mouse Over');
      });
      div.addEventListener('mouseout', e => {
        console.log('Mouse Out');
      });
    }
    for (let i = 0; i < 58; i++) {
      this.extractBits = this.extractBits + this.hex2bin(this.travelProfile[i])
    }

    /*Iterate bits array*/
    for (let i = 0; i < 17; i++) {
      this.subBin = this.partOfBin(this.extractBits, this.arrBits[i], this.arrBits[i + 1] - this.arrBits[i])
      this.subHex = this.bin2hex(this.subBin)
      this.dict[this.envDataStructure[i]] = this.subHex
    }
    /*Defining special cases*/
    if (this.dict["EnvCountryId"] == 376) {
      this.dict["EnvCountryId"] = "Israel"
    }

    switch (this.dict["HolderIdNumber"]) {
      case 0:
        this.dict["HolderIdNumber"] = "AnonymousCard"
        break;
      default:
        this.dict["HolderIdNumber"] = "Personal"
        break;
    }
    this.dict["EnvIssuingDate"] = new Date(this.hex2dec(this.dict["EnvIssuingDate"]))
    this.dict["EnvEndDate"] = new Date(this.hex2dec(this.dict["EnvEndDate"]))
    this.dict["HolderBirthDate"] = new Date(this.hex2dec(this.dict["HolderBirthDate"]))
    console.log(this.dict)
  }
  /*Functions for conversions between bases*/



  hex2bin(hex: any) {
    this.y = parseInt(hex.toString(), 16).toString(2)
    switch (this.y.length % 4) {
      case 1:
        return "000" + this.y
      case 2:
        return "00" + this.y
      case 3:
        return "0" + this.y
    }
    return this.y
  }

  bin2hex(bin: any) {
    return parseInt(bin, 2).toString(16).toUpperCase()
  }
  hex2dec(hexString: any) {
    return parseInt(hexString, 16);
  }
  /*Temp function*/
  partOfBin(bin: any, begin: any, len: any) {
    return bin.substr(begin, len)
  }




  flag(val: any) {
    if (val == 0)
      this.item = true
    else
      this.item = false
  }
  myFunction(id: any) {
    id = String(id).trim();
    if (id.length > 9 || id.length < 5 || isNaN(id))
      this.valid = false;
    else
      this.login()
  }
  validetor() {
    this.valid = true;
  }
  login() {
    this.home = true
    this.card1 = false;
  }
  card() {
    this.card1 = true;
    this.home = false
  }
}
// console.log(extractBits)
// console.log(extractBits.length)











