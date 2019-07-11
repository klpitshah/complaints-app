import { Component, OnInit } from '@angular/core';
import { AuthService} from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Router} from '@angular/router';
import { Chart } from 'chart.js';
import { ViewChild } from '@angular/core';
import { MatTableDataSource,MatSort,MatPaginator } from '@angular/material';

// import { MdbTablePaginationComponent, MdbTableDirective } from '';
// import { ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
// import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl','./home.component.css']
})
export class HomeComponent implements OnInit {
  // @ViewChild(MdbTablePaginationComponent, {}) mdbTablePagination: MdbTablePaginationComponent;
  // @ViewChild(MdbTableDirective, {}) mdbTable: MdbTableDirective
  // headElements = ['ID', 'Name', 'Date', 'Complainer', 'City', 'Area', 'Type', 'Status'];
  displayedColumns = ["Complaint", 'Date', 'Complainer', 'City', 'Area', 'Type', 'Status'];
  // title = 'dashboard';
  chart;
  dataComplete = [0,0,0,0,0];

  chart2;
  dataRegistered = [0,0,0,0,0];
  // chart2 = [];
  // pie: any;
  // doughnut: any;

  data1 = [];
  
  constructor(
    private authService : AuthService,
    private Route:  ActivatedRoute,
    private router : Router,
    // private cdRef: ChangeDetectorRef
  ) {
    
    for(let i=0;i<100;i++){
      this.pagination.push('angular '+i);
    }
    this.Route.queryParamMap.subscribe(params=>{
      this.category = params.get('category');
    });
  
    this.authService.getAllComplains().subscribe( res =>{
      
      for(let i=0;i< res.json().length;i++){
            this.complains[i] = {
              complainerName : res.json()[i].complainerName,
              complainName : res.json()[i].complainName,
              type : res.json()[i].type,
              city : res.json()[i].city,
              area : res.json()[i].area,
              time : res.json()[i].time,
              image : null,
              status : res.json()[i].status
            };
      }

      
    this.listData = new MatTableDataSource(this.complains);

    });
    
    this.listData = new MatTableDataSource(this.filter_product);
  }

  category = "";
  filter_product = [];
  listData = new MatTableDataSource(this.filter_product);
  
  previous = [];
  
  private cat_main = ["Water","Road","Health","Other"];
  private pagination = [];
  numberObject = Object;
  complains = [];

  ngOnInit() {
    this.authService.getAllComplains().subscribe( res =>{
      
      for(let i=0;i< res.json().length;i++){
            this.complains[i] = {
              complainerName : res.json()[i].complainerName,
              complainName : res.json()[i].complainName,
              type : res.json()[i].type,
              city : res.json()[i].city,
              area : res.json()[i].area,
              time : res.json()[i].time,
              image : null,
              status : res.json()[i].status
            };
      }

      
    this.listData = new MatTableDataSource(this.complains);
    this.authService.getNumberComplain().subscribe( res =>{
      console.log(res);
      this.numberObject = res.json();
      this.dataComplete[0] = JSON.parse(res["_body"]).HealthComp;
      // console.log(JSON.parse(res["_body"]));
      this.dataComplete[1] = JSON.parse(res["_body"]).WaterComp;
      this.dataComplete[2] = JSON.parse(res["_body"]).RoadComp;
      this.dataComplete[3] = JSON.parse(res["_body"]).InfrastructureComp;
      this.dataComplete[4] = JSON.parse(res["_body"]).RuralComp;
      this.dataRegistered[0] = JSON.parse(res["_body"]).Health;
      this.dataRegistered[1] = JSON.parse(res["_body"]).Water;
      this.dataRegistered[2] = JSON.parse(res["_body"]).Road;
      this.dataRegistered[3] = JSON.parse(res["_body"]).Infrastrucutre;
      this.dataRegistered[4] = JSON.parse(res["_body"]).Rural;
      console.log(this.dataComplete)
      console.log(this.dataRegistered)
      this.chart = new Chart('pieRegistered', {
        type: 'pie',
        options: {
          responsive: true,
          title: {
            display: true,
            text: 'Complaints Registered'
          },
        },
        data: {
          labels: ['Health', 'Water', 'Road', 'Infrastructure', 'Rural Development'],
          datasets: [
            {
              label: 'Registered',
              data: [this.dataRegistered[0], this.dataRegistered[1], this.dataRegistered[2], this.dataRegistered[3], this.dataRegistered[4]],
              backgroundColor: [
                'rgba(0,0,255,0.6)',
                'rgba(0,204,255,0.6)',
                'rgba(255,255,51,0.6)',
                'rgba(153,0,51,0.6)',
                'rgba(68,68,68,0.6)',
              ],
              borderColor: 'rgba(255,0,255,0.4)',
              fill: false,
            },
            // {
            //   label: 'Completed',
            //   data: [243, 156, 365, 30, 156].reverse(),
            //   backgroundColor: 'rgba(0,0,255,0.4)',
            //   borderColor: 'rgba(0,0,255,0.4)',
            //   fill: false,
            // }
          ]
        }
      });

      this.chart = new Chart('pieCompleted', {
        type: 'pie',
        options: {
          responsive: true,
          title: {
            display: true,
            text: 'Complaints Completed'
          },
        },
        data: {
          labels: ['Health', 'Water', 'Road', 'Infrastructure', 'Rural Development'],
          datasets: [
            {
              label: 'Registered',
              data: [this.dataComplete[0], this.dataComplete[1], this.dataComplete[2], this.dataComplete[3], this.dataComplete[4]],
              backgroundColor: [
                'rgba(0,0,255,0.6)',
                'rgba(0,204,255,0.6)',
                'rgba(255,255,51,0.6)',
                'rgba(153,0,51,0.6)',
                'rgba(68,68,68,0.6)',
              ],
              borderColor: 'rgba(255,0,255,0.4)',
              fill: false,
            },
          ]
        }
      });
    });
    this.filter_product = this.complains;
    });
  }

  allProducts(){
    this.filter_product = this.complains;
    this.router.navigate(['/']);
  }

  applyFilter(filterValue: string) {
    console.log("applying filter");
    console.log(this.listData);
    this.listData.filter = filterValue.trim().toLowerCase();
    this.filter_product = this.listData.filteredData;
    console.log(this.listData);
  }

}
