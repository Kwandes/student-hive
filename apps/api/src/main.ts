/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // SwaggerUi Documentation
  const config = new DocumentBuilder()
    .setTitle('Student Hive API')
    .setDescription('Lorem Ipsum here I guess. Who reads this anyway?')
    .setVersion('6.9')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
  Logger.warn(`Say "Ya Yeet" three times to summon the Y̷̼͊̄͠ẽ̵̡̢̯͈͔̻̮̻͖̪͈͎̙͉̟͌̉̿͆̆͘é̸̛̥̩̟̳̱͛̊̒̇̚t̴̖̽̂ú̵̲̫̲̻͉̋͛̈́̏̍̂̎́̍͝s̶̜̏͂͛ ̵̧̤̘͕̳̘̥̙̞̉̈́̀͗͒͐͋C̸͙̲̰͕̍̋͂͛̾͗̒̀A̶̫̬̫̼͎̗̘̘̭̠̽̌̏͌̓̌͑͜͜Y̵̢̛̮̥̗̰̫̻̦̞͊̒͛͋̋͊̽͑͒͐͂̈́̀ ̷̨̼̙̩̤͚̓̓͊͝͠M̷̪̐ą̵̫̙̦̳̲̑̾̔̈́͆̊͐̑͘͠ͅx̵̡̤̟̰̲̭̩͊̎̍͂̓̽̾͠i̸̛̲̭̼͐͆͒̊̍̈́̇̌̆́͐͘̕ú̷̱̳͓̪̙̆́͠m̴̨̗̼͈͉̭̜͔̬̻̣̱̠͈̌̏͑͆́͠ͅù̷̢̻̥̥̫̬s̵̻̗̝̞͉͚̙͙̝̱͈̱͔̉͆̂̈̉̏͐͝͝`);
}

bootstrap();
