import React from 'react'
import LoginForm from '../../components/LoginForm'
import { Card, Row, Col } from "antd";
import { useSelector } from 'react-redux';

const backgroundStyle = {
	// backgroundImage: 'url(/img/others/img-17.jpg)',
	background:"#eeeeee59",
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover'
}

const Login = props => {
	const theme = useSelector(state => state.theme.currentTheme)
	return (
		<div className="h-100" style={backgroundStyle}>
			<div className="container d-flex flex-column justify-content-center h-100">
				<Row justify="center">
					<Col xs={20} sm={20} md={20} lg={12}>
						<Card >
							<div className="my-4">
								<div className="text-center">
									<img className="img-fluid" src={`/img/${theme === 'light' ? 'GETNETECOMMERCELOGO.png': 'logo-white.png'}`} alt="" />
									{/* <p>Don't have an account yet? <a href="/auth/register">Sign Up</a></p> */}
								</div>
								<Row justify="center">
									<Col xs={24} sm={24} md={20} lg={20}>
										<LoginForm {...props} />
									</Col>
								</Row>
							</div>
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	)
}

export default Login
