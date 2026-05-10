---
name: nestjs-openapi-docs
description: Consult the most up-to-date NestJS OpenAPI-Swagger documentation, cross-check it with the official sample, and answer with citations, snippets, and troubleshooting guidance.
---

# NestJS OpenAPI Docs

Use this skill when the user asks for help with `@nestjs/swagger`, OpenAPI, Swagger UI, documentation decorators, DTOs, schemas, security, `DocumentBuilder`, `SwaggerModule`, the CLI plugin, mapped types, multiple specs, or Swagger spec generation issues in NestJS.

## Goal

Provide up-to-date information from the official NestJS OpenAPI documentation and the official Swagger sample, avoiding answers based only on memory.

## Expected Output

The response should:

- use the same language as the user unless they explicitly ask for another language
- prioritize the official documentation and the official sample
- include citations with exact source URLs
- include ready-to-use snippets when the user asks for implementation help
- clarify whether a recommendation comes from the official docs or the sample
- mention recency when it matters, using the latest commit or last update date if checked

## Canonical Sources

Check these sources first, in this order:

1. NestJS OpenAPI source documentation from the official repo:
   - `https://raw.githubusercontent.com/nestjs/docs.nestjs.com/master/content/openapi/introduction.md`
   - `https://raw.githubusercontent.com/nestjs/docs.nestjs.com/master/content/openapi/types-and-parameters.md`
   - `https://raw.githubusercontent.com/nestjs/docs.nestjs.com/master/content/openapi/operations.md`
   - `https://raw.githubusercontent.com/nestjs/docs.nestjs.com/master/content/openapi/security.md`
   - `https://raw.githubusercontent.com/nestjs/docs.nestjs.com/master/content/openapi/mapped-types.md`
   - `https://raw.githubusercontent.com/nestjs/docs.nestjs.com/master/content/openapi/decorators.md`
   - `https://raw.githubusercontent.com/nestjs/docs.nestjs.com/master/content/openapi/cli-plugin.md`
   - `https://raw.githubusercontent.com/nestjs/docs.nestjs.com/master/content/openapi/other-features.md`

2. OpenAPI directory index to discover changes or new pages:
   - `https://api.github.com/repos/nestjs/docs.nestjs.com/contents/content/openapi`

3. Per-page commit history when the user asks for the latest information or when recency needs to be validated:
   - `https://api.github.com/repos/nestjs/docs.nestjs.com/commits?path=content/openapi/<page>.md&per_page=1`

4. Official NestJS Swagger sample:
   - `https://github.com/nestjs/nest/tree/master/sample/11-swagger`
   - `https://raw.githubusercontent.com/nestjs/nest/master/sample/11-swagger/src/main.ts`
   - `https://raw.githubusercontent.com/nestjs/nest/master/sample/11-swagger/src/cats/cats.controller.ts`
   - `https://raw.githubusercontent.com/nestjs/nest/master/sample/11-swagger/src/cats/entities/cat.entity.ts`
   - `https://raw.githubusercontent.com/nestjs/nest/master/sample/11-swagger/src/cats/dto/create-cat.dto.ts`
   - `https://raw.githubusercontent.com/nestjs/nest/master/sample/11-swagger/package.json`

## Important Source Rule

- Do not rely only on `https://docs.nestjs.com/openapi/...` if the fetched content is incomplete.
- If that happens, use the source version from `raw.githubusercontent.com` or the GitHub API for the `nestjs/docs.nestjs.com` repo.
- If an answer is not clearly backed by these sources, say so explicitly.

## Workflow

1. Identify the user's exact topic.
2. Check only the pages needed for that topic.
3. If the request is about real implementation, cross-check with the official sample.
4. If the request mentions the latest version, recent changes, or uncertain behavior, also check the latest commit for the relevant page.
5. Synthesize the answer without copying large sections of the docs.
6. Return the smallest correct snippet, adapted to modern NestJS usage.

## Quick Topic Map

- bootstrap, `SwaggerModule`, `DocumentBuilder`, UI, JSON/YAML, setup options, CSP: `introduction.md`
- DTOs, `@ApiProperty`, arrays, enums, generics, raw schemas, `@ApiExtraModels`, `getSchemaPath`, `oneOf`, `anyOf`, `allOf`, `@ApiSchema`: `types-and-parameters.md`
- tags, headers, responses, file upload, extensions, generic responses: `operations.md`
- `@ApiSecurity`, `@ApiBearerAuth`, `@ApiBasicAuth`, `@ApiOAuth2`, `@ApiCookieAuth`: `security.md`
- `PartialType`, `PickType`, `OmitType`, `IntersectionType`: `mapped-types.md`
- decorator inventory: `decorators.md`
- auto-decoration, `classValidatorShim`, `introspectComments`, SWC, ts-jest, metadata plugin: `cli-plugin.md`
- global prefix, global params, global responses, multiple specifications, explorer dropdown: `other-features.md`

## Response Rules

- Start with the direct answer, not a long setup.
- If the user asks how to do something, return steps plus a snippet.
- If the user asks why something fails, prioritize diagnosis and likely causes with references.
- If multiple valid options exist, recommend one default and mention the others briefly.
- If the user shares code, adapt the solution to their style and avoid rewriting more than necessary.

## Suggested Format

Use this format when it fits:

1. Short answer
2. Recommended snippet or change
3. Notes or caveats
4. Sources

Example sources block:

- `introduction.md`: `<exact url>`
- `operations.md`: `<exact url>`
- official sample: `<exact url>`

## Cases Where You Should Go Deeper

Automatically go deeper if the user asks about:

- differences between similar decorators such as `@ApiResponse()` vs `@ApiOkResponse()`
- reusable enums and `enumName`
- generics or paginated wrappers
- complex arrays or matrices using `schema`
- `ApiExtraModels` and `getSchemaPath`
- multipart uploads
- security and how it combines with guards
- multiple Swagger documents
- CLI plugin issues with SWC, ESM, or `ts-jest`

## Cases Where You Should Warn About Risks

- if someone proposes importing mapped types from `@nestjs/mapped-types` instead of `@nestjs/swagger` in Swagger plugin-related cases
- if someone relies on automatic inference for generics or interfaces where the docs describe limitations
- if extra models are missing for `oneOf` or generic wrappers
- if someone expects `class-validator` alone to fully drive the generated documentation without the plugin or decorators

## Restrictions

- Do not invent decorators or `DocumentBuilder` options.
- Do not claim version compatibility without checking the source if the user asks about recent versions.
- Do not cite blogs or third-party sources if the official docs or official sample cover the case.

## Useful Base Snippets

### Minimal Bootstrap

```ts
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
```

### Bearer Auth

```ts
const config = new DocumentBuilder().addBearerAuth().build();

@ApiBearerAuth()
@Controller('cats')
export class CatsController {}
```

### Documented DTO

```ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateCatDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  breed: string;
}
```

## If Information Is Missing

If the question depends on project context and not only on the docs, ask only for the minimum required, such as:

- `@nestjs/swagger` version
- `main.ts`
- the DTO or controller involved
- `nest-cli.json`, `tsconfig`, SWC, or jest configuration if the issue involves the plugin
