import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/category';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories: Category[] = [];
  // [
  //   {
  //     id:123,
  //     title:'Programming',
  //     description:'The Category belongs to Programming'
  //   },{
  //     id:123,
  //     title:'Gk',
  //     description:'The Category belongs to Programming'
  //   },{
  //     id:123,
  //     title:'Aptitue',
  //     description:'The Category belongs to Programming'
  //   }
  // ]

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      (response: Category[]) => {
        Swal.fire('Success !!', "Categories Loaded Successfully", 'success');
        this.categories = response;
      },
      (error: HttpErrorResponse) => {
        Swal.fire('Error !!', "Error Loading Categories", 'error');
      }
    );
  }

}
