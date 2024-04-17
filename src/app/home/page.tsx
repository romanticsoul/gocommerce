import Image from 'next/image'
export default function Home() {
  return (
    <main>
      <Image
        src="/placeholder.svg"
        alt="Image"
        width="1920"
        height="1080"
        className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
      />
      Hello world
    </main>
  )
}
