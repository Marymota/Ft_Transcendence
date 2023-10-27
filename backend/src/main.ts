import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })

//   .catch(async (e) => {
//     console.error(e);

//     await prisma.$disconnect();

//     process.exit(1);
//   });
