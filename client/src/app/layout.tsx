//! SSR

//@ Styles
import "./global.css"
import "./layout.scss"

//@ Modules
import type { Metadata } from "next"
import { Afacad } from 'next/font/google'

//@ Metadata
import { siteConfig } from "@config/metadata"

export const metadata: Metadata = siteConfig

const afacad = Afacad({
	subsets: ['latin'],
	display: 'swap',
	preload: true,
	weight: ["400", "600", "700"],
	variable: '--font-afacad'
})

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="en"
					className={afacad.className}>
			<body>
				{children}
			</body>
		</html>
	)
}

export default RootLayout