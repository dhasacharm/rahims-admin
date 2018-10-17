import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriesService } from '../../services/categories/categories.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Router} from '@angular/router';
import Swal from 'sweetalert2';


@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    searchCtrl = new FormControl('');
    categoryList: MatTableDataSource<any>;
    displayedColumns: string[] = ['sno', 'name', 'action'];

    constructor(
        private router: Router,
        private categoriesServ: CategoriesService
    ) {
        this.searchCtrl.valueChanges.subscribe(this.applyFilter.bind(this))
        this.categoriesServ.getProduct()
            .subscribe((data: any[]) => {
                this.categoryList = new MatTableDataSource(data);
                console.log(data)
                this.categoryList.paginator = this.paginator;
                this.categoryList.sort = this.sort;
                // console.log(this.categoryList);
            });
    }

    applyFilter(value = '') {
        const filterValue = value.trim().toLowerCase();
        this.categoryList.filter = filterValue;
    }

    async deleteData(inputEle) {
        // console.log(inputEle)
        const id = inputEle._id;
        console.log('id is' + id);
        const isOk = await Swal({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (!isOk.value) {
            return;
        }
        await this.categoriesServ.deleteCategory(id);
        const index = this.categoryList.data.indexOf(id);
        // console.log(index)
        // console.log(this.categoryList.data)

        this.categoryList.data.splice(index, 1);

        this.categoryList = new MatTableDataSource<any>(this.categoryList.filteredData);
        this.categoryList.paginator = this.paginator;

       
    }

    ngOnInit() {

    }
}
