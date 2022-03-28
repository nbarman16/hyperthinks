import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { UserService } from './user.service';

export interface UserWithCount{
  rows: User[];
  count: number
}
export interface User{
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string
}
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'firstName', 'email'];
  dataSource = new MatTableDataSource<User>([]);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private _liveAnnouncer: LiveAnnouncer,
    private userService: UserService) { 
   
  }

  ngOnInit(): void {
      this.getUsers();
  }

  ngAfterViewInit(){
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  }

  getUsers(){
      this.userService.getAllUser().subscribe(
        (response: UserWithCount)=>{
           this.dataSource.data = response.rows;
        }
      )
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}