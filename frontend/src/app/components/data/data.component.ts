import {Component, OnInit} from '@angular/core';
import {SystemService} from "../../service/system.service";

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  systems: any = [];
  loading: any;

  constructor(private systemService: SystemService) {
  }

  ngOnInit(): void {
    this.getSystems();
  }

  getSystems() {
    this.loading = true;
    this.systemService.getSystemList()
      .subscribe(res => {
        this.systems = res;
      });
    this.loading = false;
  }
}
