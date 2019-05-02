import React, { Component } from 'react'
import '../Styles/styles.css'
import { sizelockers, sizelockerm, sizelockerl } from '../component/Lockerdata/Sizeoflocker'
import socketIOClient from 'socket.io-client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { icon } from '../component/Image/icon'
import { img } from '../component/Image/image'
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment'
import { POST, INSERT } from '../service/service';
export default class Lockerinformationscreen extends Component {
    constructor() {
        super()
        this.state = {
            message: [],
            endpoint: "https://data-base-demo.herokuapp.com",// เชื่อมต่อไปยัง url ของ realtime server
            number_locker: '',
            Category: '',
            number_insert: '',
            total: '',
            time: '',
            total_time: '',
            moment: moment(),
            date: new Date(),
            date_start: new Date(),
            date_end: new Date(),
        }
    }
    componentDidMount = () => {
        this.response()
    }
    set = async () => {
        const p = this.props.history.location.state;
        const { firstname, lastname } = p
        const { endpoint } = this.state
        const socket = socketIOClient(endpoint)
        const obj = {
            number: this.state.total,
            number_locker: this.state.number_locker,
            category: this.state.Category,
            time: this.state.total_time,
            size: this.state.size,
            fullname: firstname + ' ' + lastname
        }
        console.log(obj);
        socket.emit('sent-message', obj)
        let res = await POST(INSERT, obj)
        this.setState({ number_locker: '', date_start: new Date(), date_end: new Date(), number_insert: '', total: '', total_time: '' })
    }
    // เมื่อมีการส่งข้อมูลไปยัง server
    send = () => {
        const { number_insert } = this.state
        if (number_insert !== '') {
            if (this.state.message.length > 0) {
                let index = this.state.message.findIndex(el => el.Number_locker === this.state.number_locker)
                if (index < 0) {
                    // alert("เลือกได้")
                    this.set()
                } else {
                    alert("ไม่สามารถเลือกตู้นี้ได้!!!")
                    this.setState({ number_locker: '' })
                }
            } else {
                this.set()
            }
        } else {
            alert("กรุณากรอกจำนวนเงิน")
        }

    }
    // รอรับข้อมูลเมื่อ server มีการ update
    response = () => {
        const { endpoint } = this.state
        const temp = []
        const socket = socketIOClient(endpoint)
        socket.on('new-message', (messageNew) => {
            let cal_time = null
            let cal_time1 = null
            let cal_time2 = null
            let caltime_first = null
            let money_change = null
            let money1000 = null
            let money500 = null
            let money100 = null
            let money50 = null
            let money20 = null
            let coin10 = null
            let coin5 = null
            let coin2 = null
            let coin1 = null
            let letter1000 = null
            let letter500 = null
            let letter100 = null
            let letter50 = null
            let letter20 = null
            let letter10 = null
            let letter5 = null
            let letter2 = null
            let letter1 = null
            if (messageNew.size === "s") {
                if (messageNew.time > 60) {
                    cal_time = messageNew.time - 60
                    caltime_first = 50
                    cal_time1 = cal_time / 60
                    cal_time2 = cal_time % 60
                    if (parseInt(cal_time) !== 0) {
                        caltime_first = caltime_first + (25 * parseInt(cal_time1))
                        if (cal_time2 > 0) {
                            caltime_first = caltime_first + 25
                        }
                    } else {
                        caltime_first = 50
                    }
                } else {
                    caltime_first = 50
                }
            }
            if (messageNew.size === "m") {
                if (messageNew.time > 60) {
                    cal_time = messageNew.time - 60
                    caltime_first = 100
                    cal_time1 = cal_time / 60
                    cal_time2 = cal_time % 60
                    if (parseInt(cal_time) !== 0) {
                        caltime_first = caltime_first + (50 * parseInt(cal_time1))
                        if (cal_time2 > 0) {
                            caltime_first = caltime_first + 50
                        }
                    } else {
                        caltime_first = 100
                    }
                } else {
                    caltime_first = 100
                }
            }
            if (messageNew.size === "l") {
                if (messageNew.time > 60) {
                    cal_time = messageNew.time - 60
                    caltime_first = 200
                    cal_time1 = cal_time / 60
                    cal_time2 = cal_time % 60
                    if (parseInt(cal_time) !== 0) {
                        caltime_first = caltime_first + (100 * parseInt(cal_time1))
                        if (cal_time2 > 0) {
                            caltime_first = caltime_first + 100
                        }
                    } else {
                        caltime_first = 200
                    }
                } else {
                    caltime_first = 200
                }
            }
            if (messageNew.number !== 0) {
                money_change = messageNew.number - caltime_first
                if (money_change > 0) {
                    money1000 = money_change / 1000
                    if (parseInt(money1000) !== 0) {
                        letter1000 = parseInt(money1000)
                        money_change = money_change - (letter1000 * 1000)
                    } else { letter1000 = parseInt(money1000) }
                    money500 = money_change / 500
                    if (parseInt(money500) !== 0) {
                        letter500 = parseInt(money500)
                        money_change = money_change - (letter500 * 500)

                    } else { letter500 = parseInt(money500) }
                    money100 = money_change / 100
                    if (parseInt(money100) !== 0) {
                        letter100 = parseInt(money100)
                        money_change = money_change - (letter100 * 100)
                    } else { letter100 = parseInt(money100) }
                    money50 = money_change / 50
                    if (parseInt(money50) !== 0) {
                        letter50 = parseInt(money50)
                        money_change = money_change - (letter50 * 50)
                    } else { letter50 = parseInt(money50) }
                    money20 = money_change / 20
                    if (parseInt(money20) !== 0) {
                        letter20 = parseInt(money20)
                        money_change = money_change - (letter20 * 20)
                    } else { letter20 = parseInt(money20) }
                    coin10 = money_change / 10
                    if (parseInt(coin10) !== 0) {
                        letter10 = parseInt(coin10)
                        money_change = money_change - (letter10 * 10)

                    } else { letter10 = parseInt(coin10) }
                    coin5 = money_change / 5
                    if (parseInt(coin5) !== 0) {
                        letter5 = parseInt(coin5)
                        money_change = money_change - (letter5 * 5)
                    } else { letter5 = parseInt(coin5) }
                    coin2 = money_change / 2
                    if (parseInt(coin2) !== 0) {
                        letter2 = parseInt(coin2)
                        money_change = money_change - (letter2 * 2)
                    } else { letter2 = parseInt(coin2) }
                    coin1 = money_change / 1
                    if (parseInt(coin1) !== 0) {
                        letter1 = parseInt(coin1)
                        money_change = money_change - (letter1 * 1)
                    } else { letter1 = parseInt(coin1) }
                }
                if (money_change < 0) {
                    let money_new = messageNew.number
                    money_change = money_new / 1000
                    if (parseInt(money_change) !== 0) {
                        letter1000 = parseInt(money_change)
                        money_new = money_new - (money1000 * 1000)
                    } else { letter1000 = parseInt(money_change) }
                    money500 = money_new / 500
                    if (parseInt(money500) !== 0) {
                        letter500 = parseInt(money500)
                        money_new = money_new - (letter500 * 500)
                    } else { letter500 = parseInt(money500) }
                    money100 = money_new / 100
                    if (parseInt(money100) !== 0) {
                        letter100 = parseInt(money100)
                        money_new = money_new - (letter100 * 100)
                    } else { letter100 = parseInt(money100) }
                    money50 = money_new / 50
                    if (parseInt(money50) !== 0) {
                        letter50 = parseInt(money50)
                        money_new = money_new - (letter50 * 50)
                    } else { letter50 = parseInt(money50) }
                    money20 = money_new / 20
                    if (parseInt(money20) !== 0) {
                        letter20 = parseInt(money20)
                        money_new = money_new - (letter20 * 20)
                    } else { letter20 = parseInt(money20) }
                    coin10 = money_new / 10
                    if (parseInt(coin10) !== 0) {
                        letter10 = parseInt(coin10)
                        money_new = money_new - (letter10 * 10)

                    } else { letter10 = parseInt(coin10) }
                    coin5 = money_new / 5
                    if (parseInt(coin5) !== 0) {
                        letter5 = parseInt(coin5)
                        money_new = money_new - (letter5 * 5)
                    } else { letter5 = parseInt(coin5) }
                    coin2 = money_new / 2
                    if (parseInt(coin2) !== 0) {
                        letter2 = parseInt(coin2)
                        money_new = money_new - (letter2 * 2)
                    } else { letter2 = parseInt(coin2) }
                    coin1 = money_new / 1
                    if (parseInt(coin1) !== 0) {
                        letter1 = parseInt(coin1)
                        money_new = money_new - (letter1 * 1)
                    } else { letter1 = parseInt(coin1) }
                } else {
                    money_change = messageNew.number - caltime_first
                }
            }
            console.log(letter1);

            const objinsert = {
                bill1000: letter1000,
                bill500: letter500,
                bill100: letter100,
                bill50: letter50,
                bill20: letter20,
                coin10: letter10,
                coin5: letter5,
                coin2: letter2,
                coin1: letter1,
            }
            money_change = messageNew.number - caltime_first
            temp.push({
                Insert: messageNew.number,
                Number_locker: messageNew.number_locker,
                Canselect: 'true',
                Category: messageNew.category,
                Time: messageNew.time,
                Size: messageNew.size,
                Charge: parseInt(caltime_first),
                Coin: money_change === 0 ? 0 : objinsert,
                Status: money_change >= 0 ? 'true' : 'false',
                Fullname: messageNew.fullname
            })
            // temp.push(messageNew)
            this.setState({ message: temp })
        })
    }
    changeInput = (e) => {
        this.setState({ input: e.target.value })
    }
    setdata = (i, size) => {
        this.setState({ number_locker: i, size: size })
    }
    setCategory = (event) => {
        this.setState({ Category: event })
    }
    setinput = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    setsum = () => {
        const { date_start, date_end } = this.state
        var a = moment(date_start);
        var b = moment(date_end);
        let caltimed_min = ((b.diff(a, 'minute')))
        if (this.state.number_insert) {
            if (caltimed_min >= 1) {
                this.setState({ total: parseInt(this.state.number_insert), total_time: caltimed_min, time: '' })
            } else {
                alert("เวลาต้องมากกว่า 60 นาทีขึ้นไป")
            }
        } else {
            alert("กรุณาระบุจำนวนเงิน")
        }
    }
    onChange_date_start = date => {
        console.log(date);

        this.setState({ date_start: date })

    }
    onChange_date_end = date => {
        console.log(date);

        this.setState({ date_end: date })

    }
    render() {
        const { size, message, number_locker, number_insert, time, total, date_start, date_end } = this.state
        const p = this.props.history.location.state;
        const { firstname, lastname } = p
        return (
            <div>
                <nav class="navbar sticky-top navbar-light bg-light" >
                    <img src={icon.lockerlogin} style={{ width: 60, height: 60 }} />
                    <code style={{ fontSize: 30 }} >Coin Locker</code>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent" style={{ margin: 20 }}>
                        <div style={{ textAlign: '-webkit-right' }}>
                            <img src={icon.user} style={{ width: 40, height: 40, }} />
                            {firstname + ' ' + lastname}
                            <ul class="navbar-nav mr-auto" style={{ marginTop: 10 }}>
                                <button type="button" class="btn btn-outline-success" style={{ width: 130 }} onClick={() => window.location.href = "/"}>ออกจากระบบ</button>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div style={{ justifyContent: 'center', textAlign: 'center', marginTop: 50 }}>
                    <div style={{ fontSize: 20 }}>Size of Coin Locker </div>
                    <div style={{ justifyContent: 'center', textAlign: 'center', display: 'flex' }}>
                        <form>
                            <table style={{ width: 500, margin: 20 }} class="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">S</th>
                                        <th scope="col">M</th>
                                        <th scope="col">L</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ width: 100, textAlign: 'center' }}>
                                            {
                                                sizelockers.map((el, i) => {
                                                    return (
                                                        <div key={i} style={{ display: 'flex', flexDirection: 'column', margin: 10 }}>
                                                            <button onClick={(size) => this.setdata(el, size = "s")} type="button" class={number_locker === el ? "btn btn-danger" : "btn btn-success"}>{el}</button>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </td>
                                        <td style={{ width: 100 }}>
                                            {
                                                sizelockerm.map((el, i) => {
                                                    return (
                                                        <div key={i} style={{ display: 'flex', flexDirection: 'column', margin: 10 }}>
                                                            <button onClick={(size) => this.setdata(el, size = "m")} type="button" class={number_locker === el ? "btn btn-danger" : "btn btn-warning"}>{el}</button>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </td>
                                        <td style={{ width: 100 }}>
                                            {
                                                sizelockerl.map((el, i) => {
                                                    return (
                                                        <div key={i} style={{ display: 'flex', flexDirection: 'column', margin: 10 }}>
                                                            <button onClick={(size) => this.setdata(el, size = "l")} type="button" class={number_locker === el ? "btn btn-danger" : "btn btn-info"}>{el}</button>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            {number_locker ?
                                <div style={{ justifyContent: 'left', display: 'flex', borderStyle: 'solid', borderColor: '#75D9FF', borderRadius: 10 }}>
                                    <form style={{ textAlign: 'left', margin: 20 }}>
                                        <h3 style={{ width: 150 }} >ตู้หมายเลข</h3>
                                        <button style={{ width: 150 }} type="button" class={size === "s" ? "btn btn-success" : size === "m" ? "btn btn-warning" : "btn btn-info"}  >{number_locker}</button>
                                        <div style={{ borderWidth: 1, borderColor: 'blue' }}>
                                            <p>เงินฝาก : {total} บาท</p>
                                            <p>จำนวนเวลา : {this.state.total_time} นาที </p>
                                            <label for="inputZip" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}> <p style={{ color: 'red' }}>***</p> กรุณาระบุจำนวนเงิน</label>
                                            <input type="number" name="number_insert" onChange={(event) => this.setinput(event)} class="form-control" value={number_insert} />
                                            <label for="inputZip" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: 10 }}><p style={{ color: 'red' }}>***</p>วันเเละเวลาเริ่มต้น</label>
                                            <DateTimePicker
                                                onChange={this.onChange_date_start}
                                                value={this.state.date_start}
                                            />
                                            <label for="inputZip" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: 10 }}><p style={{ color: 'red' }}>***</p>วันเเละเวลาสิ้นสุด</label>
                                            <DateTimePicker
                                                onChange={this.onChange_date_end}
                                                value={this.state.date_end}
                                            />
                                        </div>
                                    </form>
                                    <div style={{ display: 'flex', flexDirection: 'row' }} >
                                        <form style={{ width: 300 }}>
                                            <div class="form-group col-md-2">
                                                <label for="inputZip">Number insert coin & bill</label>
                                                <form>
                                                    <div class="alert alert-danger" role="alert">
                                                        1 THB, 2 THB, 5 THB, and 10 THB!
                                                         </div>
                                                    <div class="alert alert-success" role="alert">
                                                        20 THB, 50 THB, 100 THB, 500 THB and 1000 THB
                                                         </div>
                                                </form>


                                                <div style={{ margin: 20, display: 'flex', justifyContent: 'space-between' }}>
                                                    <button onClick={() => this.setsum()} type="button" class="btn btn-success">ยืนยันข้อมูล</button>
                                                    <button type="button" class="btn btn-primary" onClick={() => this.send()}>จองตู้ Locker</button>
                                                </div>
                                                <button onClick={() => this.setState({ number_locker: '', total_time: '', total: '', date_start: new Date(), date_end: new Date() })} type="button" class="btn btn-danger">ยกเลิกการจอง</button>
                                            </div>
                                        </form>

                                    </div>

                                </div>
                                : ''}
                        </form>
                        <div style={{ justifyContent: 'center', textAlign: 'center', display: 'flex' }}>
                            <form>
                                <table style={{ width: 500, margin: 20 }} class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col"> <img src={icon.time} style={{ width: 30, height: 30 }} /> first 60 minutes</th>
                                            <th scope="col"><img src={icon.time} style={{ width: 30, height: 30 }} /> next minutes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>S</td>
                                            <td>50 THB</td>
                                            <td>25 THB</td>

                                        </tr>
                                        <tr>
                                            <td>M</td>
                                            <td>100 THB</td>
                                            <td>50 THB</td>
                                        </tr>
                                        <tr>
                                            <td>L</td>
                                            <td>200 THB</td>
                                            <td>100 THB</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'left' }}>
                                    <div class="card" style={{ width: 160, height: 250, margin: 20 }}>
                                        <img src={img.lockers} class="card-img-top" alt="..." />
                                        {/* <div class="card-body"> */}
                                        <h5 class="card-title">Locker Size S</h5>
                                        <p class="card-text">ตู้ขนาดเล็ก</p>
                                        <p class="card-text">60 นาทีเเรกคิดราคาเต็มนาทีต่อไปคิดครึ่งราคา</p>
                                        {/* </div> */}
                                    </div>
                                    <div class="card" style={{ width: 160, height: 250, margin: 20 }}>
                                        <img src={img.lockerm} class="card-img-top" alt="..." />
                                        {/* <div class="card-body"> */}
                                        <h5 class="card-title">Locker Size M</h5>
                                        <p class="card-text">ตู้ขนาดกลาง</p>
                                        <p class="card-text">60 นาทีเเรกคิดราคาเต็มนาทีต่อไปคิดครึ่งราคา</p>
                                        {/* </div> */}
                                    </div>
                                    <div class="card" style={{ width: 160, height: 250, margin: 20 }}>
                                        <img src={img.lockerl} class="card-img-top" alt="..." />
                                        {/* <div class="card-body"> */}
                                        <h5 class="card-title">Locker Size L</h5>
                                        <p class="card-text">ตู้ขนาดใหญ่</p>
                                        <p class="card-text">60 นาทีเเรกคิดราคาเต็มนาทีต่อไปคิดครึ่งราคา</p>
                                        {/* </div> */}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div style={{ justifyContent: 'center', textAlign: 'center', display: 'flex' }}>
                        <table style={{ width: 800 }} class="table table-striped">
                            <thead style={{ textAlign: 'center', padding: 40 }}>
                                <tr >
                                    <th scope="col"></th>
                                    <th scope="col">Story</th>
                                    <th scope="col">Unit selected</th>
                                    <th scope="col">Can select?</th>
                                    <th scope="col">Duration of deposit (Minutes)</th>
                                    <th scope="col">Insert</th>
                                    <th scope="col">Charge</th>
                                    <th scope="col">Change</th>
                                    <th scope="col">Got item back?</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    message.map((data, i) => {
                                        return (
                                            <tr style={{ textAlign: 'left' }}>
                                                <td >{i + 1}</td>
                                                <td>{data.Fullname} select unit of {data.Number_locker} insert  {data.Category} {data.Insert} baht for charge</td>
                                                <td>{data.Number_locker}</td>
                                                <td>{data.Canselect}</td>
                                                <td>{data.Time}</td>
                                                <td>{data.Insert}</td>
                                                <td>{data.Charge}</td>
                                                {
                                                    data.Coin === 0 ? <td>{data.Coin}</td>
                                                        :
                                                        <td style={{ width: 100 }}>
                                                            <div style={{ width: 100 }}> {data.Coin.bill1000 !== 0 ? '1000 ' + 'x' + data.Coin.bill1000 : ''}</div>
                                                            <div style={{ width: 100 }}> {data.Coin.bill500 !== 0 ? '500 ' + 'x' + data.Coin.bill500 : ''}</div>
                                                            <div style={{ width: 100 }}> {data.Coin.bill100 !== 0 ? '100 ' + 'x' + data.Coin.bill100 : ''}</div>
                                                            <div style={{ width: 100 }}> {data.Coin.bill50 !== 0 ? '50 ' + 'x' + data.Coin.bill50 : ''}</div>
                                                            <div style={{ width: 100 }}> {data.Coin.bill20 !== 0 ? '20 ' + 'x' + data.Coin.bill20 : ''}</div>
                                                            <div style={{ width: 100 }}> {data.Coin.coin10 !== 0 ? '10 ' + 'x' + data.Coin.coin10 : ''}</div>
                                                            <div style={{ width: 100 }}> {data.Coin.coin5 !== 0 ? '5 ' + 'x' + data.Coin.coin5 : ''}</div>
                                                            <div style={{ width: 100 }}> {data.Coin.coin2 !== 0 ? '2 ' + 'x' + data.Coin.coin2 : ''}</div>
                                                            <div style={{ width: 100 }}> {data.Coin.coin1 !== 0 ? '1 ' + 'x' + data.Coin.coin1 : ''}</div>
                                                        </td>
                                                }
                                                <td>{data.Status}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

            </div >
        )
    }
}
