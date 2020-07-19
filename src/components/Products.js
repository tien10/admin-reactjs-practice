import React from 'react';

import axios from 'axios';
import Nav from './Nav';
import moment from 'moment';

class Products extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      price: null,
      status: [],
      name: '',
      kind: '',
      _id: 0,
      description: '',
      Create_date: '',
      image_name: '',
      avatar: null,
    }
  }

  componentDidMount() {
    axios.get('https://web-bh-api.herokuapp.com/list_product')
      .then((res) => {

        console.log("get list products: ", res);
        this.setState({
          products: res.data.data,
          price: 0,
          status: [],
          name: '',
          kind: '',
          _id: 0,
          description: '',
          Create_date: '',
          image_name: ''
        })
      }
      )
  }

  namechange = e => {
    this.setState({
      name: e.target.value
    })
  }

  namechange = e => {
    this.setState({
      name: e.target.value
    })
  }

  emailchange = e => {
    this.setState({
      email: e.target.value
    })
  }

  passwordchange = e => {
    this.setState({
      password: e.target.value
    })
  }

  submit(e, id) {
    e.preventDefault();
    if (id === 0) {
      axios.post('https://web-bh-api.herokuapp.com/insert_user', {
        "name": this.state.name,
        "email": this.state.email,
        "password": this.state.password
      })
        .then((res) => {
          console.log("them moi 1 user: ", res)
          this.componentDidMount();
        })
    } else {
      axios.put(`https://web-bh-api.herokuapp.com/update_user/${id}`, {
        "name": this.state.name,
        "email": this.state.email,
        "password": this.state.password
      })
        .then((res) => {
          console.log("update 1 user: ", res)
          this.componentDidMount();
        })
    }
  }

  delete(id) {
    console.log("id de delete: ", id);
    axios.delete(`https://web-bh-api.herokuapp.com/delete_user/${id}`)
      .then((res) => {
        console.log("delete 1 user: ", res)
        this.componentDidMount();
      })
  }

  getone(id) {
    console.log("id de get 1 user: ", id);
    axios.get(`https://web-bh-api.herokuapp.com/get_user_id/${id}`)
      .then((res) => {
        console.log("get 1 user: ", res)
        this.setState(
          {
            name: res.data.data.name,
            email: res.data.data.email,
            password: res.data.data.password,
            id: res.data.data._id
          }
        )
      })
  }


  _handleChangeFile = e => {

    this.setState({
      avatar: e.target.files[0]
    }, () => {
      console.log(this.state.avatar);
      var output = document.getElementById('output');
      output.src = URL.createObjectURL(this.state.avatar);
      output.onload = function () {
        URL.revokeObjectURL(output.src) // free memory
      }
    })
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })


  }

  handleSubmit = (e) => {
    e.preventDefault()
    let { name, kind, price, status, avatar } = this.state
    console.log({ name, kind, price, status, avatar })
    if (!name || !kind || !price || !status || !avatar) {
      return alert('Vui long nhap!!')
    }

    // // GOI API
    axios.post('https://web-bh-api.herokuapp.com/insert_product', {
      "name": name,
      "kind": kind,
      "price": price,
      "status": status,
      "avatar": avatar,
    })
      .then((res) => {
        console.log({...res});
        this.setState({
          "name": null,
          "kind": null,
          "price": null,
          "status": null,
          "avatar": null,
        })
        // if (!res.data.success) return alert('Dang nhap that bai')
        // localStorage.setItem('token', res.data.data.token)

        // // GOI API INFO_USER
        // axios.get(`https://web-bh-api.herokuapp.com/validate/${res.data.data.token}`)
        //   .then((res) => {
        //     console.log({ ...res });
        //     if (res.data.data.role[0] !== "admin") return alert('Ban khong phai Admin')

        //     console.log(this.props.history);
        //     this.props.history.push('/users')
        //     alert('alo')
        //   })
      })

  }

  render() {
    return (
      <div>
        <Nav history={this.props.history} />
        <div className="container mt-5">
          <div className="row mt-5">
            <div className="col-3 mt-5">
              {/* <form onSubmit={(e) => { this.submit(e, this.state.id) }}> */}
              <form>
                <div className="form-group">
                  {/* <input onChange={(e) => { this.namechange(e) }} placeholder="Username" value={this.state.name} type="text" className="form-control"></input> */}
                  <input name={'name'} onChange={(e) => { this.onChange(e) }} placeholder="Name" value={this.state.name} type="text" className="form-control"></input>
                </div>
                {/* <div className="form-group"> */}
                {/* <input onChange={(e) => { this.emailchange(e) }} placeholder="Email" value={this.state.email} type="email" className="form-control"></input> */}
                {/* <input onChange={(e) => { this.kindchange(e) }} placeholder="Kind" value={this.state.kind} type="text" className="form-control"></input> */}
                {/* </div> */}
                <div class="form-group">
                  <label for="exampleFormControlSelect1">Example select</label>
                  <select name={'kind'} onChange={(e) => { this.onChange(e) }} class="form-control" id="exampleFormControlSelect1">
                    <option value="iPhone">iPhone</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Mobell">Mobell</option>
                    <option value="Nokia">Nokia</option>
                    <option value="Oppo">Oppo</option>
                  </select>
                </div>
                <div className="form-group">
                  {/* <input onChange={(e) => { this.passwordchange(e) }} placeholder="Password" value={this.state.password} type="password" className="form-control"></input> */}
                  <input name={'price'} onChange={(e) => { this.onChange(e) }} placeholder="Price" value={this.state.price} type="number" className="form-control"></input>
                </div>
                {/* <div className="form-group"> */}
                {/* <input onChange={(e) => { this.passwordchange(e) }} placeholder="Password" value={this.state.password} type="password" className="form-control"></input> */}
                {/* <input onChange={(e) => { this.statuschange(e) }} placeholder="Status" value={this.state.status} type="text" className="form-control"></input> */}
                {/* </div> */}
                <div class="form-group">
                  <label for="exampleFormControlSelect1">Example select</label>
                  <select name={'status'} onChange={(e) => { this.onChange(e) }} class="form-control" id="exampleFormControlSelect1">
                    <option value="available">Còn hàng</option>
                    <option value="unavailabe">Hết hàng</option>

                  </select>
                </div>
                <div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}>

                    {/* <img
                                style={{
                                    width: 150,
                                    height: 150,
                                    borderRadius: 150 / 2,
                                    alignSelf: 'center',
                                    marginTop: 20,
                                    marginBottom: 30,
                                    objectFit: 'cover'
                                }}
                                src={
                                    this.props.infoUser.avatar ?
                                        `${BASE_URL_AVATAR}/${this.props.infoUser.avatar.replace('"', '').replace('"', '')}`
                                        :
                                        "https://img.thehobbyblogger.com/2012/08/custom-avatar.png"
                                } alt="" /> */}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img alt="output" style={{ width: 100 }} id="output" />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {/* <img onClick={() => { this.upload.click() }} style={{ width: 200, height: 200, borderRadius:100 }} className="avatar" src={photoURL} alt="avatar" /> */}
                    <div onClick={() => { this.upload.click() }} >

                    </div>
                  </div>

                  <input ref={(ref) => this.upload = ref} style={{ display: "none" }} type="file" name="avatar" id="avatar"
                    onChange={e => this._handleChangeFile(e)}
                  />



                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}>
                    <button
                      onClick={() => { this.upload.click() }}
                      // onClick={e => this._handleSubmit(e)}
                      name="submit" type="button"
                      style={{ marginBottom: 30, width: '80%', backgroundColor: '#dd003f', color: '#FFFFFF', height: 45, fontWeight: 'bold' }} className="btn">
                      Đổi ảnh đại diện
                            </button>
                  </div>
                </div>
                <button onClick={this.handleSubmit} className="btn btn-block btn-primary">Submit</button>
              </form>
            </div>
            <div className="col-9 mt-5">
              <table className="table">
                <thead>
                  <tr>
                    <th>Image</th>
                    {/* <th>ID</th> */}
                    <th>Name</th>
                    <th>Kind</th>
                    <th>Price</th>
                    {/* <th>Description</th> */}
                    <th>Create date</th>
                    <th>Status</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.products.map(product =>
                    <tr key={product._id}>
                      <td><img alt="product_image" src={product.image_name} style={{ width: 100 }}></img></td>
                      {/* <td>{product._id}</td> */}
                      <td>{product.name}</td>
                      <td>{product.kind}</td>
                      <td>{product.price}</td>
                      {/* <td>{product.description}</td> */}
                      <td>{moment(product.Create_date).format('DD-MM-YYYY')}</td>
                      <td>{product.status}</td>
                      <td>
                        <button className="btn btn-sm btn-primary">
                          <i className="fa fa-pencil"></i>
                        </button>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-danger">
                          <i className="fa fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* <div className="col"></div> */}
          </div>
        </div>
      </div>
    );
  }

}

export default Products;