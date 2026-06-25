import type { Metadata } from 'next'
import {
  Target,
  Eye,
  Users,
  Briefcase,
  Award,
  Smile,
  Calendar,
  ArrowRight,
  Globe,
  Heart,
  Zap,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'เกี่ยวกับเรา',
  description: 'ทำความรู้จักกับทีมของเรา วิสัยทัศน์ และเรื่องราวความเป็นมา',
}

const stats = [
  { icon: Users, value: '10,000+', label: 'ลูกค้าที่ไว้วางใจ' },
  { icon: Briefcase, value: '500+', label: 'โปรเจกต์ที่ส่งมอบ' },
  { icon: Award, value: '15+', label: 'รางวัลที่ได้รับ' },
  { icon: Smile, value: '98%', label: 'ความพึงพอใจ' },
]

const team = [
  {
    name: 'คุณสมชาย ใจดี',
    role: 'CEO & Founder',
    bio: 'ผู้ก่อตั้งบริษัทด้วยวิสัยทัศน์ในการสร้างสรรค์เทคโนโลยีเพื่อคนไทย',
    color: 'from-amber-400 to-orange-500',
  },
  {
    name: 'คุณสมหญิง รักงาน',
    role: 'CTO',
    bio: 'เชี่ยวชาญด้านสถาปัตยกรรมระบบและการพัฒนาแพลตฟอร์มขนาดใหญ่',
    color: 'from-blue-400 to-indigo-500',
  },
  {
    name: 'คุณวิชัย ก้าวหน้า',
    role: 'Head of Design',
    bio: 'หลงใหลใน UX/UI และการออกแบบที่เข้าถึงได้สำหรับทุกคน',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    name: 'คุณนภา สร้างสรรค์',
    role: 'Head of Product',
    bio: 'ขับเคลื่อนผลิตภัณฑ์ด้วยข้อมูลและความเข้าใจผู้ใช้อย่างลึกซึ้ง',
    color: 'from-pink-400 to-rose-500',
  },
]

const timeline = [
  { year: '2018', title: 'ก่อตั้งบริษัท', desc: 'เริ่มต้นจากทีมเล็ก ๆ 3 คน ในห้องเช่าขนาด 20 ตร.ม.' },
  { year: '2019', title: 'ลูกค้ารายที่ 100', desc: 'เปิดตัวผลิตภัณฑ์แรกและก้าวสู่ 100 ลูกค้าภายในปีเดียว' },
  { year: '2020', title: 'ขยายทีม', desc: 'ขยายทีมเป็น 30 คน เปิดออฟฟิศใหม่ใจกลางกรุงเทพ' },
  { year: '2021', title: 'ระดมทุน Series A', desc: 'ได้รับเงินลงทุน 50 ล้านบาท เพื่อขยายธุรกิจสู่ภูมิภาค' },
  { year: '2022', title: 'เปิดตัวแพลตฟอร์ม', desc: 'เปิดตัวแพลตฟอร์ม AI ช่วยวิเคราะห์ธุรกิจสำหรับ SME ไทย' },
  { year: '2024', title: '10,000 ลูกค้า', desc: 'ก้าวสู่หลักหมุด 10,000 ลูกค้า พร้อมขยายสู่ตลาดอาเซียน' },
]

export default function AboutPage() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="relative z-10 max-w-3xl text-center">
          <Badge
            className="rounded-full border-border py-1"
            variant="secondary"
          >
            <Heart className="mr-1 size-3.5 fill-rose-500 text-rose-500" />
            เกี่ยวกับเรา
          </Badge>

          <h1 className="mx-auto mt-6 max-w-xl font-medium text-4xl tracking-[-0.04em] sm:text-[2.75rem] md:text-6xl/[1.2]">
            เราสร้างเทคโนโลยี
            <br />
            <span className="text-primary">เพื่อคนไทย</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground text-xl md:text-2xl/normal">
            ทีมของเรามุ่งมั่นพัฒนาโซลูชันที่เข้าใจผู้ใช้ เข้าถึงง่าย
            และขับเคลื่อนธุรกิจของคุณให้เติบโตอย่างยั่งยืน
          </p>
          <div className="mt-12 flex items-center justify-center gap-4">
            <Button className="rounded-full" size="lg" asChild>
              <Link href="/contact">
                ติดต่อเรา <ArrowRight className="h-5! w-5!" />
              </Link>
            </Button>
            <Button
              className="rounded-full shadow-none"
              size="lg"
              variant="outline"
              asChild
            >
              <Link href="/course">ดูหลักสูตรของเรา</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-(--breakpoint-lg)">
          <div className="grid gap-8 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="mb-2 flex size-12 items-center justify-center rounded-2xl bg-primary/10">
                  <Target className="size-6 text-primary" />
                </div>
                <CardTitle className="text-2xl!">พันธกิจของเรา</CardTitle>
                <CardDescription className="text-base!">
                  เรามุ่งมั่นสร้างเทคโนโลยีที่ใช้งานง่าย เข้าถึงได้ทุกคน
                  และช่วยให้ธุรกิจไทยแข่งขันได้ในระดับสากล
                  ด้วยนวัตกรรมที่เข้าใจบริบทและวัฒนธรรมท้องถิ่น
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-2 flex size-12 items-center justify-center rounded-2xl bg-primary/10">
                  <Eye className="size-6 text-primary" />
                </div>
                <CardTitle className="text-2xl!">วิสัยทัศน์</CardTitle>
                <CardDescription className="text-base!">
                  เป็นแพลตฟอร์มอันดับหนึ่งของอาเซียน
                  ที่เชื่อมโยงเทคโนโลยีเข้ากับชีวิตประจำวันของผู้คน
                  สร้างโอกาสและความเท่าเทียมทางดิจิทัลให้กับทุกภาคส่วน
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-y bg-muted/30 px-6 py-20">
        <div className="mx-auto max-w-(--breakpoint-lg)">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center">
                <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-background shadow-sm ring-1 ring-foreground/5">
                  <stat.icon className="size-6 text-primary" />
                </div>
                <span className="font-medium text-3xl tracking-[-0.03em] sm:text-4xl">
                  {stat.value}
                </span>
                <span className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-(--breakpoint-lg)">
          <div className="mx-auto max-w-2xl text-center">
            <Badge
              className="rounded-full border-border py-1"
              variant="secondary"
            >
              <Users className="mr-1 size-3.5" />
              ทีมของเรา
            </Badge>
            <h2 className="mt-4 font-medium text-4xl tracking-[-0.04em] sm:text-[2.75rem]/[1.2]">
              ขับเคลื่อนโดยคนเก่ง
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              ทีมงานมากประสบการณ์ที่พร้อมสร้างสรรค์สิ่งที่ดีที่สุดให้กับคุณ
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <Card key={member.name} className="group text-center">
                <CardContent className="pt-6">
                  <div
                    className={`mx-auto mb-5 size-24 rounded-full bg-linear-to-br ${member.color} flex items-center justify-center`}
                  >
                    <span className="text-2xl font-medium text-white">
                      {member.name.charAt(0)}{member.name.split(' ')[1]?.charAt(0)}
                    </span>
                  </div>
                  <CardTitle className="text-lg!">{member.name}</CardTitle>
                  <CardDescription className="mt-0.5 mb-2 text-sm font-medium text-primary">
                    {member.role}
                  </CardDescription>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="border-y bg-muted/30 px-6 py-20">
        <div className="mx-auto max-w-(--breakpoint-lg)">
          <div className="mx-auto max-w-2xl text-center">
            <Badge
              className="rounded-full border-border py-1"
              variant="secondary"
            >
              <Calendar className="mr-1 size-3.5" />
              เส้นทางของเรา
            </Badge>
            <h2 className="mt-4 font-medium text-4xl tracking-[-0.04em] sm:text-[2.75rem]/[1.2]">
              กว่าจะเป็นวันนี้
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              เรื่องราวการเดินทางจากวันแรกสู่วันนี้
            </p>
          </div>

          <div className="relative mt-16">
            <div className="absolute inset-y-0 left-4 w-px bg-border sm:left-1/2 sm:-translate-x-px" />

            <div className="flex flex-col gap-10">
              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className={`relative flex items-start gap-6 sm:gap-0 ${
                    index % 2 === 0
                      ? 'sm:flex-row'
                      : 'sm:flex-row-reverse'
                  }`}
                >
                  <div className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background sm:absolute sm:left-1/2 sm:-translate-x-1/2">
                    <div className="size-3 rounded-full bg-primary" />
                  </div>

                  <div
                    className={`sm:w-[calc(50%-2rem)] ${
                      index % 2 === 0 ? 'sm:pr-16 sm:text-right' : 'sm:pl-16'
                    }`}
                  >
                    <Card className="inline-block text-start">
                      <CardHeader>
                        <span className="font-medium text-sm text-primary">
                          {item.year}
                        </span>
                        <CardTitle className="text-lg!">{item.title}</CardTitle>
                        <CardDescription>{item.desc}</CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-(--breakpoint-lg)">
          <div className="mx-auto max-w-2xl text-center">
            <Badge
              className="rounded-full border-border py-1"
              variant="secondary"
            >
              <Zap className="mr-1 size-3.5" />
              ค่านิยมองค์กร
            </Badge>
            <h2 className="mt-4 font-medium text-4xl tracking-[-0.04em] sm:text-[2.75rem]/[1.2]">
              สิ่งที่เราเชื่อมั่น
            </h2>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {[
              {
                icon: Globe,
                title: 'เข้าใจท้องถิ่น',
                desc: 'เราออกแบบทุกอย่างโดยคำนึงถึงผู้ใช้คนไทยเป็นอันดับแรก ภาษา วัฒนธรรม และพฤติกรรมคือหัวใจของทุกผลิตภัณฑ์',
              },
              {
                icon: Zap,
                title: 'รวดเร็ว ทันสมัย',
                desc: 'เราเชื่อว่าเทคโนโลยีที่ดีต้องรวดเร็วและทันสมัย เราไม่หยุดพัฒนาเพื่อให้คุณได้สิ่งที่ดีที่สุดเสมอ',
              },
              {
                icon: Heart,
                title: 'ใส่ใจทุกรายละเอียด',
                desc: 'ทุกพิกเซล ทุกตัวอักษร ทุกการโต้ตอบผ่านการคิดและทดสอบอย่างพิถีพิถัน เพื่อประสบการณ์ที่ยอดเยี่ยม',
              },
            ].map((value) => (
              <div key={value.title} className="flex flex-col items-center text-center">
                <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-primary/10">
                  <value.icon className="size-7 text-primary" />
                </div>
                <h3 className="font-medium text-xl tracking-[-0.02em]">
                  {value.title}
                </h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-medium text-3xl tracking-[-0.03em] sm:text-4xl">
            พร้อมเริ่มต้นไปด้วยกันไหม?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            ไม่ว่าคุณจะเป็นธุรกิจขนาดเล็กหรือองค์กรขนาดใหญ่
            เราพร้อมเป็นพาร์ทเนอร์ที่จะช่วยให้คุณเติบโต
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button className="rounded-full" size="lg" asChild>
              <Link href="/contact">
                ติดต่อเรา <ArrowRight className="h-5! w-5!" />
              </Link>
            </Button>
            <Button
              className="rounded-full shadow-none"
              size="lg"
              variant="outline"
              asChild
            >
              <Link href="/course">ดูหลักสูตร</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
