import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const slides = await prisma.slide.findMany()
    const programs = await prisma.program.findMany()
    const news = await prisma.news.findMany()

    console.log(`Slides: ${slides.length}`)
    console.log(`Programs: ${programs.length}`)
    console.log(`News: ${news.length}`)

    if (slides.length === 5 && programs.length === 6 && news.length === 4) {
        console.log('Verification SUCCESS')
    } else {
        console.log('Verification FAILED')
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
