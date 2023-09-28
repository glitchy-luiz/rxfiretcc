import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tipofamilia',
  templateUrl: './tipofamilia.page.html',
  styleUrls: ['./tipofamilia.page.scss'],
})
export class TipofamiliaPage implements OnInit {

  constructor(
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async logout() {
    await this.authService.logout()
    this.router.navigateByUrl('/', { replaceUrl:true});
  }

}
