import 'dotenv/config';
import { prisma } from '../src/lib/db';



async function main() {
    const testUser = await prisma.user.upsert({
        where: { email: 'admin@acrelink.local' },
        update: {},
        create: {
            email: 'admin@acrelink.local',
            name: 'Platform Admin',
            role: 'ADMIN',
            spaces: {
                create: {
                    title: 'Spacious Rooftop Garden',
                    description: 'A beautiful rooftop garden space located on a 3-story building in Pabna. Perfect for micro-farming.',
                    sizeSqFt: 1200,
                    pricePerMo: 25.00,
                    isVerified: true
                }
            }
        }
    });
    console.log('Database seeded successfully with test user and space:', testUser.email);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });