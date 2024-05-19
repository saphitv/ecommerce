import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import type { Metadata } from 'next'
import {Inter, Poppins} from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import './globals.css'
import { Toaster } from "@/components/ui/sonner";
import "@uploadthing/react/styles.css";
import {ourFileRouter} from "@/app/api/uploadthing/core";
import Providers from "@/components/providers";


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'E-commerce App (Portfolio)',
  description: 'An e-commerce app built with Next.js, UploadThing and Stripe',
}

export default async function RootLayout({
                                           children,
                                         }: {
  children: React.ReactNode
}) {
  const session = await auth();

  return (
      <SessionProvider session={session}>
        <html lang="en">
          <body className={inter.className}>
          <NextSSRPlugin
              /**
               * The `extractRouterConfig` will extract **only** the route configs
               * from the router to prevent additional information from being
               * leaked to the client. The data passed to the client is the same
               * as if you were to fetch `/api/uploadthing` directly.
               */
              routerConfig={extractRouterConfig(ourFileRouter)}
          />
            <Toaster richColors={true} duration={4000}/>
          <Providers>
              {children}
          </Providers>
          </body>
        </html>
      </SessionProvider>
  )
}