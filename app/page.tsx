import CallToAction from '@/components/call-to-action'
import ContentSection from '@/components/content-1'
import Content2 from '@/components/content-2'
import FAQsFour from '@/components/faqs-4'
import Features from '@/components/features-12'
import FooterSection from '@/components/footer'
import HeroSection from '@/components/hero-section'
import IntegrationsSection from '@/components/integrations-7'
import Integrations8 from '@/components/integrations-8'
import LogoCloud from '@/components/logo-cloud'
import Pricing from '@/components/pricing'
import PricingComparator from '@/components/pricing-comparator'
import StatsSection from '@/components/stats'
import TeamSection from '@/components/team'
import WallOfLoveSection from '@/components/testimonials'
// import library u/ get session
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import React from 'react'

// asinkron ketika ada sintaks await 
export default async function page() {
  // get session sesuai pengguna yg telah login
  const session = await auth.api.getSession({
    headers: await headers()
  })
  return (
    <div>
      {/* mengirimkan data session ke komponen HeroSection krn section ini isinya bersifat opsional  maka kita butuh parameter yg menentukan isi tampilan dari section nya */}
      <HeroSection session={session} />
      <LogoCloud />
      {/* <FeaturesSection /> */}
      <Features />
      <IntegrationsSection />
      <Integrations8 />
      <TeamSection />
      <ContentSection />
      <Content2 />
      <StatsSection />
      <WallOfLoveSection />
      <Pricing />
      <PricingComparator />
      <FAQsFour />
      <CallToAction />
      <FooterSection />
    </div>
  )
}




















/*
yg udh kita pelajari:
1 membuat aplikasi next js = 
2 apa saja maksud dr file yg telah digenerate saat membuat aplikasi next js
3 cara menampilkan terminal di vscode, dan menyembunyikan/menampilkan explorer
4 konsep routing di next js 
5 routing ke tiap halaman aplikasi dengan komponen Link
6 menampilkan gambar dr source luar & setting next.config u/ hal tsb
7 mengganti favicon aplikasi nextjs
8 cara membuat function component: export default function Nama(){
  return(
    <div>al ala</div>
  ) 
}

SEO = Search Engine Optimization
function js yg dijalankan setelah semua isi website ditampilkan kepada user
yg mbedakan next js, server component dikirim dulu ke web crawler nya baru secara asynchronous dikirim ke user
9 server & client component di nextjs
10 membuat client component di nextjs menjadi modular agar dapat dipanggil meskipun ada didalam server component

*/
