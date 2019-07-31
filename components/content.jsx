import React from 'react';
import ReactDOM from 'react-dom';

class PageContent extends React.Component {
	
	constructor(props) {
        super(props);
        this.state = {
			fname:"",
			lname:"",
			contact:"",
			email:"",
			date:"",
			address:"",
			selectedDepartments:[],
			showDeptsList : false,
			isValidFname: true,
			isValidEmail: true,
			isEmptyEmail: true,
			isValidContact: true,
			isValidDate: true,
			isValidDept: true,
			allowRegister : false
		}
	}
	
	componentDidMount(){
		if($('#date')){
			$('#date').datepicker({
			}).change(this.onChangeInputHandler.bind(this,event)).on('changeDate', this.onChangeInputHandler.bind(this,event));
		}
	}
	
	validateEmail(email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}
	
	runValidation(){
		if(this.state.fname && this.state.email && this.validateEmail(this.state.email) && this.state.contact && this.state.date && this.state.selectedDepartments.length){ return true;}
		else {
			if(!this.state.fname) this.setState({isValidFname : false});
			if(!this.state.email) this.setState({isEmptyEmail : false});
			if(this.state.email && !this.validateEmail(this.state.email)) this.setState({isValidEmail : false});
			if(!this.state.contact) this.setState({isValidContact : false});
			if(!this.state.date) this.setState({isValidDate : false});
			if(!this.state.selectedDepartments.length) this.setState({isValidDept : false});
			return false;
		}
	}
	
	register() {
		event.preventDefault()
		var isValidForm = this.runValidation();
		if(isValidForm) {
			if(localStorage.users){
				var users = JSON.parse(localStorage.users);
				users.push({fname:this.state.fname,lname:this.state.lname,contact:this.state.contact,email:this.state.email,address:this.state.address,selectedDepartments:this.state.selectedDepartments,date:this.state.date});
				localStorage.setItem('users', JSON.stringify(users))
			} else {
				var users = [];
				users.push({fname:this.state.fname,lname:this.state.lname,contact:this.state.contact,email:this.state.email,address:this.state.address,selectedDepartments:this.state.selectedDepartments,date:this.state.date});
				localStorage.setItem('users', JSON.stringify(users))
			}
			this.setState({allowRegister : true});
		}
	}
	
	resetAll(){
		event.preventDefault()
		this.setState({fname:"",lname:"",contact:"",email:"",address:"",selectedDepartments:[],date:""})
	}
	
	onChangeInputHandler(){
		var targetId = event.target.id, _this = this;
		switch(targetId){
			case 'fname':
				_this.setState({fname: event.target.value, isValidFname : true})
				break;
			
			case 'lname':
				_this.setState({lname: event.target.value})
				break;
				
			case 'contact':
				_this.setState({contact: event.target.value, isValidContact : true})
				break;
				
			case 'email':
				_this.setState({email: event.target.value, isValidEmail : true, isEmptyEmail : true})
				break;
				
			case 'address':
				_this.setState({address: event.target.value})
				break;
				
			case 'date':
				_this.setState({date: event.target.value, isValidDate : true})
				break;
		}
		
		if(_this.refs && _this.refs.date.value) _this.setState({date: _this.refs.date.value, isValidDate : true})
	}
	
	deptsListHandler(){
		this.setState({isValidDept : true})
		this.setState({showDeptsList: !this.state.showDeptsList});
		if(this.refs && this.refs.date.value) this.setState({date: this.refs.date.value, isValidDate : true})
	}
	
	departmentHandler(){
		var selectedDeps = this.state.selectedDepartments;
		if(selectedDeps.includes(event.target.value)){
			selectedDeps.splice(selectedDeps.indexOf(event.target.value),1);
		} else {
			selectedDeps.push(event.target.value);
		}
		this.setState({selectedDepartments : selectedDeps})
		if(this.refs && this.refs.date.value) this.setState({date: this.refs.date.value, isValidDate : true})
	}
	
	backToRegister(){
		this.resetAll();
		this.setState({allowRegister : false})
	}
	
   render() {
      return (
         <div className="page-content">
			<div className="text-center">
			  <h1 className="formTitle">{!this.state.allowRegister ? "User Registration Form" : "Users List"}</h1>
			</div>
		 {!this.state.allowRegister ? (
            <form className="row">
			  <div className="col-md-6 form-group">
				<label htmlFor="fname" className="requiredField">First name</label>
				<input type="text" className={!this.state.isValidFname ? "form-control errorBg" : "form-control"} id="fname" value={this.state.fname} onChange={this.onChangeInputHandler.bind(this,event)} name="fname" required/>
					{!this.state.isValidFname ? <span className="error"><i>First name can not be blank.</i></span> : ""}
			  </div>
			  <div className="col-md-6 form-group">
				<label htmlFor="lname">Last name</label>
				<input type="text" className="form-control" id="lname" value={this.state.lname} onChange={this.onChangeInputHandler.bind(this,event)} name="lname"/>
			  </div>
			  <div className="col-md-6 form-group">
				<label htmlFor="contact" className="requiredField">Contact</label>
				<input type="tel" className={!this.state.isValidContact ? "form-control errorBg" : "form-control"} id="contact" value={this.state.contact} onChange={this.onChangeInputHandler.bind(this,event)} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="contact" maxLength="10" required/>
				{!this.state.isValidContact ? <span className="error"><i>Contact can not be blank.</i></span> : ""}
			  </div>
			  <div className="col-md-6 form-group">
				<label htmlFor="email" className="requiredField">Email</label>
				<input type="email" className={!this.state.isEmptyEmail ? "form-control errorBg" : "form-control"} id="email" value={this.state.email} onChange={this.onChangeInputHandler.bind(this,event)} name="email" required/>
				{!this.state.isEmptyEmail ? <span className="error"><i>Email can not be blank.</i></span> : ""}
				{!this.state.isValidEmail ? <span className="error"><i>Email is not valid.</i></span> : ""}
			  </div>
			  <div className="col-md-6 form-group">
				  <label htmlFor="date" className="requiredField">Date of Registration</label>
				  <div className="input-group date" data-provide="datepicker">
					<input type="text" className={!this.state.isValidDate ? "form-control errorBg" : "form-control"} ref="date" id="date" value={this.state.date} onChangeDate={this.onChangeInputHandler.bind(this,event)} />
					{!this.state.isValidDate ? <span className="error"><i>Date can not be blank.</i></span> : ""}
					<div className="input-group-addon">
						<span className="glyphicon glyphicon-th"></span>
					</div>
				  </div>
			  </div>			  
			  <div className="col-md-6 form-group">
				<label htmlFor="departments" className="requiredField">Select Departments</label>
				<div id="departments">
					<div id="selectBox" className={!this.state.isValidDept ? "form-control errorBg" : "form-control"} onClick={this.deptsListHandler.bind(this)}>
						<span>{this.state.selectedDepartments.length ? this.state.selectedDepartments.length+" Selected" : "None Selected"}</span>
					</div>
					{!this.state.isValidDept ? <span className="error"><i>Department can not be blank.</i></span> : ""}
					<div id="departmentsList" className={this.state.showDeptsList ? "" : "hidden"}>
						<ul>
							<li>
								<label className="form-check-label">
								  <input className="form-check-input" type="checkbox" defaultValue="Admin" onChange={this.departmentHandler.bind(this,event)} checked={this.state.selectedDepartments.includes('Admin')}/> Admin
								</label>
							</li>
							<li>
								<label className="form-check-label">
								  <input className="form-check-input" type="checkbox" defaultValue="Finance" onChange={this.departmentHandler.bind(this,event)} checked={this.state.selectedDepartments.includes('Finance')}/> Finance
								</label>
							</li>
							<li>
								<label className="form-check-label">
								  <input className="form-check-input" type="checkbox" defaultValue="IT" onChange={this.departmentHandler.bind(this,event)} checked={this.state.selectedDepartments.includes('IT')}/> IT
								</label>
							</li>
							<li>
								<label className="form-check-label">
								  <input className="form-check-input" type="checkbox" defaultValue="operations" onChange={this.departmentHandler.bind(this,event)} checked={this.state.selectedDepartments.includes('operations')}/> Operations
								</label>
							</li>
						</ul>
					</div>
				</div>
			  </div>
			  <div className="col-md-6 form-group">
				<label htmlFor="address">Address</label>
				<textarea className="form-control" id="address" value={this.state.address} onChange={this.onChangeInputHandler.bind(this,event)} maxLength="50"/>
				<span><i>(Max 100 charecters)</i></span>
			  </div>
			  <div className="btnContainer text-right">
				  <button className="btn btn-info" onClick={this.resetAll.bind(this,event)}>Reset</button>
				  <button className="btn btn-primary" onClick={this.register.bind(this,event)}>Submit</button>
			  </div>
		 </form>) : (<div>
			<div className="btnContainer text-right">
				<button className="btn btn-primary" onClick={this.backToRegister.bind(this,event)}>Add User</button>
			 </div>
		 <div className="container table-responsive">
			 <table className="table">
				<thead>
				  <tr>
					<th>Firstname</th>
					<th>Lastname</th>
					<th>Email</th>
					<th>Departments</th>
					<th>Contact</th>
					<th>Joining Date</th>
				  </tr>
				</thead>
				<tbody>
				{	
				 localStorage.users && localStorage.users.length &&
				 JSON.parse(localStorage.users).map((user,index)=> <tr key={"user"+index}>
					<td>{user.fname}</td>
					<td>{user.lname}</td>
					<td>{user.email}</td>
					<td>{user.selectedDepartments.join(',')}</td>
					<td>{user.contact}</td>
					<td>{user.date}</td>
				  </tr>)
				}
				</tbody>
			</table>			 
		 </div>
		 </div>)}
         </div>
      );
   }
}

export default PageContent;