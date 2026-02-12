const baseUrl = process.env.MODE === 'prod'
  ? `https://${process.env.SITE}`
  : 'http://localhost:3000'

export const siteConfig = {
	title: {
  	default: "ORBITA",
  	template: "%s | ORBITA"
	},
  description: "Next-generation orbital radio-coverage analysis. Visualize, interact, and optimize satellite communication patterns with high precision",
  metadataBase: new URL(baseUrl),
	other: {
    "msapplication-config": "/browserconfig.xml",
  },
  openGraph: {
    title: "ORBITA",
    description: "Next-generation orbital radio-coverage analysis. Visualize, interact, and optimize satellite communication patterns with high precision",
		images: [
      {
        url: "/images/web-app-manifest-512x512.png",
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
    images: ["/images/web-app-manifest-512x512.png"],
		site: "ORBITA",
		creator: "Artem Zhytovoz"
  },
  robots: {
    index: true,
    follow: true,
  }
}