import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  userName: string;
  prof;
  success: boolean;
  noUser: boolean;
  private baseUrl = 'https://api.github.com/users/';
  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar, private spinner: MatProgressSpinnerModule) { }

  getProfile() {
    if (localStorage.getItem(this.userName)) {
      this.prof = JSON.parse(localStorage.getItem(this.userName));
    } else {
      this.success = false;
      this.httpClient.get(this.baseUrl + this.userName ).subscribe((res) => {
        this.success = true;
        this.prof = res;
        localStorage.setItem(this.userName, JSON.stringify(this.prof));
        console.log(localStorage);
        // console.log(this.getItemFromProfile);
        console.log(localStorage);
      },
        // console.log(this.prof);
        () => {
          this.success = true;
          this.noUser = true;
          this.prof = null;
          this.snackBar.open('not found', ' ', {
            duration: 2000,
          });
        });
    }
  }


  ngOnInit() {
    this.success = true;
    this.noUser = false;
  }
}
