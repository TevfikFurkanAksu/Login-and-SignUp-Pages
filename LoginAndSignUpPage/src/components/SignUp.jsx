import React from "react";

const mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const sifreRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      isim: "",
      soyisim: "",
      email: "",
      sifre: "",
      sifreDogrulama: "",
      isimError: "",
      emailError: "",
      sifreError: "",
      sifreDogrulamaError: "",
      formKabul: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isimDogrulama = this.isimDogrulama.bind(this);
    this.soyisimDogrulama = this.soyisimDogrulama.bind(this);
    this.mailDogrulama = this.mailDogrulama.bind(this);
    this.sifreDogrulama = this.sifreDogrulama.bind(this);
    this.sifreDogrulamaDogrulama = this.sifreDogrulamaDogrulama.bind(this);
    this.alanDogrulama = this.alanDogrulama.bind(this);
    this.check = this.check.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    return;
  }

  handleBlur(event) {
    const { name } = event.target;
    this.alanDogrulama(name);
    return;
  }

  handleSubmit(event) {
    event.preventDefault();
    let formAlanları = [
      "isim",
      "soyisim",
      "email",
      "sifre",
      "sifreDogrulama"
    ];
    let dogruMu = true;
    formAlanları.forEach(field => {
      dogruMu = this.alanDogrulama(field) && dogruMu;
    });

    if (dogruMu) this.setState({ formKabul: true });
    else this.setState({ formKabul: false });

    return this.state.formKabul;
  }

  alanDogrulama(name) {
    let dogruMu = false;

    if (name === "isim") dogruMu = this.isimDogrulama();
    else if (name === "soyisim") dogruMu = this.soyisimDogrulama();
    else if (name === "email") dogruMu = this.mailDogrulama();
    else if (name === "sifre") dogruMu = this.sifreDogrulama();
    else if (name === "sifreDogrulama")
      dogruMu = this.sifreDogrulamaDogrulama();
    return dogruMu;
  }

  isimDogrulama() {
    let isimError = "";
    const value = this.state.isim;
    if (value.trim() === ""){
      isimError = "Bu Alan Boş Bırakılamaz";
      document.getElementById('isim').style.borderColor= "red";
    } 
    else{
      document.getElementById('isim').style.borderColor= "black";
    }
    this.setState({
      isimError
    });
    return isimError === "";
  }

  soyisimDogrulama() {
    let lastNameError = "";
    const value = this.state.soyisim;
          if (value.trim() === ""){
            lastNameError = "Bu Alan Boş Bırakılamaz";
            document.getElementById('soyisim').style.borderColor= "red";
          } 
          else{
            document.getElementById('soyisim').style.borderColor= "black";

          }
    this.setState({
      lastNameError
    });
    return lastNameError === "";
  }

  mailDogrulama() {
    let emailError = "";
    const value = this.state.email;
    if (value.trim === "") emailError = "Bu Alan Boş Bırakılamaz";
    else if (!mailRegex.test(value)){
              emailError = "Geçerli bir E-posta adresi giriniz";
              document.getElementById('mail').style.borderColor= "red";
    }
    else{
      document.getElementById('mail').style.borderColor= "black";
    }

    this.setState({
      emailError
    });
    return emailError === "";
  }

  sifreDogrulama() {
    let sifreError = "";
    const value = this.state.sifre;
    if (value.trim === "") sifreError = "Bu Alan Boş Bırakılamaz";
    else if (!sifreRegex.test(value)){
      sifreError =
      "Şifreniz en az 8 karekterden oluşmalı ve en az 1 sayı, 1 büyük harf ve 1 küçük harf içermeli";
      document.getElementById('sifre').style.borderColor= "red";
    }
    else{
      document.getElementById('sifre').style.borderColor= "black";
    }

    this.setState({
      sifreError
    });
    return sifreError === "";
  }

  sifreDogrulamaDogrulama() {
    let sifreDogrulamaError = "";
    if (this.state.sifre !== this.state.sifreDogrulama){
      sifreDogrulamaError = "Şifreleriniz eşleşmiyor";
      document.getElementById('sifreDogrulama').style.borderColor= "red";
    }
    else{
      document.getElementById('sifreDogrulama').style.borderColor= "black";
    }
    this.setState({
      sifreDogrulamaError
    });
    return sifreDogrulamaError === "";
  }

  check(){
    var check=document.getElementById('exampleCheck1').checked;
    if (check) {
      document.getElementById('button').disabled = !!this.checked;
    }
    else{
      document.getElementById('button').disabled = !this.checked;
    }
  }

  render() {
    return (
      <div className="container" >
        <h3>Kayıt Ol</h3>
        {this.state.formKabul ? (
          <div className="details">
            <h3>Kayıt olduğunuz için teşekkür ederiz, işte bilgileriniz </h3>
            <div>Adınız: {this.state.isim}</div>
            <div>Soydınız: {this.state.soyisim}</div>
            <div>E-posta adresiniz: {this.state.email}</div>
          </div>
        ) : (
          <div style={{textAlign:"center"}}>
          <form onSubmit={this.handleSubmit} >
            <input
              id="isim"
              minlength="3"
              maxlength="24"
              id="isim"
              type="text"
              placeholder="Adınız..."
              name="isim"
              value={this.state.isim}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              autoComplete="off"
            />
            <br />
            {this.state.isimError && (
              <div className="errorMsg">{this.state.isimError}</div>
            )}
            <input
              id="soyisim"
              minlength="3"
              maxlength="24"
              id="soyisim"
              type="text"
              placeholder="Soyadınız..."
              name="soyisim"
              value={this.state.soyisim}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              autoComplete="off"
            />
            <br />
            {this.state.lastNameError && (
              <div className="errorMsg">{this.state.lastNameError}</div>
            )}
            <input
              id="mail"
              type="email"
              placeholder="E-Posta Adresiniz..."
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              autoComplete="off"
            />
            <br />
            {this.state.emailError && (
              <div className="errorMsg">{this.state.emailError}</div>
            )}
            <input
              id="sifre"
              type="password"
              placeholder="Şifreniz..."
              name="sifre"
              value={this.state.sifre}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              autoComplete="off"
            />
            <br />
            {this.state.sifreError && (
              <div className="errorMsg">{this.state.sifreError}</div>
            )}
            <input
              id="sifreDogrulama"
              type="password"
              placeholder="Şifre Onay..."
              name="sifreDogrulama"
              value={this.state.sifreDogrulama}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              autoComplete="off"
            />

            <br />
            {this.state.sifreDogrulamaError && (
              <div className="errorMsg">
                {this.state.sifreDogrulamaError}
              </div>
            )}
            <div className="form-group form-check">
              <input onClick={this.check} type="checkbox" className="form-check-input" id="exampleCheck1"/>
              <label className="form-check-label" for="exampleCheck1"><a className="forgetpassword" href=""><strong> Üyelik koşullarını</strong> </a>ve kişisel verilerimin korunmasını kabul ediyorum.</label>
            </div>
            <button id="button" className="btn-submit" disabled>Üye Ol</button>
          </form>
          </div>
        )}
      </div>
    );
  }
}
export default SignUp;
