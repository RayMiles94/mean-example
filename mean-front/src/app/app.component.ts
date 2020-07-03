import { Component , OnInit} from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit{

  title = 'mean-front';
  a:string;
  b:string;
  data:string;
  iscal:boolean = true;
  list:any[];

  ngOnInit(): void {
    document.title = "MERN EXAMPLE";
  }

  constructor(private httpclient:HttpClient) {
    this.GetList();
  }
  

  private GetList(): void {
    this.httpclient.get<any>('http://0.0.0.0:3500/api/find/').subscribe(
      data => {
        this.list =data;
      }
    );
  }

  public onCalcul(): void {
    let params = new HttpParams();
    params = params.append('a', this.a);
    params = params.append('b', this.b);
    this.httpclient.get<any>('http://0.0.0.0:3500/api/cal', {
     params: params
    }).subscribe(
      data => {
        if(data.message=="NaN") {
          this.data = "error";
          this.iscal=false;
        }
        else {
          this.data = data.message;
          this.iscal=false;
        }
        this.GetList();
      }
    );
  }

  public onNew(): void {
    this.a = this.b =  '';
    this.iscal=true;
  }
}
