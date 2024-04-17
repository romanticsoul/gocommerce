import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { signIn } from '@/auth'
// import Image from 'next/image'

export default function AuthPage() {
  return (
    <div className="container grid h-dvh grid-cols-12 items-center gap-4">
      <div className="col-span-8 col-start-3 max-w-screen-lg max-sm:col-span-12">
        <Card className="flex">
          <div className="flex-1">
            <CardHeader className="border-b">
              <Logo />
            </CardHeader>
            <CardContent className="p-6 pb-4">
              <form action="" className="grid gap-4">
                <div>
                  <Label htmlFor="email">Электронная почта</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@mail.ru"
                    autoFocus
                  />
                </div>
                <div>
                  <Label htmlFor="password">Пароль</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="не менее 6 символов"
                  />
                </div>
                <Button size="lg">Продолжить</Button>
              </form>
            </CardContent>
            <div className="mb-4 flex items-center gap-4">
              <Separator className="flex-1" />
              <div className="text-sm text-muted-foreground">или</div>
              <Separator className="flex-1" />
            </div>
            <CardFooter className="grid grid-cols-2 gap-2">
              <form
                action={async () => {
                  'use server'
                  await signIn('google')
                }}
              >
                <Button
                  type="submit"
                  variant="outline"
                  className="flex h-auto w-full items-center justify-start gap-2 px-4 py-2 text-start"
                >
                  <Image
                    src="/google-logo.svg"
                    alt="google logo"
                    width={30}
                    height={30}
                  />
                  <div>
                    <span className="text-xs text-muted-foreground">
                      С помощью
                    </span>
                    <p>Google</p>
                  </div>
                </Button>
              </form>
              <form
                action={async () => {
                  'use server'
                  await signIn('github')
                }}
              >
                <Button
                  type="submit"
                  variant="outline"
                  className="flex h-auto w-full items-center justify-start gap-2 px-4 py-2 text-start"
                >
                  <Image
                    src="/github-light-logo.svg"
                    alt="google logo"
                    width={30}
                    height={30}
                  />
                  <div>
                    <span className="text-xs text-muted-foreground">
                      С помощью
                    </span>
                    <p>Github</p>
                  </div>
                </Button>
              </form>
            </CardFooter>
          </div>
          <div className="relative flex-1 border-l max-lg:hidden">
            <Image
              src="/placeholder.svg"
              alt="placeholder"
              width={0}
              height={0}
              fill={true}
              className="object-cover dark:brightness-[0.1] dark:grayscale"
            />
          </div>
        </Card>
      </div>
    </div>
  )
}
