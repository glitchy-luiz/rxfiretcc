import { FirestoreModule } from '@angular/fire/firestore';
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validator, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertController, LoadingController } from "@ionic/angular";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AuthService } from "src/app/services/auth.service";
import { provideFirestore, getFirestore } from '@angular/fire/firestore'
// import { Dadosextra } from 'src/app/models/dadosextra';
import { DadosextraService } from 'src/app/services/dadosextra.service';

@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.page.html",
  styleUrls: ["./cadastro.page.scss"],
})
export class CadastroPage implements OnInit {
  credentials: FormGroup = this.fb.group({});

  constructor(
    private afs: FirestoreModule,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
    private dados: DadosextraService
  ) {}

  get nome(){
    return this.credentials.get('nome')
  }
  get confsenha() {
    return this.credentials.get("confsenha");
  }

  get email() {
    return this.credentials.get("email");
  }

  get password() {
    return this.credentials.get("password");
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      nome: [''],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confsenha: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  async salvar(){
    if (this.password?.value === this.confsenha?.value) {
    const dadouser = await this.dados.salvar(this.credentials.value);
    }
  }

  async register() {
    if (this.password?.value === this.confsenha?.value) {
      const loading = await this.loadingController.create();
      await loading.present();

      const user = await this.authService.register(this.credentials.value);
      await loading.dismiss();

      if (user) {
        this.router.navigateByUrl("/home", { replaceUrl: true });
      } else {
        this.showAlert("Registro falhou", "tente novamente!");
      }
    } else {
      this.showAlert("Erro nas senhas", "as senhas não são iguais");
    }
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.login(this.credentials.value);
    await loading.dismiss();

    if (user) {
      this.router.navigateByUrl("/home", { replaceUrl: true });
    } else {
      this.showAlert("Login falhou", "tente novamente!");
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ["ok"],
    });
    await alert.present();
  }
}
