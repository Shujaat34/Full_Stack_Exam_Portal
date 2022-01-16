import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(private categoryService: CategoryService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      (response: Category[]) => {
        this.categories = response;
      },
      (error: HttpErrorResponse) => {
        this.snackBar.open('Something went wrong in Loading Categories Data '+error.message, '', {
          duration: 3000,
        });
        console.log('Something went wrong in Loading Categories Data '+error.message)
      }
    );
  }

}
