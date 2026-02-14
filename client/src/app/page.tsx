'use client'

//@ Styles
import "./Home.scss"

//@ Components
import View from "@app-components/View/View"
import Control from "@app-components/Controls/Control"

const Home = () => {
	return (
		<div className="Home">
			<View/>
			<Control/>
		</div>
	)
}

export default Home