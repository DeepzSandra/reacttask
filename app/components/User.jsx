import React from 'react'
import Auth from '../modules/Auth.js'
import {Link} from 'react-router-dom'

import {listUser,getUser,addContact,listFullContact} from "../stores/userStore.js";

import {handleadmin} from '../modules/user.js';
import InputCheckbox from "./InputCheckbox.jsx";
import BootstrapModal from "./BootstrapModal.jsx";

import moment from 'moment';
import Select from 'react-select';
var createReactClass = require('create-react-class');
var NotificationSystem = require('react-notification-system');
import { socketRec, socketEmit } from '../services/socketService.js';
//var template = require('../templates/country-component.jsx');
var PER_PAGE = 25;

var Admin = createReactClass({
   _notificationSystem: null,
    contextTypes: {
    router: React.PropTypes.object
  },
  
   getInitialState : function() {
      return {
          items: [],
          max: 0,
          isOpen: false,
          perPage: 25,
          total: 0,
          currentPage: 1,
          username: 1,
          listfullusers:[],
          ops: "add",
          my_self: "",
          from_user: ""
      };
   
  },

  socketRecx() {
    var _this = this;
    socketRec({"fname": "receiveMessage"}, data => {
      _this.setState({
        isOpen: true,
        chatId: data.username,
        chatName: data.chatName
      });
      var d = document.createElement( 'div' );
        d.className = "chat-msg user";
        d.innerHTML = '<span class="msg-avatar"><div class="c_user_l color2">NG</div></span><div class="cm-msg-text">'+data.msg+'</div>';
        var p = document.getElementById('chat-logs');
        p.appendChild(d);
        
     })
  },

  reloadPage() {
      this.setState({
        isOpen: false
      });
      this.onChangePage(1);

  },
  cancelModal(index, id, event){
      
      var spiltName = id.split("-");
       this.setState({
        isOpen: true,
        chatId: spiltName[0],
        chatName: spiltName[1]
      });
  },
  closeChat(){
     this.setState({
        isOpen: false
      });
  },
  handleSubmit(event) {
      /*var editParms ={
              msg: this.state.chatmsg,
              sendid: this.state.username,
              chatid: this.state.chatid,
              date: new Date()

            }
      addChat(editParms, function(user) {
              this.setState({
                "title": "View Contact", 
                "fullname":this.state.chatmsg
               
              });
          }.bind(this));*/
      event.preventDefault();
      var data = {};
      data.result = {};
      data.result["msg"] = this.state.chatmsg;
      data.result["username"] = this.state.chatId;
      data.result["chatName"] = this.state.chatName;
      data.fname = "sendMessage";
      socketEmit(data, function(res) {
        

      })
      var d = document.createElement( 'div' );
        d.setAttribute("class", "chat-msg self");
        d.innerHTML = '<span class="msg-avatar"><div class="c_user_l color3">RN</div></span><div class="cm-msg-text">'+this.state.chatmsg+'</div>';
        var p = document.getElementById('chat-logs');
        p.appendChild(d);
  },

handleCheckboxChange: function (index, id, event) {
      this.onuserChange(id);
    var checked = this.state.checkAll;
    checked[index] = {"checked": event.target.checked, "id": id};
    
    this.setState({
       checkedAll: checked
    });
    
  },
  componentDidMount: function() {
      this.onChangePage(1);
      handleadmin({ component: this });
      this._notificationSystem = this.refs.notificationSystem;
     this.onuserChange(2);
     var postParms= {};
      listFullContact(postParms, function(user) {
          this.setState({
              listfullusers: user
          });
       
      }.bind(this));

      this.socketRecx();
  },
 onuserChange(list) {
   var editParms ={
          id : list
        }
         getUser(editParms, function(user) {
          this.setState({
            "title": "View Contact", 
            "fullname": user.name,
            "phone":user.phone,
            "email":user.email,
            "company_name":user.company_name,
            "address":user.address,
            "id": user.id
           
          });
      }.bind(this));

 },
  onChangePage(page) {
    
      var postParms = {
          end: Number(this.state.perPage),
          start: Number(this.state.perPage) * (page - 1),
          page: page,
          username: page,
          limit: true
      }
      listUser(postParms, function(user) {
          var max = Math.ceil(user.total/Number(this.state.perPage));
         
          this.setState({
              items: user,
              max: max,
              maxVisible: max > 5 ? 5 : max,
              total: user.total,
              start: Number(this.state.perPage) * (page - 1) == 0 ? 1 : Number(this.state.perPage) * (page - 1),
              end: this.state.perPage * page < user.total ? this.state.perPage * page : user.total,
              currentPage: page
          });
       
      }.bind(this));
      
  },
 
  renderItem: function(item) {
   
        return <tr >
        <td><InputCheckbox checked={this.state.id == item.id ? true:false} onChange={this.handleCheckboxChange.bind(this, arguments[1], item.id)}/></td>
       <td><button className="btn ch_btn" type="button" onClick={this.cancelModal.bind(this, arguments[1], item.id+"-"+item.name)}><img src="images/chat.png" width="22"/></button></td>
                  <td> <div className="c_user_ox">
                        <div className="c_user_c">
                          <p>{item.name}</p>
                          <span>{item.email}</span>
                        </div>
                      </div></td>
                  <td>{item.company_name}</td>
                </tr>;
  },
   handleContactChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        this.setState({
            [name]: value
        });
   
  },
  handleAddContact(event){
    
    if(this.state.full_name != undefined && this.state.emailid != undefined){
          var editParms ={
              name: this.state.full_name,
              email: this.state.emailid,
              company_name: this.state.company_name,
              phone: this.state.phone_login,
              id: this.state.listfullusers.length + 1

            }
      addContact(editParms, function(user) {
              this.setState({
                "title": "View Contact",
                 "msg" : user.msg
              });
          }.bind(this));
      window.location.reload();
    }
  },

  handleInputChange(event) {
        //refer this link https://facebook.github.io/react/docs/forms.html
        const target = event.target;
        this.onChangePage(target.value);
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        this.setState({
            [name]: value
        });

        if(name == "username") {
            var data = {};
            data.fname = "login";
            data.username = value;
            socketEmit(data, function(res) {
              console.log(res);
            })
        }
  },
  handleChatChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        this.setState({
            [name]: value
        });
  },
  renderRegion(item) {
    return <option key={item.id} value={item.id}>{item.name}</option>;
  },

  _addNotification: function(data) {
    this._notificationSystem.addNotification({
      message: data.msg,
      level: data.status,
      title: data.title
    });
  },
  showEditUser(id) {
      var postParms = {
          id: id
      };
     this.context.router.history.push('/accounts/editcontact?id='+ id)
   
  },
  render() {
    var s = this.state;
    var chatlist;
    if(this.state.isOpen == true){
    chatlist = <div className="chat-box" id="chatModal">
    <div className="chat-box-header"> {this.state.chatName}<span className="chat-box-toggle" onClick={this.closeChat}><img src="images/close-w.png" width="14"/></span></div>
    <div className="chat-box-body">
      <div className="chat-box-overlay">   
      </div>  
      <div className="chat-logs" id="chat-logs">
        
     
        
      </div>
    </div>
    <div className="chat-input">      
      <form role="form" ref={ form =>(this.addChatForm = form) } onSubmit={ this.handleSubmit }>
        <input type="text" id="chat-input" name="chatmsg" value={this.state.chatmsg} onChange={this.handleChatChange} placeholder="Send a message..."/>  
        <button type="submit" className="chat-submit" id="chat-submit" onClick={ this.handleSubmit }><img src="images/send.png" width="18"/></button>
      </form>      
    </div>
  </div>;
}
    console.log(s,"----------")
    return  <section id="main-content">

            <div className="wrapper" id="">

           <header className="">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <button type="button" className="btn btn-light h_src_btn"><img src="images/search.png" width="16"/></button>
          </div>
          <div className="col-md-6">
               <nav className="navbar my_nav navbar-expand-lg navbar-dark bg-dark2">
              <div className="container-fluid">    
                <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                  <a className="nav-link" href="about.html">+Add</a>
                  </li>
                <li className="nav-item dropdown">
                 <select className="form-control" id="username" name="username" value={this.state.username} onChange={this.handleInputChange} >
                                {s.listfullusers.map(this.renderRegion)}
                            </select>
                </li>
                </ul>
                </div>            
                  
              </div>
              </nav>      
          </div>
        </div>    
      </div>
    </header>
      <section className="conts_main">
      <div className="container-main">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-7">
              
                <div className="conts_l_hd">
                  <div className="conts_l_hd_left">
                    <h3>Contacts </h3>
                    <p>Welcome to flatCRM Contact page</p>
                  </div>
                  <div className="conts_l_hd_right">
                    <span className="cr_span">Sort by :</span>
                    <div className="dropdown cr_dw">
                      <button type="button" className="btn dropdown-toggle" data-toggle="dropdown">Data Created</button>
                      <div className="dropdown-menu">
                        <a className="dropdown-item" href="#">Link 1</a>
                        <a className="dropdown-item" href="#">Link 2</a>
                        <a className="dropdown-item" href="#">Link 3</a>
                      </div>
                    </div>  
                  </div>
                </div>    
            
                <div className="ser_main">
                  <div className="ser_left">
                    <div className="input-group src_box">
                      <input type="text" className="form-control" placeholder="Search Contact"/>
                      <div className="input-group-append">
                          </div>
                    </div>
                  </div>
                  <div className="ser_right">
                    <button type="button" className="btn btn-prima" data-toggle="modal" data-target="#myModal">+ Add Contact</button>
                  </div>
                </div>
              
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div className="conts_left">  
              <div className="con_chec_main">
              
                <table className="table chec_table table-borderless">
                <thead>
                  <tr>
                    <th><button type="button" className="btn btn-light">+</button></th>
                    <th width="9%">Chat</th>
                    <th>Basic Info</th>
                    <th>Company</th>
                  </tr>
                </thead>
                <tbody>
                 {s.items.map(this.renderItem)}
                </tbody>
                </table>              
                          
              </div>
          
            </div>
          </div>
          <div className="col-md-5">
          
            <div className="cont_m_box">
              <div className="cont_m_h text-center">
                <div className="cont_m_name">XX</div>
              </div>
              <div className="cont_m_n text-center">
                <h4>{s.fullname}</h4>
                <p>Radio buttons are used if you want to limit</p>
              </div>
              <div className="cont_m_tbl">
                <table className="table cmt_table table-borderless">
                  <tbody>
                    <tr>
                      <td width="31%">Full Name :</td>
                      <td width="69%">{s.fullname}</td>
                    </tr>                     
                    <tr>
                      <td>Email :</td>
                      <td>{s.email}</td>
                    </tr>                     
                    <tr>
                      <td>Phone :</td>
                      <td>{s.phone}</td>
                    </tr>                     
                    <tr>
                      <td>Company  :</td>
                      <td>{s.company_name}</td>
                    </tr>                     
                    <tr>
                      <td>Address :</td>
                      <td>{s.address}</td>
                    </tr>                     
                  </tbody>
                </table>              
              </div>
              
            </div>
            

            
          </div>
        </div>    
      </div>
      <div className="container">


   <div className="modal" id="myModal">
    <div className="modal-dialog">
      <div className="modal-content">
      
        <div className="modal-header">
          <h4 className="modal-title">Add Contact</h4>
          <button type="button" className="close" data-dismiss="modal">&times;</button>
        </div>
        
        <div className="modal-body">
         <div className="form-group row">
                <label for="name" className="col-md-4 col-form-label text-md-right">Full Name</label>
                <div className="col-md-6">
                    <input type="text" id="full_name" className="form-control" name="full_name" value={this.state.full_name} onChange={this.handleContactChange} required/>
                 {this.state.full_name == undefined ? <span style={{color: "red"}}>Please Enter Full Name</span> : ''} 
     
                </div>
            </div>
            <div className="form-group row">
                <label for="email" className="col-md-4 col-form-label text-md-right">Email</label>
                <div className="col-md-6">
                    <input type="text" id="emailid" className="form-control" name="emailid" onChange={this.handleContactChange} />
                 {this.state.emailid == undefined ? <span style={{color: "red"}}>Please Enter Email Id</span> : ''} 
     
                </div>
            </div>
            <div className="form-group row">
                <label for="phone_login" className="col-md-4 col-form-label text-md-right">Phone Number</label>
                <div className="col-md-6">
                    <input type="text" id="phone_login" className="form-control" name="phone_login" onChange={this.handleContactChange} required/>
                 {this.state.phone_login == undefined ? <span style={{color: "red"}}>Please Enter Phone No</span> : ''} 
     
                </div>
            </div>
               <div className="form-group row">
                <label for="company_name" className="col-md-4 col-form-label text-md-right">Company Name</label>
                <div className="col-md-6">
                    <input type="text" id="company_name" className="form-control" name="company_name"  onChange={this.handleContactChange} required/>
                 {this.state.company_name == undefined ? <span style={{color: "red"}}>Please Enter Company Name</span> : ''} 
                </div>
            </div>
        </div>
        
        <div className="modal-footer">
           <button type="submit" className="btn btn-success" onClick={ this.handleAddContact }>Save</button>
          <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
        </div>
        
      </div>
    </div>
  </div>
  
</div>

    </section>
            </div>
                
      {chatlist}
      </section>
  }
});

export default Admin;
