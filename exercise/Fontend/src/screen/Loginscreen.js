import React, { Component } from 'react'
import { icon } from '../component/Image/icon'
import { img } from '../component/Image/image'
import { POST, LOGIN } from '../service/service';
export default class Loginscreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }
    }
    Signup = async () => {
        const obj = {
            username: this.state.username,
            password: this.state.password
        }
        // console.log(obj);
        try {
            let res = await POST(LOGIN, obj)
            console.log(res);
            if (res.success === true) {
                this.props.history.push({
                    pathname: '/login',
                    state: res.result
                })
            } else {
                alert("รหัสผ่านไม่ถูกต้อง")
            }

        } catch (error) {

        }
    }
    oninput = e => { this.setState({ [e.target.name]: e.target.value }) }
    render() {
        return (
            <div>
                <p className='text' >
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <code style={{ fontSize: 30 }} >Coin Locker</code>
                        <img src={icon.lockerlogin} style={{ width: 200, height: 170 }} />
                    </div>
                    <div style={{ width: 300, marginLeft: 40 }}>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input onChange={(e) => this.oninput(e)} type="email" name="username" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input onChange={(e) => this.oninput(e)} type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                        </div>
                        <button onClick={() => this.Signup()} type="submit" class="btn btn-primary">Sign up</button>
                    </div>

                </p>

            </div>
        )
    }
}
