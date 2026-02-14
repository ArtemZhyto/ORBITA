//! SSR

//@ Styles
import "./global.css"
import "./layout.scss"

//@ Modules
import type { Metadata } from "next"
import Script from "next/script"
import { Afacad } from 'next/font/google'

//@ Metadata
import { siteConfig } from "@config/metadata"
import { jsonLd } from "@config/schema"

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
		<html lang="en" className={afacad.className}>
			<body>
				<Script type="application/ld+json"
				        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}/>

				{children}
			</body>
		</html>
	)
}

export default RootLayout