import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }







  y: string = '';
  extractBits: string = ''
  dict: any = {}
  subBin: any
  item: boolean = false
  valid = true
  subHex: any
  travelProfile = "06EC06000020335928B11987032600000000000479EFF8C00000000000"
  arr = [0, 3, 15, 23, 49, 63, 77, 80, 112, 126, 156, 186, 192, 206, 212, 226, 228, 232]
  envDataStructure = ['EnvCountryId', 'EnvIssuerId', 'EnvApplicationNumber', 'EnvIssuingDate', 'EnvEndDate', 'EnvPayMethod', 'HolderBirthDate',
    'HolderCompany', 'HolderCompanyID', 'HolderIdNumber', 'HolderProf1Code', 'HolderProf1Date', 'HolderProf2Code', 'HolderProf2Date',
    'HolderLanguage', 'HolderRFU']

  ngOnInit(): void {
    for (let i = 0; i < 58; i++) {
      this.extractBits = this.extractBits + this.hex2bin(this.travelProfile[i])
    }
    for (let i = 0; i <= 17; i++) {
      this.subBin = this.partOfBin(this.extractBits, this.arr[i], this.arr[i + 1] - this.arr[i])
      this.subHex = this.bin2hex(this.subBin)
      this.dict[this.envDataStructure[i]] = this.subHex
      console.log(this.subBin)
      console.log(this.subHex)
    }
    console.log(this.dict)
  }
  bin2hex(bin: any) {
    return parseInt(bin, 2).toString(16).toUpperCase()
  }

  partOfBin(bin: any, begin: any, len: any) {
    return bin.substr(begin, len)
  }
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
}
