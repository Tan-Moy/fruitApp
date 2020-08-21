import { Component, OnInit } from '@angular/core';
import { TruevaultService } from '../services/truevault.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  showFruitForm = false;
  fruitData: any = {};
  fruitList = [];

  constructor(private trueVault: TruevaultService, private router: Router) {}

  ngOnInit() {
    this.getFruitList();
  }

  toggleFruitForm() {
    this.showFruitForm = this.showFruitForm ? false : true;
  }

  saveFruit() {
    this.fruitData.url = this.fruitData.url
      ? this.fruitData.url
      : 'https://images.unsplash.com/photo-1514995669114-6081e934b693?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
    this.trueVault.submitFruit(this.fruitData).then((res) => {
      this.fruitData = {};
      this.toggleFruitForm();
      this.getFruitList();
    });
  }

  imgHandler(fruit) {
    return `url('${fruit.document.url}')`;
  }

  getFruitList() {
    this.trueVault.getFruits().then((res) => {
      this.fruitList = res.items;
      console.log(this.fruitList)
    });
  }

  deletFruit(fruit) {
    this.trueVault.deleteFruit(fruit.id).then((res) => {
      this.getFruitList();
    });
  }

  logOut() {
    this.trueVault.logOut().then((res) => {
      this.router.navigate(['login']);
      this.getFruitList();
    });
  }
}
