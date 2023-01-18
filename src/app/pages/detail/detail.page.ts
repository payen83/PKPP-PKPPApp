import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  item: any;
  constructor(private activatedRoute: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    let id: any = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('captured id: ', id);
    this.item = this.api.getInventorybyId(id);
    // console.log('found item: ', itemData);
  }

}
