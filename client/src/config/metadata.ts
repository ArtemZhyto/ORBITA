const baseUrl = process.env.MODE === 'prod'
  ? `https://${process.env.SITE}`
  : 'http://localhost:3030'

export const siteConfig = {
	title: {
  	default: "ORBITA",
  	template: "%s | ORBITA"
	},
  description: "Next-generation orbital radio-coverage analysis. Visualize, interact, and optimize satellite communication patterns with high precision",
  metadataBase: new URL(baseUrl),
	verification: {
    google: "-bFKUp9UZ0jYkL5-883QEea9xS55DmtTErC-3HBog_g",
  },
  openGraph: {
    title: "ORBITA",
    description: "Next-generation orbital radio-coverage analysis. Visualize, interact, and optimize satellite communication patterns with high precision",
		images: [
      {
        url: "/icon-512.png",
        width: 512,
        height: 512,
        alt: "ORBITA logo",
      }
    ],
    url: new URL(baseUrl),
		siteName: "ORBITA",
		locale: "en_US",
    type: "website"
  },
  twitter: {
    title: "ORBITA",
    description: "Next-generation orbital radio-coverage analysis. Visualize, interact, and optimize satellite communication patterns with high precision",
		card: "summary_large_image",
    images: ["/icon-512.png"],
		site: "ORBITA",
		creator: "Artem Zhytovoz"
  },
  robots: {
    index: true,
    follow: true,
  }
}