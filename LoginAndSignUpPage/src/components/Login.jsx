import React from "react";

const mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const sifreRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      sifre: "",
      emailError: "",
      sifreError: "",
      formKabul: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.mailDogrulama = this.mailDogrulama.bind(this);
    this.sifreDogrulama = this.sifreDogrulama.bind(this);
    this.AlanDogrulama = this.AlanDogrulama.bind(this);
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
    this.AlanDogrulama(name);
    return;
  }

  handleSubmit(event) {
    event.preventDefault();
    let formAlanları = [
      "email",
      "sifre",
    ];
    let dogruMu = true;
    formAlanları.forEach(field => {
      dogruMu = this.AlanDogrulama(field) && dogruMu;
    });

    if (dogruMu) this.setState({ formKabul: true });
    else this.setState({ formKabul: false });

    return this.state.formKabul;
  }

  AlanDogrulama(name) {
    let dogruMu = false;
    if (name === "email") dogruMu = this.mailDogrulama();
    else if (name === "sifre") dogruMu = this.sifreDogrulama();
    return dogruMu;
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

  render() {
    return (
        <div className="container" >
        <h3>Giriş yap</h3>
        {this.state.formKabul ? (
          <div className="">
            <h3>Hoş Geldiniz</h3>
          </div>
        ) : (
          <div style={{textAlign:"center"}}>
          <form onSubmit={this.handleSubmit} >
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
            <div className="row justify-content-around">
                <div className="forgetpassword-div"> 
                    <a className="forgetpassword" href="">Şifremi Unuttum</a>
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" for="exampleCheck1">Beni Hatırla</label>
                 </div>
            </div>
            <button className="btn-submit" >Giriş Yap</button>
          </form>
          </div>
        )}
      </div>
    );
  }
}
export default SignUp;
