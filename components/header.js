import React from 'react';

class Header extends React.Component {
   render() {
      return (
		<nav className="navbar navbar-expand-lg navbar-light static-top">
		  <div className="container">
			<a className="navbar-brand" href="#">
				  <img src="https://via.placeholder.com/150x90?text=LogoImage" alt="logo" />
				</a>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
				  <span className="navbar-toggler-icon"></span>
				</button>
			<div className="collapse navbar-collapse" id="navbarResponsive">
			  <ul className="navbar-nav ml-auto">
				<li className="nav-item active">
				  <a className="nav-link google" href="#">Google
						<span className="sr-only">(current)</span>
					  </a>
				</li>
				<li className="nav-item">
				  <a className="nav-link yt" href="#">Youtube</a>
				</li>
				<li className="nav-item">
				  <a className="nav-link fb" href="#">Facebook</a>
				</li>
				<li className="nav-item">
				  <a className="nav-link tw" href="#">Twitter</a>
				</li>
				<li className="nav-item">
				  <a className="nav-link ins" href="#">instagram</a>
				</li>
				<li className="nav-item gp">
				  <a className="nav-link gp" href="#">Google+</a>
				</li>
			  </ul>
			</div>
		  </div>
		</nav>
      );
   }
}

export default Header;